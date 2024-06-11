# resource
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp17[meta cpp]

```cpp
memory_resource* resource() const;
```

## 概要
`polymorphic_allocator`が保持する`memory_resource`を取得する。

## 戻り値
利用している`memory_resource`のポインタ。

この関数の実行後、内部で`memory_resource`を保持しない状態になったりはしない。

## 例
```cpp example
#include <iostream>
#include <memory_resource>

int main() {
  auto mr = std::pmr::monotonic_buffer_resource{};
  std::pmr::polymorphic_allocator<int> alloc{ &mr };

  std::cout << std::boolalpha;
  std::cout << (*alloc.resource() == mr);
}
```
* resource[color ff0000]
* monotonic_buffer_resource[link /reference/memory_resource/monotonic_buffer_resource.md]

### 出力
```
true
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 [mark verified]

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)