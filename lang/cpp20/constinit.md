# コンパイル時初期化を強制する`constinit`キーワードを追加 [P1143R2]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

変数に対する`constinit`指定は、静的初期化（*static initialization*）が可能な変数に対して、その初期化がコンパイル時に完了することを保証する。

```cpp
#include <mutex>
#include <memory>

// OK
constinit int n = 10;
constinit double pi = 3.14;
constinit std::mutex m{};
constinit std::unique_ptr<int> p = nullptr;

// NG
constinit std::unique_ptr<int> p2 = &n;
constinit double pi2 = pi * 2.0; 

int main() {
  // OK
  constinit static int m1 = 20;

  // NG
  constinit int m2 = 30;
}
```
* constinit[color ff0000]

別の言い方をすると、`constinit`は変数が動的初期化（*dynamic initialization*）されないことを保証する。

動的初期化が必要となる変数に対してはコンパイルエラーとなるため、静的/スレッドローカル変数のうち静的初期化が期待できるものに付加しておくことで、いつ初期化がされているのかが明確になる。

## 仕様

`constinit`は変数にのみ使用可能であり、構文的には変数に対する`constexpr`と同様に使用可能である。ただし、`constinit`と`constexpr`を併用することはできない。

```cpp
constinit int f();    // NG
constinit int N = 0;  // OK
constinit constexpr int M = 0;  // NG
```

このように`constinit`指定された変数が静的初期化可能ではない場合、コンパイルエラーとなる。

```cpp
const char *g() { return "dynamic initialization"; }
constexpr const char *f(bool p) { return p ? "constant initializer" : g(); }

constinit const char *c = f(true);  // OK
constinit const char *d = f(false); // NG
```

`constexpr`変数とは異なり、`constinit`変数は初期化がコンパイル時に完了している事だけを保証するため、実行時に暗黙に`const`とならない。実行時に`const`にしたい場合は明示的に指定する必要がある。

```cpp
constinit int N = 10;
constinit const int M = 20;

int main () {
  N = 30; // OK
}
```

ローカル変数や非静的メンバ変数は必ず実行時に初期化されるため、`constinit`が適用可能なのは静的記憶域期間およびスレッドローカル記憶域期間にある変数、すなわち名前空間スコープのグローバル変数、静的メンバ変数、スレッドローカル変数、および関数ローカルスコープの`static`変数である。

```cpp
struct S {
  constinit int n;  // NG
}

int main() {
  constinit int m = 10; // NG
}
```

`constinit`は変数の初期化がコンパイル時に完了することを保証する。したがって`constinit`の効果は初期化を伴う変数宣言に対してのみ適用される。しかし、（別の場所で`constinit`指定されている）変数の最初の初期化の時点で`constinit`指定されている宣言に到達可能とならない場合、診断されない。

```cpp
constinit extern int N; // NG、未定義動作、何も言われない

struct S {
  constinit static int M;
}
int S::M = 12;  // NG、constinitはこちらに必要、おそらく警告が発せられる
```

### 静的・スレッドローカル変数の初期化

静的、あるいはスレッドローカル変数（以降まとめて静的変数と呼ぶ）の初期化は次の手順によって行われる。

静的初期化 [定数初期化（*constant initialization*） or ゼロ初期化（*zero initialization*）] → 動的初期化

動的初期化は実行時に行われる初期化であり、静的初期化はコンパイル時に行われる初期化である。全ての静的変数はコンパイル完了時点で静的初期化されており、その中で動的初期化が必要となる変数だけが動的初期化される。

定数初期化は静的変数に対して最初に試みられる初期化で、初期化式が定数式として実行可能である時に行われる。定数初期化できない残りの変数は全てゼロ初期化される。ゼロ初期化された変数のうち、初期化式を持つものについては実行時に動的初期化される。

定数初期化は非リテラル型のクラス型であっても、対応するコンストラクタが`constexpr`コンストラクタであり、そのコンストラクタを通して全てのメンバが定数式で初期化される場合に、クラス型のオブジェクトに対しても実行可能となる（下の例ではこのコンストラクタのことを定数初期化コンストラクタと呼んでいる）。

`constinit`は、動的初期化の必要がない変数について静的初期化によって初期化が完了している事を保証し、`constinit`変数が動的初期化される場合にコンパイルエラーとするものである。そして、特に定数初期化されている事を明確に保証するために使用する。

## 例
```cpp
#include <mutex>
#include <memory>
#include <random>

constinit const int N = 1;      // OK
constinit unsigned int M = N;   // OK、constな整数型は定数式で利用可能
constinit constexpr int L = 1;  // NG、constinitとconstexprを同時に指定できない

constinit thread_local static int Counter = 0; // OK

constinit const double PI = 3.1415; // OK
constinit double PI2 = PI + PI;     // NG、変数PIは定数式で利用不可

constinit static int N2;  // OK、ゼロ初期化される
constinit int Array[3];   // OK、ゼロ初期化される

constinit std::mutex m{};           // OK、定数初期化コンストラクタ呼び出し
constinit std::unique_ptr<int> p1;  // OK、定数初期化コンストラクタ呼び出し

constinit extern int def = 10;  // OK
constinit extern int ext;       // NG、未初期化、おそらくエラーにはならないが未定義動作

struct C {
  constexpr C() = default;

  C(int n) : m(n) {}

  int m;
};

constinit C c1{};    // OK、定数初期化コンストラクタ呼び出し
constinit C c2{10};  // NG、普通のコンストラクタ呼び出し

struct S {
  constinit static const int x;
  static const int y;
  static constexpr int z = 56;

  constinit int m;  // NG、非静的メンバ変数
};

const int S::x = 12;            // NG、constinitが必要、おそらくエラーにはならないが未定義動作
constinit const int S::y = 34;  // OK、constinit変数なので定数初期化される
constinit constexpr int S::z;   // NG、インライン変数に対する多重定義
                                // constexpr静的メンバ変数に対するクラス外定義はC++17以降非推奨

int main() {
  constinit static std::unique_ptr<int> ptr = nullptr;                // OK、静的ローカル変数
  constinit thread_local std::mt19937 engine(std::random_device{}()); // NG、定数式で初期化できない

  constinit int local = 0;  // NG、ローカル変数
}
```
* constinit[color ff0000]

## この機能が必要になった背景・経緯

静的変数の動的初期化ではコンストラクタ呼び出しを介して通常のC++コードの実行をほぼ自由に行うことができる一方で、各変数の動的初期化順序がどうなるのかはほとんど不定である。

同じ翻訳単位にある静的変数の動的初期化順序はその定義の現れる順番と規定されてはいるが、テンプレートや外部リンケージを持つ変数（`extern/inline`など）およびそれらとの間には順序が規定されておらず、動的初期化の順序に依存したコードは多くの場合未定義動作に陥っている（データ競合や未初期化変数の読み取りなど）。この問題は*static initialization order fiasco*として知られている。

この問題を回避する手段の一つとして、静的変数をなるべく静的初期化（特に、定数初期化）しておくという方法がある。静的初期化においてもテンプレートが絡むと順序は不定になるが、初期化式は定数式となるためほとんどの副作用が禁止されており、他の定数式で使用可能な変数の値を読み込む事以外に他の変数の影響がなく、定数式では他の翻訳単位の事を気にする必要はない。その結果、静的初期化の順序はほとんど予測可能であり、初期化順序に依存したコードでも未定義動作に陥ることはなく、*static initialization order fiasco*のような問題は発生しない。

しかし、静的変数がいつ初期化されているのか、あるいは静的初期化で初期化が完了しているのか動的初期化が必要なのか、はコンパイル後のアセンブリを確認するなどの簡単ではない方法でしか知ることができなかった。そのため、ある時点で静的初期化されていることが確認できた変数がコードの変更によって動的初期化されるようになってしまったとしても、気づくことは困難である。

また、通常動的初期化される変数であっても一定の条件を満たした場合に静的初期化（定数初期化）に切り替えることが許可されている。これはコンパイラやその最適化の程度によって行われるかが変化しうるため、静的変数がいつ初期化されているかを知る事をさらに困難にさせる。

`constinit`は、静的初期化がいつ行われているのかを簡単に知ることができるようにするために導入された。`constinit`変数は動的初期化される場合にコンパイルエラーとなるため、エラーを起こさない`constinit`変数は静的初期化によって初期化が完了していることが保証される。

`constinit`変数は動的初期化時のどのタイミングであっても未初期化でない事が確実なので、少なくとも未初期化変数への読み書きによる未定義動作を防止する事ができる。

## 検討されたほかの選択肢

当初の提案では`constinit`は新しいキーワードを追加した指定子（*specifier*）ではなく、`[[constinit]]`属性として提案されていた。

```cpp
[[constinit]]
int N = 10;

int main() {}
```

ただ、[コンパイラは不明な（未実装の）属性を無視](/lang/cpp17/non_standard_attributes.md)してコンパイルするため、属性にしてしまうとコンパイルエラーが起きていない時に`constinit`が効果を発揮しているのか、あるいは`[[constinit]]`属性が実装されていないだけなのかが不透明となり、`constinit`の本来の役割を果たせなくなってしまう事になりうる。

その他にも`constinit`の効果は属性構文の役割の範囲を超えているなどの指摘もあり、`constinit`は属性ではなく新しいキーワードを導入した指定子となった。

## 備考

`constinit`はキーワードとして追加されており、C++コードのすべての所で予約語として扱われる。そのため、変数名や関数名などとして使用する事はできない。これは、C++17以前に対する破壊的変更となるが、一般的な単語ではなかったため問題にならないと判断されたようである。

## <a id="relative-page" href="#relative-page">関連項目</a>

- [C++11 `constexpr`](/lang/cpp11/constexpr.md)
- [`mutex`のコンストラクタ](/reference/mutex/mutex/op_constructor.md)
- [`unique_ptr`のコンストラクタ](/reference/memory/unique_ptr/op_constructor.md)


## 参照

- [P1143R2 Adding the `constinit` keyword](https://wg21.link/P1143)
- [Constant initialization - Andrzej's C++ blog](https://akrzemi1.wordpress.com/2012/05/27/constant-initialization/)
- [`mutex`のconstexprコンストラクタ - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20120621/p1)
- [Static Initialization Order Fiasco - in neuro](https://yohhoy.hatenadiary.jp/entry/20120621/p1)  