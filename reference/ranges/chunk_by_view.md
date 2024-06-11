# chunk_by_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<forward_range V, indirect_binary_predicate<iterator_t<V>, iterator_t<V>> Pred>
    requires view<V> && is_object_v<Pred>
  class chunk_by_view : public view_interface<chunk_by_view<V, Pred>> {…… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ chunk_by = /*unspecified*/;      // (2)
  }
}
```

## 概要

`chunk_by_view`はRangeを指定した二項述語が偽となる場所で分割した[`view`](view.md)のRange。

- (1): `chunk_by_view`のクラス定義
- (2): `chunk_by_view`を生成するカスタマイゼーションポイントオブジェクト

### Rangeコンセプト

外側Range

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          |       | 〇     | 〇    | ※      | ※            |               |            |        | ○       | ○   |

- ※: 元となるRangeに従う

内側Range

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | ※    | 〇     | 〇    | ※      | ※            | ※            | ※         | ※     | ○       | ○   |

- ※: 元となるRangeに従う

## 効果

- (2): 式`views::chunk_by(E, F)`の効果は`chunk_by_view(E, F)`と等しい。

## メンバ関数

| 名前                                                | 説明                             | 対応バージョン |
|-----------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](chunk_by_view/op_constructor.md.nolink)  | コンストラクタ                   | C++23          |
| [`base`](chunk_by_view/base.md.nolink)                     | `V`の参照を取得する              | C++23          |
| [`pred`](chunk_by_view/pred.md.nolink)                     | 述語を取得する                   | C++23          |
| [`begin`](chunk_by_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](chunk_by_view/end.md.nolink)                       | 番兵を取得する                   | C++23          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++20          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する          | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する  | C++23          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++20          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](chunk_by_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <functional>
#include <print>

int main() {
  std::vector v = {1, 2, 2, 3, 0, 4, 5, 2};
  // 列が転倒する場所で分割
  std::println("{}", v | std::views::chunk_by(std::ranges::less_equal{}));
}
```
* std::views::chunk_by[color ff0000]
* std::ranges::less_equal[link /reference/functional/ranges_less_equal.md]
* 転倒[link https://ja.wikipedia.org/wiki/%E8%BB%A2%E5%80%92_(%E6%95%B0%E5%AD%A6)]

### 出力
```
[[1, 2, 2, 3], [0, 4, 5], [2]]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 14.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
