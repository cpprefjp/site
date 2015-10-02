#make_index_sequence
* utility[meta header]
* std[meta namespace]
* typedef[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <size_t N>
  using make_index_sequence = make_integer_sequence<size_t, N>;
}
```
* size_t[link /reference/cstddef/size_t.md]
* make_integer_sequence[link ./make_integer_sequence.md]


##概要
`make_index_sequence`は、要素数を指定して、0から始まる[`size_t`](/reference/cstddef/size_t.md)型整数シーケンスを生成する、[`make_integer_sequence`](./make_integer_sequence.md)の別名である。

テンプレートパラメータは、以下を意味する：

- `N` : 要素数


##例
```cpp
#include <iostream>
#include <utility>

void g(std::size_t a, std::size_t b, std::size_t c)
{
  std::cout << a << ", " << b << ", " << c << std::endl;
}

template <class T, T... Seq>
void f(std::integer_sequence<T, Seq...>)
{
  // 定数のシーケンス{0, 1, 2}を取り出して、関数g()の引数として転送
  g(Seq...);
}

int main()
{
  f(std::make_index_sequence<3>());
}
```
* std::integer_sequence[link ./integer_sequence.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

##出力
```
0, 1, 2
```


##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.4
- [GCC, C++14 mode](/implementation.md#gcc): 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 14.0


##参照
- [N3658 Compile-time integer sequences](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3658.html)


