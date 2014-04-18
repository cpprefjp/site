#operator== (C++11)
```cpp
namespace std {
  template <class OuterA1, class OuterA2, class... InnerAllocs>
  bool operator==(const scoped_allocator_adaptor<OuterA1, InnerAllocs...>& a,
                  const scoped_allocator_adaptor<OuterA2, InnerAllocs...>& b) noexcept;
}
```

##概要
2つの`scoped_allocator_adaptor`オブジェクトを等値比較する。


##戻り値
`sizeof...(InnerAlloc) == 0`であるならば、`a.`[outer_allocator()](./outer_allocator.md) `== b.`[`outer_allocator()`](./outer_allocator.md)の結果を返す。

そうでなければ、`a.`[outer_allocator()](./outer_allocator.md) `== b.`[`outer_allocator()`](./outer_allocator.md) `&& a.`[`inner_allocator()`](./inner_allocator.md) `== b.`[`inner_allocator()`]の結果を返す。


##例
```cpp
#include <iostream>
#include <vector>
#include <string>

#include <scoped_allocator>

template <class T>
using alloc_t = std::allocator<T>;

// コンテナの要素(Inner)
using string = std::basic_string<
  char,
  std::char_traits<char>,
  alloc_t<char>
>;

// コンテナ(Outer)
template <class T>
using vector = std::vector<
  T,
  std::scoped_allocator_adaptor<alloc_t<T>, alloc_t<typename T::value_type>>
>;

int main()
{
  vector<string>::allocator_type a, b;

  if (a == b) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```

###出力
```
equal
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation#clang.md): 3.0
- [GCC, C++11 mode](/implementation#gcc.md): 4.7.3
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??
