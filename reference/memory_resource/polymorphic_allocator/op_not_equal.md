# operator!=
* memory_resource[meta header]
* std::pmr[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::pmr {
  // operator==により、以下のオーバーロードが使用可能になる (C++20)
  template <class T1, class T2>
  bool operator!=(const polymorphic_allocator<T1>& a,
                  const polymorphic_allocator<T2>& b) noexcept; // (1) C++17
}
```

## 概要
2つの`polymorphic_allocator`オブジェクトを非等値比較する。

## 戻り値
`!(a == b)`

## 備考

この演算子はC++20以降、対応する[`==`を利用して導出](/lang/cpp20/consistent_comparison.md)される。

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
  std::cout << (alloc != alloc2) << std::endl;
  std::cout << (alloc != alloc) << std::endl;
  //同じmemory_resourceを利用していればfalse
  std::cout << (alloc != alloc3) << std::endl;
}
```
* !=[color ff0000]
* monotonic_buffer_resource[link /reference/memory_resource/monotonic_buffer_resource.md]

### 出力
```
true
false
false
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1 (2) [mark verified], 13.1 (1) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6 (2) [mark verified], 2022 17.4 (1) [mark verified]

## 関連項目
- [`operator!=`](/reference/memory_resource/memory_resource/op_not_equal.md)


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
