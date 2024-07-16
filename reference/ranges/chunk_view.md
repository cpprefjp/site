# chunk_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<view V>
    requires input_range<V>
  class chunk_view : public view_interface<chunk_view<V>> {…… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ chunk = /*unspecified*/;      // (2)
  }
}
```

## 概要

`chunk_view`はRangeを指定個数ごとに分割した[`view`](view.md)のRange。

元となるRangeの要素数が指定個数で割り切れない場合、最後の[`view`](view.md)は余った要素のみを持ち、その要素数は指定個数よりも少なくなる。

- (1): `chunk_view`のクラス定義
- (2): `chunk_view`を生成するカスタマイゼーションポイントオブジェクト

### Rangeコンセプト

外側Range

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | ※    | 〇     | 〇    | ※      | ※            | ※            |            | ※     | ○       | ○   |

- ※: 元となるRangeに従う

内側Range

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | ※    | 〇     | 〇    | ※      | ※            | ※            | ※         | ※     | ○       | ○   |

- ※: 元となるRangeに従う

## 効果

- (2): 式`views::chunk(E, N)`の効果は`chunk_view(E, N)`と等しい。

## 事前条件

- (2): n > 0

## メンバ関数

| 名前                                                | 説明                             | 対応バージョン |
|-----------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](chunk_view/op_constructor.md.nolink)  | コンストラクタ                   | C++23          |
| [`base`](chunk_view/base.md.nolink)                     | `V`の参照を取得する              | C++23          |
| [`begin`](chunk_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](chunk_view/end.md.nolink)                       | 番兵を取得する                   | C++23          |
| [`size`](chunk_view/size.md.nolink)                     | 要素数を取得する                 | C++23          |

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
| [`(deduction_guide)`](chunk_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector v = {1, 2, 3, 4, 5, 6};
  std::println("{}", v | std::views::chunk(1));
  std::println("{}", v | std::views::chunk(3));
  std::println("{}", v | std::views::chunk(5));
  std::println("{}", v | std::views::chunk(7));
}
```
* std::views::chunk[color ff0000]

### 出力
```
[[1], [2], [3], [4], [5], [6]]
[[1, 2, 3], [4, 5, 6]]
[[1, 2, 3, 4, 5], [6]]
[[1, 2, 3, 4, 5, 6]]
```

## 例 縦横に並んだ数値を読む
```cpp example
#include <ranges>
#include <vector>
#include <string>
#include <sstream>
#include <print>

int main() {
  // cin代わりの文字列ストリーム
  std::istringstream iss(R"(
2 10
31 41 59 26 53 58 97 93 23 84
62 64 33 83 27 95 2 88 41 97
)");

  int h, w;
  iss >> h >> w;

  const auto table = std::views::istream<int>(iss)
    | std::views::chunk(w)
    | std::views::take(h) 
    | std::ranges::to<std::vector<std::vector<int>>();

  std::println("{}", table);
}
```
* std::views::chunk[color ff0000]
* std::views::take[link take_view.md]
* std::ranges::to[link to.md]

### 出力
```
[[31, 41, 59, 26, 53, 58, 97, 93, 23, 84], [62, 64, 33, 83, 27, 95, 2, 88, 41, 97]]
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
