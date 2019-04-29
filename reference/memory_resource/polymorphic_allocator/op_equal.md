# operator==
* memory_resource[meta header]
* std::pmr[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  template <class T1, class T2>
  bool operator==(const polymorphic_allocator<T1>& a,
                  const polymorphic_allocator<T2>& b) noexcept;
}
```

## 概要
2つの`polymorphic_allocator`オブジェクトを等値比較する。

## 戻り値
`*a.resource() == *b.resource()`

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main()
{
  auto mr = std::pmr::monotonic_buffer_resource{};
  std::pmr::polymorphic_allocator<int> alloc{ &mr };
  std::pmr::polymorphic_allocator<int> alloc2{};
  std::pmr::polymorphic_allocator<double> alloc3{ &mr };

  std::cout << std::boolalpha;
  std::cout << (alloc == alloc2) << std::endl;
  std::cout << (alloc == alloc) << std::endl;
  //同じmemory_resourceを利用していればtrue
  std::cout << (alloc == alloc3) << std::endl;
}
```
* ==[color ff0000]
* monotonic_buffer_resource[link /reference/memory_resource/monotonic_buffer_resource.md]

### 出力
```
false
true
true
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`operator==`](/reference/memory_resource/memory_resource/op_equal.md)