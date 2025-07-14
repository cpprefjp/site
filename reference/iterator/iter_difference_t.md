# iter_difference_t
* iterator[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I>
  using iter_difference_t = see below;
}
```

## 概要

任意のイテレータ型`I`から、そのイテレータ間の差分（距離）を表す型（`difference_type`）を取得する。

## 効果

`RI = remove_cvref_t<I>`とすると、次のどちらか

- [`incrementable_traits`](incrementable_traits.md)`<RI>::difference_type`
    - [`iterator_traits`](iterator_traits.md)`<RI>`がプライマリテンプレートの特殊化となる場合
- [`iterator_traits`](iterator_traits.md)`<RI>::difference_type`
    - その他の場合

## 備考

プログラム定義型（ユーザー定義の任意のイテレータ型）でこの結果をカスタマイズするには、[`incrementable_traits`](incrementable_traits.md)を特殊化する。

## 例
```cpp example
#include <iterator>
#include <vector>

int main() {
  using vec_iterator = std::vector<int>::iterator;
  using pointer = double*;

  static_assert(std::same_as<std::iter_difference_t<vec_iterator>, std::ptrdiff_t>);
  static_assert(std::same_as<std::iter_difference_t<pointer>     , std::ptrdiff_t>);
}
```
* std::iter_difference_t[color ff0000]

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
