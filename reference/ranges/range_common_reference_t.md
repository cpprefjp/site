# range_common_reference_t
* ranges[meta header]
* std::ranges[meta namespace]
* type-alias[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<range R>
  using range_common_reference_t = iter_common_reference_t<iterator_t<R>>;
}
```
* iter_common_reference_t[link /reference/iterator/iter_common_reference_t.md]

## 概要

任意のRange型`R`から、そのRangeのイテレータの共通参照型（[`iter_common_reference_t`](/reference/iterator/iter_common_reference_t.md)）を取得する。


## 備考
- このエイリアステンプレートはC++23に対する欠陥報告 (LWG 3860) として追加されたものであり、コンパイラは早期に対応している場合がある。そのため、C++20モードでも使用できる可能性がある。


## 例

```cpp example
#include <ranges>
#include <vector>

int main() {
  static_assert(std::same_as<std::ranges::range_common_reference_t<std::vector<int>>, int&>);
}
```
* std::ranges::range_common_reference_t[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 14.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]

## 参照

- [LWG Issue 3860. `range_common_reference_t` is missing](https://cplusplus.github.io/LWG/issue3860)
    - C++23で、`range_reference_t`・`range_const_reference_t`・`range_rvalue_reference_t`に対応する`range_common_reference_t`が`<ranges>`に追加された。この仕様はC++23で導入されたが、欠陥報告 (DR) であるためコンパイラは早期に対応しており、C++20モードでも使用できる場合がある
