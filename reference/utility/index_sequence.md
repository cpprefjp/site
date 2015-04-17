#index_sequence (C++14)
* utility[meta header]
* std[meta namespace]
* typedef[meta id-type]

```cpp
namespace std {
  template <size_t... I>
  using index_sequence = integer_sequence<size_t, I...>;
}
```
* size_t[link /reference/cstddef/size_t.md]
* integer_sequence[link ./integer_sequence.md]

##概要
`index_sequence`は、[`size_t`](/reference/cstddef/size_t.md)型のシーケンスをコンパイル時に表現する、[`integer_sequence`](./integer_sequence.md)クラスの別名である。


##例
```cpp
#include <iostream>
#include <utility>

void g(std::size_t a, std::size_t b, std::size_t c)
{
  std::cout << a << ", " << b << ", " << c << std::endl;
}

template <std::size_t... Seq>
void f(std::index_sequence<Seq...>)
{
  // 定数のシーケンス{0, 1, 2}を取り出して、関数g()の引数として転送
  g(Seq...);
}

int main()
{
  f(std::index_sequence<0, 1, 2>());
}
```
* std::size_t[link /reference/cstddef/size_t.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

##出力
```
0, 1, 2
```

##参照
- [N3658 Compile-time integer sequences](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3658.html)


