# repeat_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<move_constructible T, semiregular Bound = unreachable_sentinel_t>
    requires (is_object_v<T> && same_as<T, remove_cv_t<T>> &&
              (is-integer-like<Bound> || same_as<Bound, unreachable_sentinel_t>))
  class repeat_view : public view_interface<repeat_view<T, Bound>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ repeat = /*unspecified*/; // (2)
  }
}
```
* move_constructible[link /reference/concepts/move_constructible.md]
* semiregular[link /reference/concepts/semiregular.md]
* unreachable_sentinel_t[link /reference/iterator/unreachable_sentinel_t.md]
* is_object_v[link /reference/type_traits/is_object.md]
* same_as[link /reference/concepts/same_as.md]
* remove_cv_t[link /reference/type_traits/remove_cv.md]
* is-integer-like[link /reference/iterator/is_integer_like.md]
* view_interface[link view_interface.md]

## 概要
- (1): 指定した値を指定回数繰り返す[`view`](view.md)
- (2): `repeat_view`を生成するカスタマイゼーションポイントオブジェクト

回数を省略した場合、無限長となる。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | (1)   |        | ○    | ○      | ○            | ○            |            | (1)    | ○       | ○   |

- (1) `Bound = unreachable_sentinel_t` ではない場合

## 効果
- 式`views::repeat(E)`の効果は`repeat_view(E)`と等しい。
- 式`views::repeat(E, F)`の効果は`repeat_view(E, F)`と等しい。

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](repeat_view/op_constructor.md.nolink)  | コンストラクタ                   | C++23          |
| [`begin`](repeat_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](repeat_view/end.md.nolink)                       | 番兵を取得する                   | C++23          |
| [`size`](repeat_view/data.md.nolink)                     | 配列の先頭へのポインタを取得する | C++23          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|------------------------------ ----|----------------|
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++23          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++23          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++23          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++23          |

## メンバ型

| 名前                                      | 説明                         | 対応バージョン |
|-------------------------------------------|------------------------------|----------------|
| [`iterator`](repeat_view/iterator.md)     | イテレータ型(説明専用)       | C++23          |


## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](repeat_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  using namespace std;

  for(int n : views::repeat(42, 3)) {
    cout << n << ' ';
  }
}
```
* views::repeat[color ff0000]

### 出力
```
42 42 42
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
