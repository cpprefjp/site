# constexpr
* cpp11[meta cpp]

## 概要
`constexpr`は、汎用的に定数式を表現するための機能である。

`constexpr`は、「constant expression (定数式)」の略語である。

この機能を使用することで、コンパイル時に値が決定する定数、コンパイル時に実行される関数、コンパイル時にリテラルとして振る舞うクラスを定義できる。

定数式の例として、パラメータの値を2乗して返す関数`square()`は、以下のように記述する：

```cpp example
#include <cassert>

constexpr int square(int x)
{
  return x * x;
}

int main()
{
  constexpr int compile_time_result = square(3);
  static_assert(compile_time_result == 9, "result must be 9");

  int runtime_result = square(3);
  assert(runtime_result == 9);
}
```
* assert[link /reference/cassert/assert.md]

関数`square()`の先頭に`constexpr`キーワードを付けることで、その関数は、コンパイル時と実行時、両方で呼び出せる関数となる。

`constexpr`関数がコンパイル時に呼び出されるか、実行時に呼び出されるかは、その関数の結果を受け取る、左辺によって決定される。引数が定数でかつ、左辺が`constexpr`修飾された変数であれば、右辺の関数はコンパイル時に呼び出される。そうでなければ、関数は実行時に呼び出される。

`constexpr`変数は、書き換えることができない定数となる。

`constexpr`関数もまた、その内部で変数の書き換えはできず、戻り値の型を`void`にすることもできない。変数の書き換えをせずに、計算した結果を返す必要がある。また、`constexpr`関数には、その本体において、`return`文ひとつのみで処理を行わなければならない、という制限がある。そのため、条件分岐には`if`文の代わりに条件演算子を、ループには`while`文や`for`文の代わりに再帰を使用する必要がある。

```cpp
constexpr int min(int a, int b)
{
  // 条件分岐には条件演算子?:を使用する
  return a < b ? a : b;
}

constexpr int factorial(int n)
{
  // ループには再帰を使用する
  return n == 0 ? 1 : n * factorial(n - 1);
}

int main()
{
  constexpr int min_val = min(2, 3);
  static_assert(min_val == 2, "result must be 2");

  constexpr int factorial_val = factorial(5);
  static_assert(factorial_val == 120, "result muse be 120");
}
```

`constexpr`にできる変数の型は、[リテラル型](/reference/type_traits/is_literal_type.md)に分類される必要がある。これには、整数型、浮動小数点数、リテラル型の配列、リテラル型のみをメンバ変数として持つクラスなどが含まれる。

ユーザー定義のクラスで、コンストラクタを定義する場合には、`constexpr`をコンストラクタの宣言に付ける。メンバ関数も、コンパイル時に呼び出す必要がある場合には、`constexpr`修飾する。メンバ変数の宣言に`constexpr`を付ける必要はない。

```cpp
class Integer {
  int value_;
public:
  constexpr Integer(int value)
    : value_(value) {}

  constexpr int get()
  { return value_; }
};

int main()
{
  constexpr Integer x = 3;
  static_assert(x.get() == 3, "x value must be 3");
}
```


## 仕様

### constexpr関数
- `constexpr`関数の戻り値の型、およびパラメータの型は、[リテラル型](/reference/type_traits/is_literal_type.md)でなければならない
- `constexpr`関数の戻り値の型、およびパラメータの型は、非`const`参照にはできない
- `constexpr`関数の本体は、以下の要素だけを含むことができる：
    - ヌル文
    - `static_assert`宣言
    - 型の別名定義
    - using宣言と、usingディレクティブ
    - 唯一の`return`文
- `constexpr`関数は暗黙的にインラインとなる
- `constexpr`関数を再帰的に呼び出せる深さは、512回以上であることが、コンパイラに推奨される
- `constexpr`関数は数学的に結果が定義された計算式、および結果が値の表現範囲内である計算式を記述できる
    - つまり、整数をゼロ割りした場合は、プログラムは不適格となる
- `main()`関数は、`constexpr`関数として定義できない
- `throw`文は書けるが、それがコンパイル時に評価された場合には、プログラムは不適格となる。

```cpp
// コンパイル時にtrueを渡すと、コンパイルエラーになる
constexpr int f(bool b)
{ return b ? throw -1 : 0; }
```


### constexpr変数として使用するユーザー定義クラス
- コンストラクタを明示的に定義する場合には、コンストラクタを`constexpr`修飾する
- 暗黙的に定義されるコンストラクタは、自動的に`constexpr`修飾される
- `constexpr`コンストラクタのパラメータの型は、[リテラル型](/reference/type_traits/is_literal_type.md)でなければならない。
- `constexpr`コンストラクタには、関数`try`ブロックは使用できない
- `constexpr`コンストラクタの本体は、空でなければならない
- 仮想基本クラスを持ってはならない
- 基本クラス、および非静的メンバ変数は、メンバ初期化子を使用して初期化しなければならない


### constexprメンバ関数
- `constexpr`メンバ関数は自動的に`const`修飾され、明示的な`const`修飾はできない
- 仮想関数は、`constexpr`関数として定義できない


## 備考
### 浮動小数点数演算での注意
`constexpr`関数での浮動小数点数は、コンパイル時に実行するとコンパイル環境で計算が行われ、実行時に実行すると実行環境で計算が行われる。これによって、コンパイル時と実行時で、結果が異なる可能性がある。


### コンパイル時と実行時で、統一したエラー報告
`constexpr`関数では、コンパイル時にはエラー報告に`static_assert`、実行時には`throw`文や`assert()`関数マクロなどを使用する必要があり、標準機能の範囲内では、コンパイル時と実行時で、エラー報告を統一的に行うことが難しい。

そういった問題を解決するために、ユーザーコミュニティで、エラー報告を統一的に行う仕組みが作られている。ここでは、その問題に取り組んでいる場所へのリンクを記載する。

- [コンパイル時/実行時両用アサート - ボレロ村上 - ENiyGmaA Code](http://boleros.hateblo.jp/entry/20130319/1363719366)


### グローバル変数の初期化順
並行プログラミングについて考えよう。スレッド間の排他処理を行うミューテックスをグローバル変数に保持したとき、ミューテックスの初期化が、スレッドの開始よりも必ず先に行われてほしい。

```cpp
extern std::mutex m;
std::thread t1{job1};
std::thread t2{job2};
```
* std::mutex[link /reference/mutex/mutex.md]
* std::thread[link /reference/thread/thread.md]

そんな状況のために、[`std::mutex`クラスのデフォルトコンストラクタ](/reference/mutex/mutex/op_constructor.md)には、`constexpr`修飾が行われている。そうすることで、その型の非ローカル変数を作ったときに、その変数は他の任意のスレッド開始よりも先に行われることが保証される。

- [Constant Initialization - 雑貨's tumblr](http://zakkas783.tumblr.com/post/25490513807/constant-initialization)
- [`mutex`のconstexprコンストラクタ](http://d.hatena.ne.jp/yohhoy/20120621/p1)


### 文字列処理
`constexpr`では、`new`演算子や`malloc()`関数が使用できないために、可変長の配列や文字列を扱うことが難しい。

C++11段階の標準ライブラリでも、そのような機能は標準では提供されていない。

こういった問題を解決するために、ユーザーコミュニティでそのような機能が作られている。ここでは、その問題に取り組んでいる場所へのリンクを記載する。

- [Sprout.String - constexpr 文字列クラス - ボレロ村上 - ENiyGmaA Code](http://boleros.hateblo.jp/entry/20110926/1318115291)

`constexpr`で文字列が扱えることにより、`printf()`のフォーマット文字列や、正規表現の間違いをコンパイル時に検出することができるようになる。


### コンパイル時再帰回数

コンパイラによっては、コンパイルオプションでコンパイル時における`constexpr`関数の再帰回数の上限を設定できる。

GCCとClangでは、`-fconstexpr-depth=`オプションで設定できる：

```
g++ main.cpp -fconstexpr-depth=1024
```

MSVC 14.0では、`/constexpr:depth`オプションで設定できる：

```
cl.exe /constexpr:depth1024 main.cpp
```

ここの`1024`を任意の値に変更することで、再帰回数の上限を設定できる。

GCC 5.2、Clang 3.7、MSVC 14.0時点で、3つともデフォルトは512回。


## この機能が必要になった背景・経緯
`constexpr`の主な目的は、数値型のプロパティを取得するクラス[`std::numeric_limits`](/reference/limits/numeric_limits.md)の、プロパティ取得の関数を定数式にすることである。

たとえば、[`std::numeric_limits`](/reference/limits/numeric_limits.md)の[`max()`](/reference/limits/numeric_limits/max.md)静的メンバ関数は、`int`型に対しては[`INT_MAX`](/reference/climits/int_max.md)マクロの値を返すだけであるが、それが関数であるために、[`INT_MAX`](/reference/climits/int_max.md)マクロと違って定数として扱えない、という問題があった。抽象化された機能を使うより、抽象化されていない機能の方がよい、というのは、改善すべき事態だった。そのため、関数を静的に評価する仕組みが必要とされた。

また、`constexpr`は、値を計算するテンプレートメタプログラムを置き換えて使用できる。テンプレートメタプログラミングでは、非型テンプレートパラメータによって整数型の値をコンパイル時に計算することはできた。しかし、浮動小数点数型の値や、その他多くの値に関する計算が難しく、構文もまた通常の関数とはかけ離れていた(浮動小数点数型の値の計算は、分数形式にすれば、できることはできる)。値をコンパイル時に計算するためには、今後はテンプレートメタプログラミングよりも`constexpr`を積極的に使用していくとよいだろう。


## 関連項目
- [C++11 ユーザー定義リテラル](user_defined_literals.md)
- [C++14 `constexpr`の制限緩和](/lang/cpp14/relaxing_constraints_on_constexpr.md)


## 参照
- [N1521 Generalized Constant Expressions](http://www.open-std.org/JTC1/SC22/WG21/docs/papers/2003/n1521.pdf)
- [N1972 Generalized Constant Expressions — Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1972.pdf)
- [N1980 Generalized Constant Expressions — Revision 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1980.pdf)
- [N2116 Generalized Constant Expressions — Revision 4](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2116.pdf)
- [N2235 Generalized Constant Expressions — Revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2235.pdf)
- [CWG Issue 644. Should a trivial class type be a literal type?](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#644)
    - リテラル型のメンバ変数のみを持つクラスは、`constexpr`コンストラクタを明示的に定義しなくても、リテラル型となる
- [CWG Issue 699. Must constexpr member functions be defined in the class member-specification?](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#699)
    - ゼロ割りの扱い、再帰回数の規定

