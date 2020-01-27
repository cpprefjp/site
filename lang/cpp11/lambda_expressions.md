# ラムダ式
* cpp11[meta cpp]

## 概要
「ラムダ式(lambda expressions)」は、簡易的な関数オブジェクトをその場で定義するための機能である。

この機能によって、「高階関数(関数を引数もしくは戻り値とする関数)」をより使いやすくできる。

```cpp
auto plus = [](int a, int b) { return a + b; };
int result = plus(2, 3); // result == 5
```

ここでは、`[](int a, int b) { return a + b; }`というコードがラムダ式に当たる。このラムダ式は、「`int`型のパラメータを2つとり、それらを足し合わせた`int`型オブジェクトを返す関数オブジェクト」を定義している。ここでは戻り値の型を明記していないが、その場合はラムダ式のreturn文から、戻り値の型が推論される。

このラムダ式によって、その場に以下のような関数オブジェクトが定義される：

```cpp
struct F {
  auto operator()(int a, int b) const -> decltype(a + b)
  {
     return a + b;
  }
};
```

ラムダ式によって自動的に定義される関数オブジェクトは、それぞれが一意な型名を持ち、その型名をユーザーが知る方法はない。そのため、ラムダ式によって定義された関数オブジェクトを変数に持つためには、`auto`を使用して型推論するか、[`std::function`](/reference/functional/function.md)クラスの変数に保持するかの、いずれかの方法をとることになる。

ラムダ式からその外側の変数を使用するには、「�ャプチャ(capture)」という機能を使用する。ラムダ式の先�にある`[ ]`は「ラムダ導入�(lambda-introducer)」と呼ばれ、どの変数をどのように�ャプチャするかを、このラムダ導入�のなかで指定する。�ャプチャの方式としては、参照かコピーのいずれかを選択できる。

```cpp
void f()
{
  int x = 3;

  // この時点で見える自動変数を参照で�ャプチャし、
  // 参照した変数xを書き換える
  auto f = [&] { x = 1; };

  // 個別に�ャプチャ方法を指定する場合は、
  // 以下のように、&の次に変数名を指定する
  // auto f = [&x] { x = 1; };

  f(); // x == 1
}

void g()
{
  int x = 3;

  // この時点で見える自動変数をコピーで�ャプチャし、
  // コピーした変数xをラムダ式内で使用する
  auto f = [=] { return x + 1; };

  // 個別に�ャプチャ方法を指定する場合は、
  // 以下のように、変数名を指定する
  // auto f = [x] { return x + 1; };

  int result = f(); // result == 4
}
```


## 仕様
### <a id="syntax" href="#syntax">構文</a>
```
[�ャプチャリスト](パラメータリスト) mutable 例外仕様 属性 -> 戻り値の型 { 関数の本体 }
```

このうち、以下は省略可能である：

- パラメータ、`mutable`、例外仕様、属性、戻り値の型のいずれも明示的に指定しない場合は、パラメータリストの丸カッコを省略できる
- コピー�ャプチャした変数を書き換える必要がない場合、`mutable`を省略できる
- 例外仕様を指定しない場合、それを省略できる
- 属性を指定しない場合、それを省略できる
- 戻り値の型を推論に任せる場合、`->`記号および戻り値の型を省略できる

もっとも�いラムダ式は、以下のようになる：

```cpp
[]{}
```

このラムダ式は、なにも�ャプチャせず、パラメータを受け取らず、なにも処理せず、戻り値の型が`void`である関数オブジェクトを定義する。

ラムダ式の記述に関する制限として、「ラムダ式は、評価されないオペランドに現れてはならない」というものがある。そのため、`decltype`、`sizeof`、`noexcept`、[`alignas`](alignas.md)のオペランドにはラムダ式を指定できない。


### <a id="closure-object" href="#closure-object">ク�ージャオブジェクト</a>
ラムダ式は、その場に関数オブジェクトのクラスを定義し、その一時オブジェクトを生成する。関数オブジェクトのクラスを「ク�ージャ型(closure type)」、その一時オブジェクトを「ク�ージャオブジェクト(closure object)」という。これらには、以下の特徴がある：

- ラムダ式ごとに、一意な名前の関数オブジェクトが定義される
- `public`なコピーコンストラクタを持つ
- `public`なムーブコンストラクタを持つ
- デフォルトコンストラクタを持たない
- コピー代入演算�は`delete`定義される
- 関数呼び出し演算�は、以下の特徴を持つ：
    - ラムダ式を`mutable`修飾しない限り、デフォルトで`const`メンバ関数として定義される
    - 非`virtual`
    - 非`volatile`
    - インライン関数
    - ラムダ式と同じパラメータリストの型、および戻り値の型を持つ
- �ャプチャをしないラムダ式の場合、ラムダ式と同じシグニチャを持つ関数ポインタへの変換演算�を持つ
- ク�ージャオブジェクトのサイズは未規定


### <a id="capture" href="#capture">�ャプチャ</a>
ラムダ式には、ラムダ式の外にある自動変数を、ラムダ式内で参照できるようにする「�ャプチャ(capture)」という機能がある。�ャプチャは、ラムダ導入�(lambda-introducer)と呼ばれる、ラムダ式の先�にある`[ ]`ブ�ックのなかで指定する。

�ャプチャには、コピー�ャプチャと参照�ャプチャがあり、デフォルトでどの方式で�ャプチャし、個別の変数をどの方式で�ャプチャするかを指定できる。

| �ャプチャ記法 | 説明 |
|----------------|------|
| `[&]`          | デフォルトで環境にある変数を参照して、ラムダ式のなかで使用する |
| `[=]`          | デフォルトで環境にある変数をコピーして、ラムダ式のなかで使用する |
| `[&x]`         | 変数`x`を参照して、ラムダ式のなかで使用する |
| `[x]`          | 変数`x`をコピーして、ラムダ式のなかで使用する |
| `[&, x]`       | デフォルトで参照�ャプチャ、変数`x`のみコピーして、ラムダ式のなかで使用する |
| `[=, &x]`      | デフォルトでコピー�ャプチャ、変数`x`のみ参照して、ラムダ式のなかで使用する |
| `[this]`       | `*this`のメンバを参照して、ラムダ式のなかで使用する |
| `[this, x]`    | `*this`のメンバを参照し、変数`x`のみコピーして、ラムダ式のなかで使用する |

```cpp example
#include <iostream>

// コピー�ャプチャの例
void copy_capture_example()
{
  int a = 0;
  auto f = [a] { return a; }; // 変数aをコピー�ャプチャする

  a = 1;

  // ラムダ式を定義した時点での変数aがコピーされ、使用されるので、
  // ラムダ式のなかでは、変数aの値は0となる
  int result = f(); // result == 0
  std::cout << result << std::endl;
}

// 参照�ャプチャの例
void reference_capture_example()
{
  int a = 0;
  auto f = [&a] { return a; }; // 変数aを参照�ャプチャする

  a = 1;

  // 参照�ャプチャした変数は、ラムダ式を実行する時点での値となるので、
  // ラムダ式のなかでは、変数aの値は1となる
  int result = f(); // result == 1
  std::cout << result << std::endl;
}

int main()
{
  copy_capture_example();
  reference_capture_example();
}
```

デフォルトの�ャプチャ方法はひとつしか指定できない。変数個別の�ャプチャ方法は、カンマ区切りで複数指定できる。

コピー�ャプチャによる変数のコピーは、ラムダ式によって関数オブジェクトを定義した時点で行われる。

`this`を�ャプチャした場合、ラムダ式によって定義された関数オブジェクトは`this`のクラスの`friend`という扱いとなり、`private`メンバにもアクセスできる。

```cpp example
#include <iostream>

class X {
  int member_value_ = 3;
public:
  void foo()
  {
    int copy_value = 4;

    auto f = [this, copy_value] {
      member_value_ = 5; // メンバ変数を参照する
      bar(); // メンバ関数を呼び出す

      return copy_value * 2; // コピー�ャプチャした�ーカル変数を使用する
    };

    int result = f();
    std::cout << "member_value_ : " << member_value_ << std::endl;
    std::cout << "result : " << result << std::endl;
  }

private:
  void bar()
  {
    std::cout << "bar" << std::endl;
  }
};

int main()
{
  X().foo();
}
```

出力 :

```
bar
member_value_ : 5
result : 8
```

ラムダ式がひとつ以上の変数を参照�ャプチャしている場合、参照している変数の寿命が切れたあとの、ラムダ式のコピーと呼び出しの動作は未定義。

```cpp example
#include <functional>

std::function<int(int)> foo()
{
  int n = 3;
  return [&n](int i) -> int { return n + i; };
}

int main()
{
  foo()(2); // 未定義の振る舞い
}
```
* std::function[link /reference/functional/function.md]

ラムダ式がデフォルト引数に現れる場合、いかなる�ャプチャもしてはならない。

```cpp
void foo()
{
  int x = 3;

  // �ーカル関数の宣言
  void f1(int = ([i]{ return x; })()); // コンパイルエラー
  void f2(int = ([i]{ return 0; })()); // コンパイルエラー
  void f3(int = ([=]{ return x; })()); // コンパイルエラー
  void f4(int = ([=]{ return 0; })()); // OK : デフォルト�ャプチャしたが、使用していない
  void f5(int = ([]{ return sizeof(x); })()); // OK : �ャプチャなし
}
```

パラメータパックを個別�ャプチャする際は、`...`で展開する。

```cpp
template <class... Args>
void bar(Args...) {}

template <class... Args>
void foo(Args... args)
{
  auto f = [args...] { bar(args...); };
  f();
}
```


### <a id="parameter-constraints" href="#parameter-constraints">パラメータリストの制限</a>
ラムダ式のパラメータには、テンプレートは使用できない。そのため、具体的な型を指定する必要がある。


### <a id="mutable" href="#mutable">mutable</a>
�ャプチャした変数はク�ージャオブジェクトのメンバ変数と見なされ、ク�ージャオブジェクトの関数呼び出し演算�は、デフォルトで`const`修飾される。そのため、コピー�ャプチャした変数をラムダ式のなかで書き換えることはできない。

```cpp
int rate = 2;
[rate](int x) -> int { return x * ++rate; } // エラー！rate変数を書き換えることはできない
```

コピー�ャプチャした変数を書き換えたい場合は、ラムダ式のパラメータリストの後ろに`mutable`と記述する。

```cpp
int rate = 2;
[rate](int x) mutable -> int { return x * ++rate; } // OK
```


### <a id="return-type-deduction" href="#return-type-deduction">戻り値型の推論</a>
戻り値の型を省略した場合、その戻り値型は、関数本体の`return`文から推論される。

`return`文がない場合、および、`return`文にオペランドが無い場合は、戻り値の型は`void`になる。

`return`文にオペランドがある場合は、`return`文に指定した式の型に対して、[`decay`](/reference/type_traits/decay.md)を適用した型が戻り値の型となる。

複数の`return`文がある場合には、すべての`return`文に対して前述の方法で戻り値の型を推論し、それらが全て同じ型の場合にはその型が戻り値の型となるが、そうでない場合プ�グラムは不適格となる。

`return`文に初期化�リストが指定された場合、プ�グラムは不適格となる。

```cpp
int main()
{
  auto f1 = []{};            // 戻り値の型はvoid
  auto f2 = []{ return 1; }; // 戻り値の型はint

  auto f3 = [] {
    static int ar[3] = {1, 2, 3};
    return ar;
  }; // 戻り値の型はint*

  auto f4 = [] {
    int x = 3;
    const int& cx = x;

    if (true)
      return x;
    else
      return cx;
  }; // 戻り値の型は、intとconst int&の共通の型であるint

  // コンパイルエラー： {1, 2}は式ではない(std::initializer_listには推論されない)
  // auto f5 = [] { return {1, 2}; };
}
```


### <a id="convert-to-function-pointers" href="#convert-to-function-pointers">関数ポインタへの変換</a>
�ャプチャを含まない(つまり状態を持たない)ラムダ式によって生成されたク�ージャオブジェクトは、同じパラメータ型と戻り値型のシグニチャを持つ関数ポインタに変換できる。

```cpp example
#include <iostream>

void foo(int(*fp)(int, int))
{
  int result = fp(2, 3);
  std::cout << result << std::endl;
}

int main()
{
  foo([](int a, int b) { return a + b; });
}
```

出力 :

```
5
```

## 例
### アルゴリズムの引数として関数を渡す
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 条件一致する最初の要素を検索する
  decltype(v)::iterator it = std::find_if(
                               v.begin(),
                               v.end(),
                               [](int x) { return x % 2 == 0; }
                             );

  // 見つかった
  if (it != v.end()) {
    int found_value = *it;
    std::cout << found_value << std::endl;
  }
}
```
* std::find_if[link /reference/algorithm/find_if.md]

#### 出力
```
2
```

### 処理が完了したことが通知されるハンドラを引数として渡す
```cpp example
#include <iostream>
#include <functional>

void proc(std::function<void()> on_complete)
{
  // …時間のかかる処理…
  for (int i = 0; i < 10; ++i) {
    std::cout << i << std::endl;
  }

  // 完了ハンドラを呼び出す
  on_complete();
}

int main()
{
  // 処理が完了したときに呼ばれる関数を指定する
  proc([] {
    std::cout << "complete" << std::endl;
  });
}
```
* std::function[link /reference/functional/function.md]

#### 出力
```
0
1
2
3
4
5
6
7
8
9
complete
```


## この機能が必要になった背景・経緯
ラムダ式が標準C++に最初に提案された2006年当時、多くのプ�グラミング言語が、コードブ�ックを引数として関数に渡す機能を用意していた。たとえば、Algol 68はdownward funargsという機能を持っていたし、Lispはク�ージャ(closure)、Smalltalkはパラメータとして渡してあとで実行する「コードブ�ック」と呼ばれる機能を、C# 2.0 (ク�ージャ)やJava (匿名クラス)も同様の機能を持っていた。これらの概念は、C++においてもBoost.LambdaやBoost.Bindといったライブラリ実装で導入が試みられてきた。

C++には、関数を第一級オブジェクトとして扱う「関数オブジェクト(function objects)」という機能があり、これによって関数を引数または戻り値として使用できた。関数オブジェクトをさらに扱いやすくするために、Boost C++ Librariesから提案された[`bind()`](/reference/functional/bind.md)関数や[`function`](/reference/functional/function.md)クラスを、標準ライブラリに導入した。

標準C++の[アルゴリズムライブラリ](/reference/algorithm.md)には、関数を引数とするものが多くある。それらは各問題を解くために非常に有用ではあったが、アルゴリズムを使用するたびに関数オブジェクトを定義することは非常に冗長で使いにくかった。アルゴリズムをより使いやすくするための言語サポートとして、ラムダ式が導入されることとなった。

なお、Boost.LambdaやCLAMP(C++ Lambda Preprocessor)のように、ライブラリ実装でラムダ式を標準C++に導入することも検討されたが、以下の理由から、言語サポートすることとなった：

- ライブラリ実装の場合は、演算�オーバー�ードで実現することになるが、それには多くの制限がある
    - 変数宣言、条件分岐、ループなどをライブラリで定義するのは難しい
- ライブラリ実装は、言語サポートする場合に比べて、コンパイル時間が長くなる。
- ライブラリ実装は、コンパイルエラーのメッセージが複雑になる
- 最も重要なことは、ラムダライブラリは、一般的な状況でもユーザーが理解して使用するのが難しい


## 検討されたほかの選択肢
ラムダ式の構文は、段階的にいくつかのバリエーションが考えられた。

### 第1案
第1案は、以下のような構文。

```
ret_type(type1 value1, type2 value2, ...) { statements }
```

このときの構文では、コピー�ャプチャと参照�ャプチャといった使い分けはできず、全ての変数が参照�ャプチャされるようになっていた。

```cpp
void f(int x)
{
  std::vector<int> v;
  // ...
  std::remove_if(v.begin(), v.end(), void (int& n) { n < x; });
}
```
* std::remove_if[link /reference/algorithm/remove_if.md]

この構文の問題点は、先に述べたコピー�ャプチャと参照�ャプチャの使い分けができない、といったもののほか、構文解析が難しいというのもある。


### 第2案
第2案は、以下のような構文。

```
<>(type1 value1, type2 value2, ...) -> ret_type extern(local-val-list) { statements }
```

`<>`記号を、構文解析のためのマー�ングとし、ラムダ式の開始と見なすようになった。そのほか、`extern`�ーワード後の丸カッコに変数を指定することで、その変数を参照�ャプチャする機能が追加された。`extern`に指定しない変数はコピーとして�ャプチャされるが、`extern`に指定した変数は参照�ャプチャされる。

```cpp
void f()
{
  int sum = 0;
  for_each(a.begin(), a.end(), <>(int x) -> void extern(sum) { sum += x; });
}
```

戻り値の型`-> ret_type`を省略した場合は、ラムダ式の`return`文から戻り値の型が推論される。


### 第3案
第3案は、以下のような構文。

```
<>(parameter-list ; capture-list) -> ret_type ( single-expression )
<&>(parameter-list ; capture-list) -> ret_type ( single-expression )

<>(parameter-list ; capture-list) -> ret_type { statements }
<&>(parameter-list ; capture-list) -> ret_type { statements }
```

まず、`extern`による参照�ャプチャが廃�され、パラメータリストの丸カッコのなかに、パラメータと�ャプチャをセミコ�ン(`;`)区切りで指定することになった。

```cpp
double array[] = { 1.0, 2.1, 3.3, 4.4 };
double sum = 0; int factor = 2;
for_each(array, array + 4, <>(double d ; &sum, factor) ( sum += factor ∗ d ));
```

参照�ャプチャする場合は、変数名の先�に`&`を付け、コピー�ャプチャする場合は変数名のみを指定する。

変数を個別に�ャプチャする方法のほかに、デフォルトで参照�ャプチャする機能も追加された。これには、ラムダ式の先�を`<>`の代わりに`<&>`にする。

```cpp
double array[] = { 1.0, 2.1, 3.3, 4.4 };
double sum = 0; int factor = 2;
for_each(array, array + 4, <&>(double d) ( sum += factor ∗ d ));
```

ここでは、関数の本体に丸カッコを使用している。これは、関数の本体がひとつの式だけで成り立つ場合に使用する。2つ以上の式や文がある場合は、波カッコを使用する。


### 第4案
第3案では`<&>`という、デフォルトで参照�ャプチャする方法が考えられたが、第4案では以下のデフォルト�ャプチャが考えられた。

1. `<.>` : デフォルト�ャプチャを持たない
2. `<&>` : デフォルトで参照�ャプチャ
3. `<+>` : デフォルトでコピー�ャプチャ


### 最終版
ここまで出た案をさらに改良して、現在のラムダ式の形に収束した。

�ャプチャ方法の指定は、山カッコ`< >`の代わりに、角カッコ`[ ]`が採用された。これは、山カッコが`operator<()`、`operator>()`、テンプレートといった機能があるために構文解析が難しい、という理由からだ。

そして、デフォルト以外の�ャプチャもまた、デフォルト�ャプチャと同じ場所に列挙することになった。

なお、C++11時点のラムダ式はテンプレートを扱えないが、これはコンパイラの実装が難しい、という理由での見送りである。


## 関連項目
- [C++11 �ーカル型と無名型を、テンプレート引数として使用することを許可](local_and_unnamed_type_as_template_arguments.md)
- [C++14 ジェネリックラムダ](/lang/cpp14/generic_lambdas.md)
- [C++14 ラムダ式の初期化�ャプチャ](/lang/cpp14/initialize_capture.md)
- [C++17 ラムダ式での`*this`のコピー�ャプチャ](/lang/cpp17/lambda_capture_of_this_by_value.md)
- [C++20 ラムダ式の�ャプチャとして`[=, this]`を許可する](/lang/cpp20/allow_lambda_capture_equal_this.md)
- [C++20 ジェネリックラムダのテンプレート構文](/lang/cpp20/familiar_template_syntax_for_generic_lambdas.md)


## 参照
- [N1958 A proposal to add lambda functions to the C++ standard](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1958.pdf)
- [N1968 Lambda expressions and closures for C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1968.pdf)
- [N2329 Lambda expressions and closures for C++ (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2329.pdf)
- [N2413 Lambda Expressions and Closures: Wording for Monomorphic Lambdas](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2413.pdf)
- [N2487 Lambda Expressions and Closures: Wording for Monomorphic Lambdas (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2487.pdf)
- [N2510 BSI Position on Lambda Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2510.pdf)
- [N2511 Named Lambdas and Local Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2511.html)
- [N2529 Lambda Expressions and Closures: Wording for Monomorphic Lambdas (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2529.pdf)
- [N2550 Lambda Expressions and Closures: Wording for Monomorphic Lambdas (Revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2550.pdf)
- [N2651 Constness of Lambda Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2651.pdf)
- [N2658 Constness of Lambda Functions (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2658.pdf)
- [N2859 New wording for C++0x Lambdas](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2859.pdf)
- [N2903 New wording for C++0x Lambdas](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2903.pdf)
- [N2927 New wording for C++0x Lambdas (rev. 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2927.pdf)
- [N2957 Reaching Scope of Lambda Expressions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2957.html)
- [N3043 Converting Lambdas to Function Pointers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3043.html)
- [N3052 Converting Lambdas to Function Pointers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3052.html)
- [CWG Issue 975. Restrictions on return type deduction for lambdas](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#975)

