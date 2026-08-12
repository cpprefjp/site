# 後置インクリメント・デクリメント演算のdefault定義 [P3668R4]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++29では、後置インクリメント演算子`operator++(int)`と後置デクリメント演算子`operator--(int)`を`= default`によって定義できるようになる。

後置インクリメント・デクリメント演算の意味は、「自身のコピーをとり、前置演算を適用し、コピーしておいた元の値を返す」という定型的なものである。C++26までは、その定型的な処理を利用者自身が毎回記述する必要があった：

```cpp
class foo {
  int member;
public:
  constexpr foo& operator++() {
    ++member;
    return *this;
  }

  // 定型的な内容だが、利用者が記述する必要があった
  constexpr foo operator++(int) {
    auto copy {*this};
    ++*this;
    return copy;
  }
};
```

C++29では、この定義をコンパイラに生成させられる：

```cpp
class foo {
  int member;
public:
  constexpr foo& operator++() {
    ++member;
    return *this;
  }

  constexpr foo operator++(int) = default;
};
```

これによって定型コードの記述量が減り、記述ミスの余地も小さくなる。


## 仕様
### default定義できる形式
後置演算子は、メンバ関数・明示的オブジェクトパラメータをもつメンバ関数・非メンバ関数のいずれの形式でもdefault定義できる：

```cpp
// メンバ関数
struct S0 {
  int v;
  S0& operator++() { ++v; return *this; }
  S0 operator++(int) = default;
};

// 明示的オブジェクトパラメータをもつメンバ関数
struct S1 {
  int v;
  S1& operator++() { ++v; return *this; }
  S1 operator++(this S1&, int) = default;
};

// 非メンバ関数
struct S2 {
  int v;
  S2& operator++() { ++v; return *this; }
};
S2 operator++(S2&, int) = default;
```

型`C`に対するdefault定義された後置インクリメント・デクリメント演算子関数は、以下のすべてを満たす非テンプレート関数でなければならない：

- 「`C`への参照」型の第1パラメータ、または「`volatile C`への参照」型の第1パラメータをもつこと。ここで、暗黙のオブジェクトパラメータ (があれば) を第1パラメータとみなす
- `C`の定義内で、または`C`が完全型である文脈でdefault定義されること
- 宣言された戻り値の型が`C`であること

また、クラス内に現れるdefault定義は、その関数の最初の宣言でなければならない。

```cpp
struct S;
S operator++(S&, int) = default; // コンパイルエラー、Sが不完全型
```

```cpp
struct S {
  S(const S&) = default;
  S& operator++() { return *this; }
};

S operator++(S, int) = default; // コンパイルエラー、パラメータの型が誤っている
                                // 「Sへの参照」でなければならない
```

### 暗黙定義の意味
deleted定義とならない場合、型`C`に対するdefault定義された後置演算子関数`F`の暗黙定義は、後置インクリメントであれば以下と等価である：

```cpp
C tmp(c);
++c;
return tmp;
```

後置デクリメントであれば、`++c`が`--c`となる。ここで`tmp`は説明のためだけに存在する変数であり、`c`は、`F`が暗黙のオブジェクトメンバ関数であれば`*this`を、そうでなければ`F`の第1パラメータを表す左辺値である。

コピーの作成は直接初期化 (`C tmp(c);`) であるため、コピーコンストラクタが`explicit`であっても使用できる。一方で`return tmp;`はコピー初期化であるため、`explicit`なコピーコンストラクタをもち、かつムーブコンストラクタをもたないクラスでは不適格となる：

```cpp
struct A {
  explicit A(const A&);
  A(A&&);

  A& operator++();
  A operator++(int) = default; // OK、return文でムーブコンストラクタが使用される
};

struct B {
  explicit B(const B&);

  B& operator++();
  B operator++(int) = default; // コンパイルエラー
                               // return文でexplicitなコピーコンストラクタを使用できない
};
```

同様に、ムーブコンストラクタが明示的にdelete定義されているクラスでも、`return tmp;`がdelete定義された関数を呼び出そうとするため不適格となる。

### deleted定義となる条件
型`C`に対するdefault定義された後置インクリメント・デクリメント演算子関数は、以下のいずれかに該当する場合にdeleted定義となる：

1. `C`がクラス型であり、`C`型の左辺値から`C`型の変数を直接初期化するオーバーロード解決が、使用可能な候補にならない (コピーコンストラクタが使用できない)
2. `C`のデストラクタが、その関数本体の文脈においてdelete定義されているか、アクセスできない
3. `C`型の左辺値`c`に対して、後置インクリメントであれば`++c`、後置デクリメントであれば`--c`のオーバーロード解決が、使用可能な候補にならない

```cpp
struct T {
  T operator++(int) = default; // OK、ただしdeleted定義となる
                               // 前置operator++がない
};

enum class E1 {};
E1 operator++(E1&, int) = default; // OK、ただしdeleted定義となる
                                   // 列挙型には組み込みの前置operator++が存在しない

enum E2 {};
E2& operator++(E2& e);
E2 operator++(E2&, int) = default; // OK、deleted定義とはならない
```

非メンバ関数としてdefault定義する場合、比較演算子とは異なり、対象クラスのフレンドである必要はない。後置演算子はクラスのサブオブジェクトにアクセスする必要がなく、コピーコンストラクタと前置演算子を使用できれば十分であるためである。逆に言えば、それらがdefault定義の文脈からアクセスできない場合にはdeleted定義となる：

```cpp
class foo {
  foo(const foo&);   // privateなコピーコンストラクタ
  foo& operator++(); // privateな前置演算子
};

foo operator++(foo&, int) = default; // deleted定義となる
```

### 参照修飾との関係
- 前置`operator++()`が左辺値参照修飾、後置`operator++(int)`が右辺値参照修飾である場合は適格である。右辺値参照修飾された関数の中でも、`*this`は左辺値であるため
- 前置`operator++()`が右辺値参照修飾されている場合はdeleted定義となる。`++*this`に対するオーバーロード解決が、使用可能な候補を見つけられないため

### 例外指定
`noexcept`指定子をもたず、最初の宣言でdefault定義された後置インクリメント・デクリメント演算子関数は、暗黙定義に含まれるいずれかの式が例外を送出する可能性がある場合に限り、例外を送出する可能性があるものとして扱われる。


## 例
```cpp example
#include <iostream>

class counter {
  int value_ = 0;
public:
  constexpr int get() const { return value_; }

  constexpr counter& operator++() { ++value_; return *this; }
  constexpr counter& operator--() { --value_; return *this; }

  // 前置演算子から、後置演算子の定義をコンパイラに生成させる
  constexpr counter operator++(int) = default;
  constexpr counter operator--(int) = default;
};

int main()
{
  counter c;

  std::cout << (c++).get() << std::endl; // インクリメント前の値が返る
  std::cout << c.get() << std::endl;

  std::cout << (c--).get() << std::endl; // デクリメント前の値が返る
  std::cout << c.get() << std::endl;
}
```

### 出力
```
0
1
1
0
```


## 備考
### `= default`は関数の本体でしかない
`= default`は、コンパイラが「既定の意味」を注入するための関数本体を指定するものであり、宣言の文法を制約しない。そのため、default定義されていない関数と同様に、`noexcept`指定や`requires`節などを組み合わせられる：

```cpp
template <typename Range>
class my_generic_iterator {
  // ...
  my_generic_iterator operator++(int) requires std::ranges::forward_range<Range> = default;
  my_generic_iterator operator++(int) { /* ... */ }
};
```
* std::ranges::forward_range[link /reference/ranges/forward_range.md]

一方で、演算子関数テンプレートそのものをdefault定義することはできない。また、default定義される関数はデフォルト引数をもってはならない。

`volatile`修飾された後置演算子のdefault定義は許可されるが、`volatile`に対する演算の非推奨化にあわせて、非推奨とされる。

### 前置演算子の戻り値の型は制約されない
default定義された後置演算子は、対応する前置演算子の戻り値の型に要件を課さない。`C&`以外を返す前置演算子であっても、default定義は可能である。

前置演算子の戻り値の型を`C&`に限定しても、それが「正しいオブジェクトへの参照」を返すことは保証できない (たとえば別の`C`のインスタンスへの参照を返すこともできる)。また、前置演算子の定義がほかの翻訳単位にある場合、コンパイラは後置演算子の定義を注入する時点でその定義を見られない。そもそも暗黙定義は前置演算子の戻り値を捨てるため、要件を課す意味がない。

### 前置演算子に付けた属性
前置演算子に`[[deprecated]]`や`[[nodiscard]]`などの属性が付いている場合、default定義された後置演算子からの呼び出しに対して診断情報が出力される。暗黙定義は`++*this`を呼び出して戻り値を捨てることと等価であり、利用者が自ら診断情報を有効にしている以上、それが得られるべきであるためである。

### 後置演算子が自動生成されるわけではない
C++20の比較演算子とは異なり、この機能は書き換え候補 (rewritten candidate) を生成しない。利用者が後置演算子を宣言しなければ、後置演算が使用可能になることはない。クラスが後置演算をサポートしないことを明示したい場合には、これまで通り`= delete`を使用できる。

### 機能テストマクロ
この機能に対する機能テストマクロは、意図的に追加されていない。後置演算子のdefault定義をプリプロセッサの条件分岐で囲んでも、利用者のコード量を減らす効果は得られないためである。


## この機能が必要になった背景・経緯
後置インクリメント・デクリメント演算の定義は、「コピーをとり、前置演算を適用し、コピーを返す」という広く知られた定型的なものである。それにもかかわらず、C++26までは利用者がその3行を毎回自分で記述する必要があり、記述ミスの原因にもなっていた。標準ライブラリのなかにも、この定型的な定義をもつ操作が53個存在すると報告されている。

同様の定型コードを削減する手法はこれまでにも存在したが、いずれも意図をそのまま表現できるものではなかった：

- CRTPによるmixinクラスを継承する方法では、派生クラスの前置演算子が基底クラスの後置演算子を隠すため、`using`宣言を明示的に書く必要がある
- リフレクションによってメンバ関数を生成する方法では、クラスの外側に生成用のコードを用意する必要がある
- `template <class T> T operator++(T&, int)`のような非メンバ関数テンプレートを定義する方法では、コピー可能かつ前置インクリメント可能な型すべてが自動的に後置演算をもつことになる。これは非推奨となった[`std::rel_ops`](/reference/utility/rel_ops.md)と同種の問題である

「既定の後置演算がほしい」という意図は、`= default`という既存の綴りでそのまま表現できる、というのが本機能の設計方針である。

なお、本機能を標準ライブラリの規定そのものに適用する変更は、[P3785R1](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3785r1.html)で別途行われた。これは規定の記述を簡潔にするだけの変更であり、ライブラリの動作は変わらない。


## 検討されたほかの選択肢
### 書き換え規則による自動生成
C++20の比較演算子のように、`a++`に対して`[&a]{ auto copy {a}; ++a; return copy; }()`と等価な書き換え候補を生成する案が検討された。この場合、利用者は前置演算子を定義するだけで後置演算も使用できるようになる。

しかし、以下の理由で採用されなかった：

- `==`が有効であれば`!=`も有効であるのとは異なり、`++a`が有効であることは`a++`が有効であることを意味しない
- 書き換え候補を生成すると、これまで不適格だったコードが後から適格になってしまう

### イテレータ向けの代替の意味論
[`std::move_iterator`](/reference/iterator/move_iterator.md)のように、元となるイテレータが前方向イテレータでない場合に後置インクリメントの意味を変えるクラスも存在する。しかし、そのような代替の意味論はdefault定義の対象とはされなかった：

- 後置デクリメントとは非対称になる。デクリメントをサポートするイテレータは、すべて双方向イテレータ以上であるため
- 代替の意味論は一種類ではない。挿入イテレータでは、後置インクリメントは何もしない操作として定義される
- 後置演算をもつクラスが、イテレータであるとは限らない


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++20 `<=>`/`==`による比較演算子の自動定義](/lang/cpp20/consistent_comparison.md)
- [C++23 自身のオブジェクトを明示的にパラメータとして指定する](/lang/cpp23/deducing_this.md.nolink)
- [`std::move_iterator::operator++`](/reference/iterator/move_iterator/op_increment.md)


## 参照
- [P3668R4 Defaulting Postfix Increment and Decrement Operations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3668r4.html)
- [P3785R1 Library Wording Changes for Defaulted Postfix Increment and Decrement Operations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3785r1.html)
    - C++29で、標準ライブラリの規定にも後置演算子のdefault定義が使用されるようになった
- [P1152R4 Deprecating `volatile`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1152r4.html)
