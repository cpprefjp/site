# range_slice
* mdspan[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class FirstType, class LastType, class StrideType = constant_wrapper<1zu>>
  struct range_slice {
    [[no_unique_address]] FirstType first{};
    [[no_unique_address]] LastType last{};
    [[no_unique_address]] StrideType stride{};
  };
}
```
* no_unique_address[link /lang/cpp20/language_support_for_empty_objects.md]
* constant_wrapper[link /reference/utility/constant_wrapper.md]

## 概要
`range_slice`は、多次元配列の特定次元に対して、取り出し元の半開区間とストライド幅を指定した要素取り出しを指示する集成体クラステンプレートである。

初期化時にメンバ変数名を明記する[指示付き初期化](/lang/cpp20/designated_initialization.md)をサポートし、テンプレートパラメータは[テンプレート引数推論](/lang/cpp20/class_template_argument_deduction_for_aggregates.md)の利用を想定した設計となっている。

- `first` : 取り出し元の半開区間の下限
- `last` : 取り出し元の半開区間の上限
- `stride` : 要素取り出しストライド幅（省略時は`1`）

半開区間`[first, last)`から、`first`を起点に`stride`間隔で要素を取り出す。

```cpp
// 区間[1, 11)から、ストライド幅3で取り出す
// → インデックス 1, 4, 7, 10 の要素を取り出す
std::range_slice{.first=1, .last=11, .stride=3}
```

これはPythonの`array[first:last:step]`と同じ指定方法である。取り出し元の区間ではなく取り出す要素数で指定したい場合は、[`extent_slice`](extent_slice.md)を使用する。


## 適格要件
`FirstType`, `LastType`, `StrideType`は符号付き整数型または符号無し整数型、もしくは[`integral-constant-like`](/reference/span/integral-constant-like.md)のモデルであること。


## 備考
- `range_slice`は正則`submdspan`スライス型ではない。[`canonical_slices()`](canonical_slices.md)関数によって、等価な[`extent_slice`](extent_slice.md)（要素数は`stride`による除算で求められる）へ変換されたうえでレイアウトマッピングへ渡される
- そのため、`stride`が実行時の値である場合は、取り出した多次元配列ビューの要素数も実行時の値となる


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

  // 区間[1, 11)から、ストライド幅3で取り出す
  auto vec1 = std::submdspan(vec0, std::range_slice{.first=1, .last=11, .stride=3});
  // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  //    ^  .  .  ^  .  .  ^  .  .   ^
  std::println("vec1:");
  for (size_t i = 0; i < vec1.extent(0); i++) {
    std::print(" {}", vec1[i]);
  }

  // ストライド幅を省略すると、区間内の全要素を取り出す
  auto vec2 = std::submdspan(vec0, std::range_slice{2, 6});
  // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  //       ^  ^  ^  ^
  std::println("\nvec2:");
  for (size_t i = 0; i < vec2.extent(0); i++) {
    std::print(" {}", vec2[i]);
  }
}
```
* std::range_slice[color ff0000]
* std::submdspan[link submdspan.md]
* std::print[link /reference/print/print.md]
* std::ranges::iota[link /reference/numeric/ranges_iota.md]

### 出力
```
vec1:
 1 4 7 10
vec2:
 2 3 4 5
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 17 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`submdspan`](submdspan.md)
- [`extent_slice`](extent_slice.md)
- [C++20 指示付き初期化](/lang/cpp20/designated_initialization.md)
- [C++20 集成体クラステンプレートのテンプレート引数推論](/lang/cpp20/class_template_argument_deduction_for_aggregates.md)


## 参照
- [P3982R2 Split `strided_slice` into `extent_slice` and `range_slice` for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3982r2.html)
    - C++26で、取り出し元の半開区間で指定するスライス指定子としてこのクラスが追加された。ほかのプログラミング言語のスライス指定と同じ記述ができるようにするためである
