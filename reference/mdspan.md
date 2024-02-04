# mdspan
* mdspan[meta header]
* cpp23[meta cpp]

`<mdspan>`ヘッダでは、任意のメモリブロックに対して多次元配列のようにアクセスする機能を定義する。


## 多次元配列サイズ

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`extents`](mdspan/extents.md)  | 多次元配列のサイズを表す値 (class template) | C++23 |
| [`dextents`](mdspan/extents.md) | 全次元が動的な多次元配列のサイズを表す値 (alias template) | C++23 |


## レイアウトマッピング

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`layout_left`](mdspan/layout_left.md)     | 列優先(Fortran/Matlabスタイル)レイアウトマッピングポリシー (class) | C++23 |
| [`layout_right`](mdspan/layout_right.md)   | 行優先(C/C++スタイル)レイアウトマッピングポリシー (class) | C++23 |
| [`layout_stride`](mdspan/layout_stride.md) | ストライド幅指定レイアウトマッピングポリシー (class) | C++23 |


## 要素アクセサ

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`default_accessor`](mdspan/default_accessor.md) | デフォルト要素アクセサ (class template) | C++23 |


## 多次元配列ビュー

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`mdspan`](mdspan/mdspan.md) | 多次元配列ビュー (class template) | C++23 |


## 多次元配列部分ビュー

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`strided_slice`](mdspan/strided_slice.md) | 指定次元のストライド指定要素取り出しを指示する集成体クラステンプレート (class template) | C++26 |
| [`full_extent_t`](mdspan/full_extent_t.md) | 指定次元の全要素取り出しを指示するタグ型 (class) | C++26 |
| [`full_extent`](mdspan/full_extent_t.md) | 指定次元の全要素取り出しを指示するタグ値 (variable) | C++26 |
| [`submdspan_mapping_result`](mdspan/submdspan_mapping_result.md) | 多次元配列部分ビューのレイアウトマッピング情報 (class template) | C++26 |
| [`submdspan_extents`](mdspan/submdspan_extents.md.nolink) | 多次元配列部分ビューの多次元配列サイズを計算する (function template) | C++26 |
| [`submdspan`](mdspan/submdspan.md) | 多次元配列部分ビューを取得する (function template) | C++26 |


## バージョン
### 言語
- C++23


## 関連項目
- C++20 [`<span>`](span.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
