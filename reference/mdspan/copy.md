# copy
* mdspan[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  template <class Src, class Dst>
  constexpr void copy(const Src& src, const Dst& dst); // (1) C++29

  template <class ExecutionPolicy, class Src, class Dst>
  void copy(ExecutionPolicy&& policy,
            const Src& src, const Dst& dst);           // (2) C++29
}
```

## 概要
多次元配列ビュー[`std::mdspan`](mdspan.md)の全要素を、対応する要素どうしで別の`mdspan`へコピーする。

- (1) : 各要素を順次コピーする
- (2) : 指定した実行ポリシーによって並列にコピーする

コピー元とコピー先は、要素型やレイアウト・アクセサが異なっていてもよい。


## テンプレートパラメータ制約
- `Src`および`Dst`が`mdspan`の特殊化であること
- [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<typename Dst::reference, typename Src::reference>`が`true`であること
- [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<typename Src::extents_type, typename Dst::extents_type>`が`true`であること
    - この制約は実質的に、両者の次元数（ランク）が等しく、対応する各次元が「同じ値の静的サイズ」または[`dynamic_extent`](/reference/span/dynamic_extent.md)であることを検証する


## 事前条件
- `dst.`[`is_unique()`](LayoutMapping.md)が`true`であること（レイアウトマッピングが各要素へ一意に対応すること）
- `src.`[`extents()`](mdspan/extents.md)内の各多次元インデックス`i`について、`src[i]`と`dst[j]`が同じ要素を参照するような`dst.extents()`内の多次元インデックス`j`が存在しないこと（コピー元とコピー先の要素が重ならないこと）


## 堅牢化された事前条件
- `src.`[`extents()`](mdspan/extents.md)が`dst.extents()`と等値であること


## 効果
`src`の各要素を、`dst`の対応する要素へ代入する。


## 備考
- 対象の範囲が[`std::mdspan`](mdspan.md)の次元情報として閉じているため、イテレータ範囲のアルゴリズムと違い、終端を越えた書き込みを実装が検査できる（サイズの不一致は堅牢化された事前条件の違反となる）
- サイズの異なる`mdspan`どうしの部分的なコピーはサポートされない。コピーしたい領域を[`std::submdspan()`](submdspan.md)で部分ビューとして明示的に取り出してからコピーすること
- 両者が同じ連続レイアウトかつデフォルトアクセサである場合など、レイアウト情報を利用した効率的な実装（`memcpy`相当への最適化など）が期待できる


## 例
```cpp
#include <mdspan>
#include <iostream>

int main()
{
  double a[] = {1, 2, 3, 4, 5, 6};
  double b[6] = {};

  // 行優先のビューから列優先のビューへ、対応する要素どうしでコピーする
  std::mdspan<double, std::extents<std::size_t, 2, 3>> src{a};
  std::mdspan<double, std::extents<std::size_t, 2, 3>, std::layout_left> dst{b};
  std::copy(src, dst);

  // メモリ上は列優先の並びになる
  for (double x : b) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::copy[color ff0000]
* std::layout_left[link layout_left.md]

### 出力
```
1 4 2 5 3 6 
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`fill`](fill.md)
- [`std::mdspan`](mdspan.md)
- [`std::submdspan()`](submdspan.md)
- [`std::copy()`](/reference/algorithm/copy.md) (イテレータ範囲に対するコピー)


## 参照
- [P3242R4 Copy and fill for `mdspan`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3242r4.html)
