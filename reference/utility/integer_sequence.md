#integer_sequence (C++14)
* utility[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T, T... I>
  struct integer_sequence {
    typedef T value_type;
    static constexpr size_t size() noexcept { return sizeof...(I); }
  };
}
```

##概要
`integer_sequence`は、任意の整数型のシーケンスをコンパイル時に表現するクラスである。

このクラスは、[`tuple`](/reference/tuple/tuple.md)オブジェクトを展開して、引数パックとして他の関数に転送することを主目的として作られた。


##例
```cpp
#include <iostream>
#include <utility>

void g(int a, int b, int c)
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
  f(std::integer_sequence<int, 0, 1, 2>());
}
```
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

##出力
```
0, 1, 2
```

##参照
- [N3658 Compile-time integer sequences](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3658.html)


