# operator==
* scoped_allocator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class OuterA1, class OuterA2, class... InnerAllocs>
  bool operator==(const scoped_allocator_adaptor<OuterA1, InnerAllocs...>& a,
                  const scoped_allocator_adaptor<OuterA2, InnerAllocs...>& b) noexcept;
}
```

## 概要
2つの`scoped_allocator_adaptor`オブジェクトを�値比較する。


## 戻り値
`sizeof...(InnerAlloc) == 0`であるならば、`a.`[outer_allocator()](outer_allocator.md) `== b.`[`outer_allocator()`](outer_allocator.md)の結果を返す。

そうでなければ、`a.`[outer_allocator()](outer_allocator.md) `== b.`[`outer_allocator()`](outer_allocator.md) `&& a.`[`inner_allocator()`](inner_allocator.md) `== b.`[`inner_allocator()`]の結果を返す。


## 例
```cpp example
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
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]

### 出力
```
equal
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.7.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
