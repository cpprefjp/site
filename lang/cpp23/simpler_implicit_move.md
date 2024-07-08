# 暗黙的なムーブを簡略化 [P2266R3]
* cpp23[meta cpp]

<-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<-- last lang caution -->

## 概要

C++20の暗黙ムーブ仕様においては、暗黙ムーブ可能なもの（関数ローカルのオブジェクト/右辺値参照）が`return`文においてコピーされる場合に、可能ならば暗黙的にムーブして戻り値を構築するものだった。しかし、暗黙ムーブ可能なものを返しており`return`文でコピーが起こらない場合で、暗黙ムーブを行うことが適切な場合がまだ存在していた。

C++23ではその様なものを暗黙ムーブの対象に含めるために暗黙ムーブ仕様の調整が行われた。

```cpp
// 例示用のムーブ可能な型
struct Widget {
  Widget(Widget&&);
};

// Widgetの右辺値から構築可能な型
struct RRefTaker {
  RRefTaker(Widget&&);
};


auto example1(Widget w) -> RRefTaker {
  // ローカル変数の暗黙ムーブ
  return w;  // ok、C++11から
}

auto example2(Widget&& w) -> RRefTaker {
  // ローカル右辺値参照の暗黙ムーブ
  return w;  // ok、C++20から
}

auto example3(Widget&& w) -> Widget&& {
  // ローカル右辺値参照の暗黙ムーブ（戻り値型が参照型の場合）
  return w;  // C++20ではng、C++23からok
}

// 右辺値修飾変換演算子を持つ型
struct Jeff {
  operator int&() &&;
};

auto example4(Jeff x) -> int& {
  // ローカル変数の暗黙ムーブ（戻り値型が参照型の場合）
  return x;  // C++20ではng、C++23からok
}
```

上記例の`example3(), example4()`は、C++20までは戻り値型が参照型であるために`return`文でコピーは発生しないため、暗黙ムーブの対象になっていなかった。C++23では、これらの場合にも暗黙ムーブが試みられるようになる。

また同時に、C++11で導入されて以降少しづつその対象（暗黙ムーブが起こる場合および起こる場所）を拡大してきたことで複雑化していた暗黙ムーブ仕様が整理され、その仕様と実装がかなり単純化された。

## 仕様

**暗黙ムーブ可能なエンティティ**（*implicitly movable entity*）を次のどちらかとして指定する

- 自動記憶域期間の非`volatile`オブジェクト型変数
- 自動記憶域期間の非`volatile`オブジェクト型への右辺値参照

暗黙ムーブ可能なエンティティが次の場所で指名されている場合、その式は**ムーブする資格がある式**（*move-eligible*）となる

- `return/co_return`文のオペランド（以下の条件を全て満たすもの）
    - オペランドは変数名を指定する式（*id-expression*）であり（`()`で囲まれていても良い）
    - その変数名は、その文を囲む最も内側の関数（もしくはラムダ式）の本体内もしくは関数引数宣言内の、暗黙ムーブ可能なエンティティを指定している
- `throw`式のオペランド（以下の条件を全て満たすもの）
    - オペランドは変数名を指定する式であり（`()`で囲まれていても良い）
    - その変数名のスコープは、囲む最も内側のtryブロックのスコープよりも長くなく
    - その変数名は暗黙ムーブ可能なエンティティを指定している

そして、ムーブする資格がある式の値カテゴリは*xvalue*となる。

関数の戻り値は`return`文のオペランドからコピー初期化される。C++23において暗黙ムーブが可能な場合とはすなわち、`return`文のオペランドがムーブする資格がある式である場合のことで、その式（オペランド）は実際の値カテゴリがなんであれ*xvalue*として扱われる（つまり、`std::move()`されたのと等しくなる）ことで暗黙ムーブが適用される。

ムーブする資格がある式は必ず変数名を指定する式（*id-expression*）であるため、*prvalue*な`return`文オペランドに対して適用される[コピー省略](/lang/cpp17/guaranteed_copy_elision.md)と複合することは無い。NRVOとは複合しうるが、その場合は暗黙ムーブによって呼び出されるムーブコンストラクタの呼び出しがNRVOによって省略される。

### 副作用

この仕様の単純化はいくつか以前の動作を変更している。

まず、`return`文のオペランドがムーブする資格がある式となる場合その式の値カテゴリは*xvalue*として扱われることで、戻り値型推論の結果が変わる場合がある。

```cpp
auto f(int n) -> decltype(auto) {
  return (n);   // かっこに囲まれたid-expression、ムーブする資格がある式
}
// C++20 : 戻り値型はint&
// C++23 : 戻り値型はint&&

auto g(int n) -> auto&& {
  return n;     // id-expression、ムーブする資格がある式
}
// C++20 : 戻り値型はint&
// C++23 : 戻り値型はint&&
```

`decltype(auto)`による戻り値型推論では、`return`文のオペランドを`decltype`することで戻り値型を推論する。`decltype`は変数名に対して使用された時はその変数の宣言された型を取得するが、変数名がかっこに囲まれている場合はかっこに囲まれた*id-expression*として値カテゴリを含めたその式の型を取得する。このため、上記`f()`のように、`decltype(auto)`戻り値型の関数で`return`文のオペランドがかっこに囲まれた変数名であり、C++23でそのオペランドがムーブする資格がある式となる場合、その値カテゴリが変更される（*lvalue* -> *xvalue*）ことによって戻り値型推論結果が変化する。

`auto&&`による戻り値型推論は`decltype`と推論方法が異なるものの、やはり`return`文のオペランドの値カテゴリに応じて参照修飾が決定されるため、従来左辺値（*lvalue*）だったオペランドがC++23でムーブする資格がある式となる場合に、値カテゴリが*xvalue*となることによって推論結果が変化する。

ただし、変更に関わらず、この例のような関数はどちらもローカル変数への参照を返すものであるため、書くべきではない。

戻り値型推論においては、この他の場合には結果は変化しない。

```cpp
auto f1(int n) -> decltype(auto) {
  return n;
}
// C++20/23共に戻り値型はint

auto f2(int n) -> auto {
  return n;
}
// C++20/23共に戻り値型はint

auto f3(int n) -> auto& {
  return n;
}
// C++20/23共に戻り値型はint&
// ただし、後述のようにC++23ではエラー

auto f4(int n) -> const auto& {
  return n;
}
// C++20/23共に戻り値型はconst int&
```

そして、同様に`return`文オペランドの値カテゴリが変化することによって、ローカル変数の参照を返す一部の関数が不適格になる様になる。

```cpp
auto f() -> int& {
  int n = 10;

  return n; // ng、nはムーブする資格のある式であり、その型と値カテゴリはint&&（戻り値型と一致しない）
}

auto g() -> std::reference_wrapper<int> {
  int n = 10;

  return n; // ng、nはムーブする資格のある式であり、その型と値カテゴリはint&&（reference_wrapperのコンストラクタで拒否される）
}
```
* reference_wrapper[link /reference/functional/reference_wrapper.md]

ただし、ローカル参照変数は暗黙ムーブ可能なエンティティではないため、ローカル参照を返そうとする場合従来通りエラーにはならない。

```cpp
auto f() -> int& {
  int n = 10;
  int& r = n;

  return r; // ok、rはムーブする資格のある式ではなく、その型と値カテゴリはint&
}
```

また、この変更とは逆に、ローカル変数の右辺値参照を返そうとする場合が適格になってしまう。

```cpp
auto f() -> int&& {
  int n = 10;

  return n; // C++20ではng
            // C++23ではok、nはムーブする資格のある式であり、その型と値カテゴリはint&&
}
```

### 副作用早見表

任意の型名を`T`（`T&&`は右辺値参照型）として、戻り値型推論とコンパイル可否の変化は次のようにまとめられる

|関数宣言と`return`文|C++20まで|C++23から|備考|
|---|:-:|:-:|---|
|`auto f(T x) -> decltype(x) { return x; }`       |`T` : 〇| ― ||
|`auto f(T x) -> decltype((x)) { return (x); }`   |`T&` : 〇|`T&` : **×**|ローカル参照を返していた|
|`auto f(T x) -> decltype(auto) { return x; }`    |`T` : 〇| ― ||
|`auto f(T x) -> decltype(auto) { return (x); }`  |`T&` : 〇|**`T&&` :** 〇|ローカル参照を返す|
|`auto f(T&& x) -> decltype(x) { return x; }`     |`T&&` : ×|`T&&` : **〇**||
|`auto f(T&& x) -> decltype((x)) { return (x); }` |`T&` : 〇|`T&` : **×**||
|`auto f(T&& x) -> decltype(auto) { return x; }`  |`T&&` : ×|`T&&` : **〇**|`x`がローカル変数の場合ローカル参照を返すようになる|
|`auto f(T&& x) -> decltype(auto) { return (x); }`|`T&` : 〇|**`T&&` :** 〇|`x`がローカル変数の場合ローカル参照を返す|
|`auto f(T x) -> auto&& { return x; }`       |`T&` : 〇|**`T&&` :** 〇|ローカル参照を返す|
|`auto f(T x) -> auto&& { return (x); }`   |`T&` : 〇|**`T&&` :** 〇|ローカル参照を返す|
|`auto f(T&& x) -> auto&& { return x; }`       |`T&` : 〇|**`T&&` :** 〇|`x`がローカル変数の場合ローカル参照を返す|
|`auto f(T&& x) -> auto&& { return (x); }`   |`T&` : 〇|**`T&&` :** 〇|`x`がローカル変数の場合ローカル参照を返す|

表の中2列の各項目内は、推論される戻り値型:コンパイル可否、のように記述している。また、表中の記号の意味は次のとおり

- 〇 : 適格（コンパイルが通る）
- × : 不適格（コンパイルエラー）
- ― : 変化なし

## 例

```cpp
struct Weird {
  Weird();
  Weird(Weird&);
};

auto g(bool b) -> Weird {
  static Weird w1;
  Weird w2;

  if (b) {
    return w1;  // ok、w1はムーブする資格のある式ではなく、Weird(Weird&)が呼ばれる
  } else {
    return w2;  // ng、w2はムーブする資格のある式であり、xvalue（Weird&&）となる
  }
}
```

```cpp
// ムーブしないことを明示する関数、C++20までは使用可能
template<typename T>
auto unmove(T&& v) -> T& {
  return v; // C++23からng、vはxvalue
}

// C++23では次のように修正する必要がある
template<typename T>
auto unmove(T&& v) -> T& {
  return static_cast<T&>(v); // ok、キャスト式はムーブする資格のある式ではない
}
```

```cpp
// 例示用のムーブ可能な型
struct Widget {
  Widget(Widget&&);
};

auto f1(Widget w) -> Widget {
  return w;  // ローカル変数の暗黙ムーブ、C++11から
}

// Widgetの右辺値から構築可能な型
struct RRefTaker {
  // Widgetの右辺値からの変換コンストラクタ
  RRefTaker(Widget&&);
};

auto f2(Widget w) -> RRefTaker {
  return w;  // 暗黙ムーブされて構築（変換）、C++11から
}

auto f3(Widget&& w) -> RRefTaker {
  return w;  // ローカル右辺値参照の暗黙ムーブ、C++20から
}

[[noreturn]]
void f4(Widget w) {
  throw w;  // throw式における暗黙ムーブ、C++20から
}

struct From {
  From(Widget const &);
  From(Widget&&);
};

auto f5() -> From {
  Widget w;
  return w;  // 暗黙ムーブ（コンストラクタによる変換）、C++11から
}

struct To {
  operator Widget() &&;
};

auto f6() -> Widget {
  To t;
  return t;  // 暗黙ムーブ（変換演算子による変換）、C++20から
}

struct V {
  V(Widget); // 値で受け取るコンストラクタ
};

auto f7() -> V {
  Widget w;
  return w;  // 暗黙ムーブ（コンストラクタ引数へのムーブ）、C++20から
}

// DerivedはBaseを公開継承しているとき
auto f8() -> Base {
  Derived result;
  return result;  // 暗黙ムーブ（基底クラスへの変換）、C++20から
}

auto f9(Widget&& w) -> Widget&& {
  return w;  // 戻り値型が参照型の場合の暗黙ムーブ、C++23から
}

struct J {
  operator Widget&() &&;
};

auto f10(J x) -> Widget& {
  return x;  // 戻り値型が参照型の場合の暗黙ムーブ（変換演算子による変換）、C++23から
}
```

## この機能が必要になった背景・経緯

C++20までは戻り値型が参照型である場合に暗黙ムーブが行われていなかった。より正確には、関数戻り値の初期化時に初期化のためのコンストラクタを選択するオーバーロード解決が行われる場合にのみ、暗黙ムーブが考慮されていたが、戻り値型が参照型の場合は参照の初期化だけが起こりコンストラクタ呼び出しは関与しないため暗黙ムーブは考慮されていなかった。

これによって、同じ`return`文でも戻り値型が異なることでそのオペランドの扱いが変化してしまっていた。

```cpp
// Widget, RRefTakerは上の例を参照
// どちらも、C++20の場合

auto f(Widget&& w) -> RRefTaker {
  return w;  // ok、wは右辺値として扱われる
}

auto g(Widget&& w) -> Widget&& {
  return w;  // ng、wは左辺値として扱われる
}
```

この非一貫性を解消することがまず求められていた。

また、C++20時点の暗黙ムーブの仕様は二段階のオーバーロード解決を行う複雑なものであり、暗黙ムーブが行われるかどうかについて実装間で挙動に差異が生じていた。C++20時点の暗黙ムーブの仕様は次のようになっていた

暗黙ムーブ可能なエンティティが次のコピー初期化が行われる場所で指名されている場合、コピーの代わりにムーブが使用される場合がある

- `return/co_return`文のオペランド
    - （諸条件はC++23仕様と同一なので省略）
- `throw`式のオペランド
    - （諸条件はC++23仕様と同一なので省略）

これらのコピー初期化が行われる場所において、呼び出されるコンストラクタまたは[`return_value()`オーバーロード](/lang/cpp20/coroutines.md)を選択するオーバーロード解決は次の順序で実行される

1. オペランドのid式を右辺値（*rvalue*）としてオーバーロード解決を実行する
2. 1が失敗した（もしくは行われなかった）場合、オペランドのid式を左辺値（*lvalue*）としてオーバーロード解決を実行する

この最後の手順の1回目のオーバーロード解決時にコピーコンストラクタの代わりにムーブコンストラクタが選択されることによって、C++20の暗黙ムーブは実行される。しかし、この手順における「失敗」という言葉の意味が明確ではなく、それによって実装間で暗黙ムーブが行われるかどうか、あるいは選択されるコンストラクタに差異が生じていた。

`return`文オペランドの扱いの戻り値型の違いによる非一貫性と、仕様の複雑さと曖昧さによる実装間の差異の2つの問題を解決するために、C++23ではムーブする資格がある式という概念を用いて暗黙ムーブの仕様が単純化された。

## 参照

- [P2266R3 Simpler implicit move](https://wg21.link/p2266r3)
- [The Complete Guide to `return x;` - Arthur O'Dwyer - [CppNow 2021] - YouTube](https://www.youtube.com/watch?v=OGKAJD7bmr8)
- [c++ - Does c++23 break unmove - Stack Overflow](https://stackoverflow.com/questions/76647046/does-c23-break-unmove)