# constexpr if 文 [P0292R2]
* cpp17[meta cpp]

<!-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

constexpr if文とは、文を条件付きコンパイルすることを目的とした制御構文である。

```cpp
if constexpr ( condition )
  statement
else
  statement
```

`condition`はコンパイル時に`bool`に評価できる式である。
`condition`によって採用されなかった分岐は、2段階名前探索(two-phase name lookup)において、
2段階目の依存式の解析(依存名解決およびテンプレートの実体化)の対象から除外される。
ただし、どちらの分岐も1段階目の構文解析・意味解析の対象となる事に注意する。

## 仕様

constexpr if文は文法的には通常の`if`文において`(condition)`の前に`constexpr`があるだけである。
条件`condition`は文脈的に`bool`に変換可能な定数式である
(例えば`constexpr`指定された`explicit operator bool()`を持つ型の式)。
条件が`false`の時最初の分岐が廃棄文(discarded statement)となり、`true`の時2つ目の分岐が廃棄文となる。
テンプレート実体化の後に条件が非依存式のとき、廃棄文は実体化されない。

- 廃棄文に現れるodr-usedな構成要素は定義されていなくても良い。
- constexpr if文の中の`case`及び`default`ラベルは、同じ分岐にある`switch`に対応している必要がある。
- constexpr if文の中のラベルは、同じ分岐内からしか参照してはならない。
- 関数の戻り値の型の推論において、廃棄文内のreturn文は無視される。

constexpr if文を用いれば例えば以下の様なコードを書くことができる。
constexpr if文の中にある `s += a1` や `s += a1.capacity()` 等のようなコードは、`A1`が特定の型の時にしか適格にならない。
通常のif文を使うとこれをコンパイルする事はできないが、
constexpr if文を用いれば特定の条件を満たした時にだけコードが実体化させることにより、以下のような記述を可能にする。

```cpp
#include <vector>
#include <string>
#include <iostream>
#include <type_traits>

template <typename Out, typename A1, typename A2>
void f(Out& o, A1 const& a1, A2 const& a2)
{
  int s = 0;
  if constexpr (std::is_same_v<A1, int>)
    s += a1;
  else if constexpr (std::is_same_v<A1, std::vector<int>>)
    s += a1.capacity();

  if constexpr (std::is_same_v<A2, int>)
    s += a2;
  else if constexpr (std::is_same_v<A2, std::string>)
    s += a2.size();

  if constexpr (std::is_same_v<Out, int>)
    o = s;
  else if constexpr (std::is_same_v<Out, std::ostream>)
    o << s;
}
```

この様な分岐は、従来はテンプレートの特殊化や推論規則(SFINAE)を利用した手法により実現されていたが、
一つの関数の中に分岐が複数あると用意しなければならない特殊化・多重定義が指数関数的に増える。
代わりに処理毎に分割してそれぞれにテンプレートを用意することが可能な場合もあるが、
それでも記述が実際にしたい処理に比べて不必要に複雑になる。
constexpr if文の導入によりそのような複雑な手法を用いずに素直に条件付きのコンパイルを実現できるようになった。

### 2段階名前探索における注意点

`constexpr if`文で、実行されない方の`statement`は廃棄文(discarded statement)となり、文の実体化を防ぐ。言い換えると、2段階名前探索における依存名(dependent name)は、廃棄文の場合検証されない。また文が実体化されないのだから通常のif文と同じくもちろん実行時に実行もされない。つまり次の例は意図と異なる挙動を示す。

```cpp example
#include <type_traits>

template <typename T>
void f(T)
{
  if constexpr (std::is_same_v<T, int>)
  {
    // Tがintのときのみ評価されてほしい
    // 実際は常に評価される
    static_assert(false);
  }
}

int main()
{
  f(2.4);
  f(3);
}
```

なぜならば廃棄文はテンプレートの実体化を防ぐ (依存名の検証をしない) だけで、非依存名は検証されるからである。この例の[`static_assert`](/lang/cpp11/static_assert.md)に渡す条件式はテンプレートパラメータに依存していないので、テンプレートの宣言時に検証され、エラーとなる。言い換えれば`static_assert`に渡す条件式が依存名ならばテンプレートの宣言時に検証されず、テンプレート実体化まで評価を遅らせることができる。

```cpp example
#include <type_traits>

template <typename T>
constexpr bool false_v = false;

template <typename T>
void f(T)
{
  if constexpr (std::is_same_v<T, int>)
  {
    // Tがintのときのみ評価される
    static_assert(false_v<T>);
  }
}

int main()
{
  f(2.4);
  f(3);
}
```

上の例では`false_v`を作ったが、ラムダ式でも同様のことができる。ラムダ式はそれが記述された位置から見て最小のスコープ (ブロックスコープ／クラススコープ／名前空間スコープ) で宣言されるクラスとして扱われる。例えば、下の例では`f()`という関数テンプレート内で宣言される。関数テンプレート内のクラスは依存名になるため、テンプレートの宣言時に検証されず、テンプレート実体化まで評価を遅らせることができる。

```cpp example
#include <type_traits>

template <typename T>
void f(T)
{
  if constexpr (std::is_same_v<T, int>)
  {
    // Tがintのときのみ評価される
    static_assert([]{return false;}());
  }
}

int main()
{
  f(2.4);
  f(3);
}
```

`constexpr if`文の条件式内は実体化が起きる。したがって実体化するとコンパイルエラーになるものは書いてはいけない。

```cpp example
#include <type_traits>
#include <iostream>

struct Hoge {
  using type = int;
};

template <typename T>
void f()
{
  if constexpr (std::is_same_v<T::type, int> || std::is_same_v<T::value_type, int>) {
    std::cout << "is int" << std::endl;
  }
}

int main()
{
  f<Hoge>(); //error: Hoge::value_typeは存在しないのでif constexpr文の条件式がコンパイルエラーになる
}
```

### (CWG 2518が適用された環境) `static_assert`文に関する例外

上に述べたように、`constexpr if`文の中の文は廃棄文においても、非依存名の検証を行う。このため特に`static_assert`文を使う時に直感的ではない挙動を示していた。

C++23以降、もしくはCWG 2518が適用された環境においては、template文(もしくは適切な特殊化や`constexpr if`文の中の文)が実際にインスタンス化されるまで、`static_assert`文の宣言は遅延される。

```cpp example
#include <cstdint>
template <class T>
void f(T t) {
  if constexpr (sizeof(T) == sizeof(std::int32_t)) {
    use(t);
  } else {
    static_assert(false, "must be 32bit");
  }
}

void g(std::int8_t c) {
  std::int32_t n = 0;
  f(n); // OK: nはstd::int32_t型なので`use(t);`のほうがインスタンス化されるために、static_assert文は宣言されない。
  f(c); // error: cはstd::int8_t型なので、static_assert文は宣言され、"must be 32bit"とコンパイラが診断メッセージを出力する
}
```

### 類似機能との比較

`constexpr if`文の導入によってC++の`if`系の条件分岐は3種類になった。

- プリプロセス時`if`: `#if`
- コンパイル時`if`: `constexpr if`
- 実行時`if`: `if`

プリプロセス時の`#if`指令と異なり、`constexpr if`文は宣言を条件付きでコンパイルをすることはできない。例えば次の例は不適格である。

```cpp
struct X {
  if constexpr (cond) {
    void f();
    using int32 = int;
  }
  else {
    void g();
  }
};
```

`constexpr if`文はスコープを作るので、例えばVisual C++の独自拡張機能である[`__if_exists`](https://docs.microsoft.com/ja-jp/cpp/cpp/if-exists-statement)は以下のような書き方が可能であるが、`constexpr if`文でこれを再現することはできない。

```cpp
struct A {
  static float get() { return 1.2f; }
};
int main() {
  auto a = __if_exists(A::get) {
    A::get();
  }
  __if_not_exists(A::get) {
    "not found";
  }
}
```

同様にD言語の`static if`とは違いスコープを作るので、D言語で可能な次のようなことは`constexpr if`文で再現できない。

```D
const int i = 3;
class C {
  const int k = 5;

  static if (i == 3) // D言語ではok
    int x;
  else
    long x;
}
```

なお型情報のifが欲しいならば、[`std::conditional`](/reference/type_traits/conditional.md) がある。

```cpp example
#include <type_traits>
#include <random>
#include <cstdint>
#include <iostream>

// C++11
template<typename Integer>
using mt = typename std::conditional<std::is_same<Integer, std::uint32_t>::value, std::mt19937, std::mt19937_64>::type;

// C++14以降
// template<typename Integer>
// using mt = std::conditional_t<std::is_same<Integer, std::uint32_t>::value, std::mt19937, std::mt19937_64>;

int main()
{
  mt<std::uint32_t> m1 {37};
  std::cout << m1() << std::endl;
}
```
* std::conditional[link /reference/type_traits/conditional.md]
* std::conditional_t[link /reference/type_traits/conditional.md]
* std::mt19937_64[link /reference/random/mt19937_64.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]


## この機能が必要になった背景・経緯

一番最初の静的な条件分岐の提案文書 N3322 の直接のきっかけになったのは、
静的な条件によってコンパイルエラーを発生させる `static_assert` の C++11 への導入である。
その拡張として静的な条件によって宣言を切り替えられる機能を考えるのは自然な発想である。
N3322 では、`static_assert` と同じように、
名前空間スコープ・クラススコープ・ブロックスコープの何れでも使える `static_if` を提案している。
次の提案文書 N3329 ではD言語における実装 [D0.124 `static if` (2005年)、D2.015 Template Constraints (2008年)] の実績を元に、
より詳しい提案を行っている。

これらの提案の目的は、従来使われた手法であるテンプレート特殊化、SFINAE、
タグディスパッチなどの複雑な技法を単純化することであった。

- (A) 関数やメンバ関数の静的な条件分岐については、従来はテンプレート特殊化やSFINAEが用いられた。
  静的な条件分岐を用いればより自然に実装することが可能である。
- (B) メンバ変数の静的な条件分岐については、従来は再帰的なクラスの派生とEBO(空の基底の最適化)の技法を用いた。
  メンバ変数の条件分岐毎にクラスを派生させる必要があり、また派生による様々な制限を避けるために複雑になる。
- (C) ブロックスコープにおける静的な条件分岐に関しては、従来は分岐毎に処理を新しいテンプレートを定義して委譲する必要があった。
  処理の間で変数を明示的に共有するために処理が複雑になる。処理が複数箇所に分断されるため読みにくく、また記述も煩雑である。

特にこれらの提案で特徴的だったのは、

- 静的な条件分岐によって関数や変数の宣言自体を切り替えることができる。
- 静的な条件分岐の構文は新しいスコープを作らない。つまり条件分岐内の宣言は外から直接見える。
- 廃棄された分岐(discarded branch)については構文解析すら実施しない (字句解析だけ行う)。

一方で N3576 および N3613 において静的な条件分岐の提案は厳しい批判に晒されることになる。
N3576 では Concepts Lite による条件付きの宣言を行う機能と、静的な条件分岐の機能の棲み分けが懸念された。
両機能の矛盾が生じる懸念から少なくとも Concepts Lite の仕様が固まるまでは静的な条件分岐の議論は凍結するべきとの意見が強かった。
更に、N3613 では N3322/N3329 で提案された仕様に対する批判が行われた。
分かりにくくメンテナンスしにくいという事と、Concepts Lite との棲み分けの問題の他に、
AST(抽象構文木)を元にしたソースコードの静的解析ツールの開発を困難にするとの指摘があった。
また、静的な条件分岐で記述が本当に簡単になるのかという点についての幾つかの疑問も呈された。
例えば、クラスメンバに対する静的な条件分岐に関しては、
使用する側でも同様の静的な条件分岐が毎回必要であり煩雑であるということ。
また、実際に複雑な処理を実装するのはライブラリ実装者であり、
その様な者は従来の複雑な手法も理解しているはずなので、新しい機能は不要ではないかということ。
他に、関数の多重定義や従来のテンプレート特殊化・SFINAE技法と比べて自由度が小さいということ、
更にそれらとの組み合わせよって起こる問題についても懸念があった。

N4461, P0128R0, P0128R1 では批判を受けて静的な条件分岐の大幅な単純化が提案された。
特に、静的な条件分岐は上記 (C) ブロックスコープに限定し、宣言の条件分岐には使えないこととした。
また静的な条件分岐は通常の`if`文と同様に変数のスコープを作成するということ、
及び、廃棄された分岐の構文解析もテンプレートの2段階名前探索と同様にして実施するということが提案された。
また、静的な条件分岐はテンプレートの中でしか使えないよう制限することも提案された。

P0292R0-P0292R2 では、静的な条件分岐のキーワードが `if constexpr` になった。
また、`static_assert` と同様に、テンプレートの外でも静的な条件分岐を許すように修正された。
`auto`による関数の戻り値の型の推論で、廃棄された分岐内の`return`文は参考にしない旨が明記され、
C++17 の規格原案 N4606 において変更が適用された。

## 検討されたほかの選択肢

N3322 では `static_assert` からの連想でキーワードとして `static_if` / `else` の組が提案された。
N3329 ではD言語を参考にして `static if` / `else` の組が提案された。
N3613 では `static if` の様な複合キーワードは、間にコメントを挟めるので、分かりにくく問題であると指摘された。
また、通常の`if`文と静的な条件分岐とが互いに入れ子になっている時に `else` がどれに属しているのか分かりにくいとの指摘もあった。
これを受けて P0128R0 では、静的な条件分岐がブロックスコープに制限されると共に、`constexpr_if` / `constexpr_else` となった。
P0128R1 では、`constexpr if` / `constexpr_else` に改訂された。
P0292R0 で現行の `if constexpr` / `else` が提案され、
文法上は通常の`if`文に対する`constexpr`キーワードの修飾という形にまとめられた。
`else` に関しては、通常の入れ子の`if`文と同様に一番近くの`if`/`if constexpr`文に属するとすれば曖昧さはないこと、
また `if constexpr` を繋げた時の煩雑さから単に`else`とすることになった。

```cpp
// N3322
static_if (condition)
  statement
else static_if (condition)
  statement
else
  statement

// N3329
static if (condition) {
  statement
} else static if (condition) {
  statement
} else {
  statement
}

// P0128R0
constexpr_if (condition)
  statement
constexpr_else
  statement

// P0128R0
constexpr if (condition)
  statement
constexpr_else constexpr if (condition)
  statement
constexpr_else
  statement
```

静的な条件分岐の各分岐を囲む波括弧 `{ ... }` に関しては、
廃棄された分岐の構文解析を行わない N3329 においては必須とされた。
つまり、構文解析は行わずに単に括弧だけの対応を取ることにより分岐の終わりを調べる。
しかし、N3613 における批判により、結局はテンプレートの2段階名前探索と同様に、
廃棄された分岐でも構文解析は実施され、非依存名に関しては1段階目で検証されることとなった。
これにより通常の`if`文と同様に `{ ... }` は任意となった。

```cpp
// N3329
template<class T>
void g() {
  static if (false) {
    static_assert(false); // 引っかからない (構文解析すら実施されない)
  }
}

// P0292R0
template<class T>
void g() {
  if constexpr (false)
    static_assert(false); // 廃棄された分岐内でも引っかかる (ill-formed NDR)
}
```

静的な条件によって関数の宣言・実装を切り替える構文として、N3322 および N3329 では以下のようなものも提案された。
これは `requires` キーワードを用いる Concepts Lite が目的とする機能との類似性もあり、
Concepts Lite の仕様が確定していない段階で、
どのように棲み分けるのかや両方用いた時の振る舞いについての考察が問題になった。

```cpp
// N3322
template<typename T>
void f()
  static_if (condition) {
    statement
  } else static_if (condition) {
    statement
  } else {
    statement
  }

// N3329 (cf D言語の Template Constraints)
template<typename T> void f() if (condition);
template<typename T>
void f()
  if (condition) {
    statement
  }
```

ブロックスコープでの静的な条件分岐について、
ライブラリによる代替手段として以下のようなものも可能であることが P0128R0 で指摘されている。
つまり、ジェネリックラムダの実体化は実際に関数の呼び出しがある時に行われるので、
実体化を遅延することができるのである。

```cpp
// P0128R0
template <int arg, typename ... Args> int do_something(Args... args) {
  return static_if<sizeof...(args)>::get(
    [](auto x, auto y) { return x+y; },
    [](auto x) { return *x; })(args...);
}
```

その他に、元々静的な条件分岐で置き換える目的だった、
旧来のテンプレート特殊化・SFINAE・タグディスパッチ・EBO・再帰的な派生などの技法を用いた複雑な代替手段もあるが、
それらを一つ一つここで紹介することは避ける。

## <a id="relative-page" href="#relative-page">関連項目</a>

- [`std::conditional`](/reference/type_traits/conditional.md)
- [C++23 定数式の文脈での`bool`への縮小変換を許可](/lang/cpp23/narrowing_contextual_conversions_to_bool.md)

## 参照

### 関連する提案文書

- [[PDF] N3322: A Preliminary Proposal for a Static if](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3322.pdf)
- [[PDF] N3329: Proposal: `static if` declaration](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3329.pdf)
- [[PDF] N3576: SG8 Concepts Teleconference Minutes – 2013-03-12](https://isocpp.org/files/papers/N3576.pdf) §2.1
- [[PDF] N3613: “Static If ” Considered](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3613.pdf)
- [N4461: Static if resurrected](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4461.html)
- [P0128R0: constexpr_if](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0128r0.html)
- [P0128R1: constexpr if](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0128r1.html)
- [P0292R0: constexpr if: A slightly different syntax](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0292r0.html)
- [P0292R1: constexpr if: A slightly different syntax](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0292r1.html)
- [P0292R2: constexpr if: A slightly different syntax](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0292r2.html)
- [N4603 Editor's Report -- Committee Draft, Standard for Programming Language C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/n4603.html)
- [P2593R1: Allowing static_assert(false)](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2593r1.html)

### 2段階名前探索における注意点について

- [if constexprを使うとき、特定条件時にコンパイルを失敗させる - Qiita](http://qiita.com/saka1_p/items/e8c4dfdbfa88449190c5)
- [本の虫: constexpr ifの落とし穴](https://cpplover.blogspot.jp/2017/05/constexpr-if.html)
- [`static_assert`の評価を実体化まで遅延させる簡単な方法 - Qiita](https://qiita.com/alphya/items/b3463d1a2f53687f6025)
- [C++ - constexpr if と local struct の評価のタイミングについて｜teratail](https://teratail.com/questions/166409)

### その他

- [C++11 コンパイル時アサート](/lang/cpp11/static_assert.md)
- [Static If I Had a Hammer - Andrei Alexandrescu](http://web.archive.org/web/20201202042515/https://channel9.msdn.com/Events/GoingNative/GoingNative-2012/Static-If-I-Had-a-Hammer)
- [C++1z if constexpr文 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/12/22/171238)
- [[cfe-dev] Clang getting involved](https://lists.llvm.org/pipermail/cfe-dev/2014-March/035801.html)
- [`__if_exists` Statement | Microsoft Docs](https://docs.microsoft.com/ja-jp/cpp/cpp/if-exists-statement)
- [Issue 2518: Conformance requirements and #error/#warning - WG21 CWG Issues](https://wg21.cmeerw.net/cwg/issue2518)