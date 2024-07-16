# strided_slice
* mdspan[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class OffsetType, class ExtentType, class StrideType>
  struct strided_slice {
    using offset_type = OffsetType;
    using extent_type = ExtentType;
    using stride_type = StrideType;

    [[no_unique_address]] offset_type offset{};
    [[no_unique_address]] extent_type extent{};
    [[no_unique_address]] stride_type stride{};
  };
}
```
* no_unique_address[link /lang/cpp20/language_support_for_empty_objects.md]

## 概要
`strided_slice`は、多次元配列の特定次元に対してストライド幅を指定した要素取り出しを指示する集成体クラステンプレートである。

初期化時にメンバ変数名を明記する[指示付き初期化](/lang/cpp20/designated_initialization.md)をサポートし、テンプレートパラメータは[テンプレート引数推論](/lang/cpp20/class_template_argument_deduction_for_aggregates.md)の利用を想定した設計となっている。

- `offset` : 元の多次元配列におけるオフセット
- `extent` : 元の多次元配列における要素数
- `stride` : 要素取り出しストライド幅

```cpp
// オフセット=1, 要素数=10, ストライド幅=3
std::strided_slice{.offset=1, .extent=10, .stride=3}
```


## 適格要件
`OffsetType`, `ExtentType`, `StrideType`は符号付き整数型または符号無し整数型、もしくは[`integral-constant-like`](/reference/span/integral-constant-like.md)のモデルであること。


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| `offset_type` | `offset`の型 | C++26 |
| `extent_type` | `extent`の型 | C++26 |
| `stride_type` | `stride`の型 | C++26 |


## 例
```cpp example
#include <mdspan>
#include <print>
#include <numeric>

int main()
{
  // 12要素の1次元配列ビュー
  int arr[12];
  std::ranges::iota(arr, 0);
  std::mdspan vec0{arr};

  // オフセット位置1から10要素の範囲よりストライド幅3で要素抽出
  auto vec1 = std::submdspan(vec0, std::strided_slice{1, 10, 3});
  // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  //    ^  .  .  ^  .  .  ^  .  .   ^
  std::println("vec1:");
  for (size_t i = 0; i < vec1.extent(0); i++) {
    std::print(" {}", vec1[i]);
  }

  // オフセット位置0から12要素の範囲よりストライド幅4で要素抽出（指示付き初期化を利用）
  auto vec2 = std::submdspan(vec0,
    std::strided_slice{.offset=0, .extent=12, .stride=4});
  // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  // ^  .  .  .  ^  .  .  .  ^  .   .   .
  std::println("\nvec2:");
  for (size_t i = 0; i < vec2.extent(0); i++) {
    std::print(" {}", vec2[i]);
  }
}
```
* std::strided_slice[color ff0000]
* std::submdspan[link submdspan.md]
* std::print[link /reference/print/print.md]
* std::println[link /reference/print/println.md]
* std::ranges::iota[link /reference/numeric/ranges_iota.md]

### 出力
```
vec1:
 1 4 7 10
vec2:
 0 4 8
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`submdspan`](submdspan.md)
- [C++20 指示付き初期化](/lang/cpp20/designated_initialization.md)
- [C++20 集成体クラステンプレートのテンプレート引数推論](/lang/cpp20/class_template_argument_deduction_for_aggregates.md)


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
