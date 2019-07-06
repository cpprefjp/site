# constexpr if 文
* cpp17[meta cpp]

## 概要

constexpr if文とは、文を条件付きコンパイルすることを目的とした制御構文である。

```
if constepxr ( condition )
  statement
else
  statement
```

`condition`はコンパイル時に`bool`に評価できる式である。
`condition`によって採用されなかった分岐は、二段階名前解決において、
2段階目の依存式の解析(依存名解決およびテンプレートの実体化)の対象から除外される。
ただし、どちらの分岐も1段階目の構文解析・意味解析の対象となる事に注意する。

## 仕様

constexpr if文は文法的には通常の`if`文において`(condition)`の前に`constexpr`があるだけである。
条件`condition`は文脈的に`bool`に変換可能な定数式である
(例えば`constexpr`指定された`explicit operator bool()`を持つ型の式)。
条件が`false`の時最初のsubstatementがdiscarded statementとなり、`true`の時2つ目のsubstatementがdiscarded statementとなる。
テンプレート実体化の後に条件が非依存式のとき、discarded statementは実体化されない。

- discarded statementに現れるodr-usedな構成要素は定義されていなくても良い。
- constexpr if文の中の`case`及び`default`ラベルは、同じsubstatementにある`switch`に対応している必要がある。
- constexpr if文の中のラベルは、同じsubstatement内からしか参照してはならない。
- 関数の戻り値の型の推論において、discarded statement内のreturn文は無視される。

constexpr if文を用いれば例えば以下の様なコードを書くことができる。
constexpr if文の中にある `s += a1` や `s += a1.capacity()` 等のようなコードは、`A1`が特定の型の時にしか適格にならない。
通常のif文を使うとこれをコンパイルする事はできないが、
constexpr if文を用いれば特定の条件を満たした時にだけコードが実体化させることにより、以下のような記述を可能にする。

```
#include <vector>
#include <string>
#include <iostream>

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

### 二段階名前解決における注意点

`constexpr if`文で、実行されない方の`statement`は`discarded statement`(破棄文)となり、文の実体化を防ぐ。言い換えると、Two Phase Name Look-upにおける`dependent name`(以下、依存名)は、`discarded statement`の場合検証されない。また文が実体化されないのだから通常のif文と同じくもちろん実行時に実行もされない。つまり次の例は意図と異なる挙動を示す。

```cpp example
#include <type_traits>

template <typename T>
void f()
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

なぜならば`discarded statement`はテンプレートの実体化を防ぐ (依存名の検証をしない) だけで、非依存名は検証されるからである。この例の[`static_assert`](/lang/cpp11/static_assert.md)に渡す条件式はテンプレートパラメータに依存していないので、テンプレートの宣言時に検証され、エラーとなる。言い換えれば`static_assert`に渡す条件式が依存名ならばテンプレートの宣言時に検証されず、テンプレート実体化まで評価を遅らせることができる。

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

### 類似機能との比較

`constexpr if`文の導入によってC++の`if`系の条件分岐文は3種類になった。

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


## この機能が必要になった背景・経緯

## 検討されたほかの選択肢

## 関連項目

- [`std::conditional`](/reference/type_traits/conditional.md)


## 参照

- [N3322 A Preliminary Proposal for a Static if](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3322.pdf)
- [N3329 Proposal: `static if` declaration](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3329.pdf)
- [N3613 “Static If ” Considered](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3613.pdf)
- [Static If I Had a Hammer - Andrei Alexandrescu](https://channel9.msdn.com/Events/GoingNative/GoingNative-2012/Static-If-I-Had-a-Hammer)
- [P0128R1 `constexpr if`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0128r1.html)
- [P0292R2 `constexpr if`: A slightly different syntax](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0292r2.html)
- [Clang Developers - Clang getting involved](http://clang-developers.42468.n3.nabble.com/Clang-getting-involved-td4038330.html)
- [`__if_exists` Statement | Microsoft Docs](https://docs.microsoft.com/ja-jp/cpp/cpp/if-exists-statement)
- [if constexprを使うとき、特定条件時にコンパイルを失敗させる - Qiita](http://qiita.com/saka1_p/items/e8c4dfdbfa88449190c5)
- [本の虫: constexpr ifの落とし穴](https://cpplover.blogspot.jp/2017/05/constexpr-if.html)
- [`static_assert`の評価を実体化まで遅延させる簡単な方法 - Qiita](https://qiita.com/alphya/items/b3463d1a2f53687f6025)
- [C++ - constexpr if と local struct の評価のタイミングについて｜teratail](https://teratail.com/questions/166409)
