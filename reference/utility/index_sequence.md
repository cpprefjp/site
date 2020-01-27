# index_sequence
* utility[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <std::size_t... I>
  using index_sequence = integer_sequence<std::size_t, I...>;
}
```
* integer_sequence[link integer_sequence.md]

## 概要
`index_sequence`は、[`size_t`](/reference/cstddef/size_t.md)型のシーケンスをコンパイル時に表現する、[`integer_sequence`](integer_sequence.md)クラスの別名である。


## 例
```cpp example
#include <iostream>
#include <utility>

void g(std::size_t a, std::size_t b, std::size_t c)
{
  std::cout << a << ", " << b << ", " << c << std::endl;
}

template <class T, T... Seq>
void f(std::integer_sequence<T, Seq...>) // g++のバグに対する回避�
                                         // 本来はindex_sequenceで受け取れるはず
{
  // 定数のシーケンス{0, 1, 2}を取り出して、関数g()の引数として転送
  g(Seq...);
}

int main()
{
  f(std::index_sequence<0, 1, 2>());
}
```
* std::index_sequence[color ff0000]
* std::integer_sequence[link integer_sequence.md]

## 出力
```
0, 1, 2
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.4
- [GCC](/implementation.md#gcc): 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015

### 備考
- GCC 4.9.2で、`std::index_sequence`を関数のパラメータとして受け取るとコンパイルエラーになる問題がある([Bug 65790](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=65790))


## 参照
- [N3658 Compile-time integer sequences](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3658.html)

