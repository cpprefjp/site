# iter_value_t
* iterator[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I>
  using iter_value_t = /*see below*/;
}
```
* see below[italic]

## 概要

任意のイテレータ型`I`から、そのイテレータの要素型（`value_type`）を取得する。

## 効果

`RI = remove_cvref_t<I>`とすると、次のどちらか

- [`iterator_traits`](iterator_traits.md)`<RI>`がプライマリテンプレートの特殊化となる場合
    - [`indirectly_readable_traits`](indirectly_readable_traits.md)`<RI>::value_type`
- その他の場合
    - [`iterator_traits`](iterator_traits.md)`<RI>::value_type`

## 備考

プログラム定義型（ユーザー定義の任意のイテレータ型）でこの結果をカスタマイズするには、[`indirectly_readable_traits`](indirectly_readable_traits.md)を特殊化する。

## 例
```cpp example
#include <iterator>
#include <vector>

int main() {
  using vec_iterator = std::vector<int>::iterator;
  using pointer = double*;

  static_assert(std::same_as<std::iter_value_t<vec_iterator>, int>);
  static_assert(std::same_as<std::iter_value_t<pointer>     , double>);
}
```
* std::iter_value_t[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 関連項目

- [`iterator_traits`](iterator_traits.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
