# index_sequence_for
* utility[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class... T>
  using index_sequence_for = make_index_sequence<sizeof...(T)>;
}
```
* make_index_sequence[link make_index_sequence.md]

## 概要
`index_sequence_for`は、型のシーケンス、0から始まる[`size_t`](/reference/cstddef/size_t.md)型整数シーケンスに変換する、[`make_index_sequence`](make_index_sequence.md)の別名である。

テンプレートパラメータは、以下を意味する：

- `...T` : 任意の型のシーケンス


## 例
```cpp example
#include <iostream>
#include <utility>
#include <tuple>

void g(std::size_t a, std::size_t b, std::size_t c)
{
  std::cout << a << ", " << b << ", " << c << std::endl;
}

template <class T, T... Seq>
void f_(std::integer_sequence<T, Seq...>)
{
  g(Seq...);
}

template <class... T>
void f(std::tuple<T...>&&)
{
  // 型のシーケンスを、インデックスのシーケンスに変換
  f_(std::index_sequence_for<T...>());
}

int main()
{
  f(std::make_tuple(1, 'a', "Hello"));
}
```
* std::index_sequence_for[color ff0000]
* std::integer_sequence[link integer_sequence.md]
* std::tuple[link /reference/tuple/tuple.md]
* std::make_tuple[link /reference/tuple/make_tuple.md]

## 出力
```
0, 1, 2
```


## バージョン
### 言語
- C++14

### 処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.4
- [GCC, C++14 mode](/implementation.md#gcc): 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015


## 参照
- [N3658 Compile-time integer sequences](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3658.html)


