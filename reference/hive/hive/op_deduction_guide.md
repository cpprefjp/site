# 推論補助
* hive[meta header]
* std[meta namespace]
* hive[meta class]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class InputIterator,
            class Allocator = allocator<typename iterator_traits<InputIterator>::value_type>>
  hive(InputIterator, InputIterator, Allocator = Allocator())
    -> hive<typename iterator_traits<InputIterator>::value_type, Allocator>; // (1)

  template <class InputIterator,
            class Allocator = allocator<typename iterator_traits<InputIterator>::value_type>>
  hive(InputIterator, InputIterator, hive_limits, Allocator = Allocator())
    -> hive<typename iterator_traits<InputIterator>::value_type, Allocator>; // (2)

  template <ranges::input_range R,
            class Allocator = allocator<ranges::range_value_t<R>>>
  hive(from_range_t, R&&, Allocator = Allocator())
    -> hive<ranges::range_value_t<R>, Allocator>;                            // (3)

  template <ranges::input_range R,
            class Allocator = allocator<ranges::range_value_t<R>>>
  hive(from_range_t, R&&, hive_limits, Allocator = Allocator())
    -> hive<ranges::range_value_t<R>, Allocator>;                            // (4)
}
```
* ranges::input_range[link /reference/ranges/input_range.md]
* allocator[link /reference/memory/allocator.md]
* ranges::range_value_t[link /reference/ranges/range_value_t.md]
* from_range_t[link /reference/ranges/from_range_t.md]
* hive_limits[link ../hive_limits.md]

## 概要
`std::hive`クラステンプレートの型推論補助。

- (1) : イテレータ範囲から推論する。
- (2) : イテレータ範囲と要素ブロックの容量制限から推論する。
- (3) : Rangeから推論する。
- (4) : Rangeと要素ブロックの容量制限から推論する。


## 例
```cpp example
#include <hive>
#include <vector>
#include <type_traits>

int main()
{
  std::vector<int> v = {1, 2, 3};

  // イテレータ範囲からの推論
  std::hive h1(v.begin(), v.end());
  static_assert(std::is_same_v<decltype(h1), std::hive<int>>);

  // Rangeからの推論
  std::hive h2(std::from_range, v);
  static_assert(std::is_same_v<decltype(h2), std::hive<int>>);
}
```
* std::from_range[link /reference/ranges/from_range_t.md]
* v.begin()[link /reference/vector/vector/begin.md]
* v.end()[link /reference/vector/vector/end.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0447R28 Introduction of `std::hive` to the standard library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0447r28.html)
    - C++26で`hive`が追加された
