# if constexpr 文
* cpp17[meta cpp]

## 概要

`if constexpr`文とは、コンパイル時に条件分岐する文である。

```
if constepxr ( condition )
  statement
else
  statement
```

`if constexpr`文の導入によってC++の`if`系の条件分岐文は3種類になった。

- プリプロセス時`if`: `#if`
- コンパイル時`if`: `if constexpr`
- 実行時`if`: `if`

`condition`はコンパイル時にコンテキスト依存のbool型への変換が起こる式である。例えば`constexpr`指定された`explicit operator bool()`は評価できる。

`else`文には`constexpr`書かない。`if`の後に`constexpr`を書く以外では実行時`if`文と構文に差はない。

プリプロセス時`if`文と異なり、`if constexpr`文は条件付きコンパイルをすることはできない。例えば次の例は違法である。

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

`if constexpr`文はスコープを作るので、例えばVisual C++の独自拡張機能である[`__if_exists`](https://docs.microsoft.com/ja-jp/cpp/cpp/if-exists-statement)は以下のような書き方が可能であるが、`if constexpr`文でこれを再現することはできない。

```cpp
struct A {
    static float get() { return 1.2f;  }
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

同様にD言語の`static if`とは違いスコープを作るので、D言語で合法な次のようなことは`if constexpr`文で再現できない。

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

`if constexpr`文で、実行されない方の`statement`は`discarded statement`(破棄文)となり、文の実体化を防ぐ。言い換えると、Two Phase Name Look-upにおける`dependent name`(依存名)は、`discarded statement`の場合検証されない。また文が実体化されないのだから通常のif文と同じくもちろん実行時に実行もされない。つまり次の例は意図と異なる挙動を示す。

```cpp
#include <type_traits>

template<typename T>
void f()
{
  if constexpr (std::is_same_v<T, int>)
  {
    // Tがintのときのみ発動してほしい
    // 実際は常に発動する
    static_assert(false) ;
  }
}
```

なぜならば`discarded statement`はテンプレートの実体化を防ぐ(依存名の検証をしない)だけで、被依存名は検証されるからである。この例の[`static_assert`](https://cpprefjp.github.io/lang/cpp11/static_assert.html)に渡す条件式はテンプレートパラメータに依存していないので、テンプレートの宣言時に検証され、エラーとなる。言い換えれば`static_assert`に渡す条件式が依存名ならばテンプレートの宣言時に検証されず、テンプレート実体化まで評価を遅らせる事ができる。

```cpp
#include <type_traits>

template <typename T>
constexpr bool false_v = false;
template<typename T>
void f()
{
  if constexpr (std::is_same_v<T, int>)
  {
    // Tがintのときのみ発動する
    static_assert(false_v<T>);
  }
}
```

`if constexpr`文の条件式内は実体化が起きる。したがって実体化するとコンパイルエラーになるものは書いてはいけない。

```cpp
#include <type_traits>
#include <iostream>

struct Hoge {
    using type = int;
};

template<typename T>
void f()
{
  if constexpr (std::is_same_v<T::type, int> || std::is_same_v<T::value_type, int>) {
    std::cout << "is int" << std::endl;
  }
}
int main()
{
  f<Hoge>();//error: Hoge::value_typeは存在しないのでif constexpr文の条件式がコンパイルエラーになる
}
```

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
