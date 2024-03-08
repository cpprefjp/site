# stride_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<input_range V>
    requires view<V>
  class stride_view : public view_interface<stride_view<V>> {…… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ stride = /*unspecified*/;      // (2)
  }
}
```

## 概要

`stride_view`はRangeの要素を指定個数飛ばしに見る[`view`](view.md)。

- (1): `stride_view`のクラス定義
- (2): `stride_view`を生成するカスタマイゼーションポイントオブジェクト(Rangeアダプタオブジェクトではない)

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | ※    | ※     | ※    | ※      | ※            | ※            |            | ※     | ○       | ○   |

- ※: 元となるRangeに従う

## 効果

- (2): 式`views::stride(E, N)`の効果は`stride_view(E, N)`と等しい

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](stride_view/op_constructor.md.nolink)  | コンストラクタ                   | C++23          |
| [`base`](stride_view/base.md.nolink)                     | `V`の参照を取得する              | C++23          |
| [`stride`](stride_view/stride.md.nolink)                 | 1回で移動する要素数を取得する    | C++23          |
| [`begin`](stride_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](stride_view/end.md.nolink)                       | 番兵を取得する                   | C++23          |
| [`size`](take_view/size.md.nolink)                       | 要素数を取得する                 | C++23          |

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
| [`(deduction_guide)`](stride_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector v = {0, 1, 2, 3, 4, 5, 6};

  std::println("{}", v | std::views::stride(3));

  for (auto&& i : v | std::views::stride(3)) {
    i *= 10; // 要素を書き換えても良い
  }
  std::println("{}", v);
}
```
* std::views::stride[color ff0000]

### 出力
```
[0, 3, 6]
[0, 1, 2, 30, 4, 5, 60]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0
- [GCC](/implementation.md#gcc): 13.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
