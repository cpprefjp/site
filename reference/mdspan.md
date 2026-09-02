# mdspan
* mdspan[meta header]
* cpp23[meta cpp]

`<mdspan>`ヘッダでは、任意のメモリブロックに対して多次元配列のようにアクセスする機能を定義する。


## フリースタンディング
このヘッダのほとんどの機能は、フリースタンディング処理系でも使用できる。ただし、例外を送出する一部の機能などは、フリースタンディング処理系では提供されない、または削除される。詳細は各機能のページを参照。

## 多次元配列サイズ

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`extents`](mdspan/extents.md)  | 多次元配列のサイズを表す値 (class template) | C++23 |
| [`dextents`](mdspan/extents.md) | 全次元が動的な多次元配列のサイズを表す値 (alias template) | C++23 |
| [`dims`](mdspan/extents.md) | 全次元が動的な多次元配列のサイズを表す値 (alias template) | C++26 |
| [`dynamic_extent`](span/dynamic_extent.md) | 動的な要素数をもつことを指示する定数 (variable) | C++26 |


## レイアウトマッピング

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`layout_left`](mdspan/layout_left.md)     | 列優先(Fortran/Matlabスタイル)レイアウトマッピングポリシー (class) | C++23 |
| [`layout_right`](mdspan/layout_right.md)   | 行優先(C/C++スタイル)レイアウトマッピングポリシー (class) | C++23 |
| [`layout_stride`](mdspan/layout_stride.md) | ストライド幅指定レイアウトマッピングポリシー (class) | C++23 |
| [`layout_left_padded`](mdspan/layout_left_padded.md) | パディングあり列優先レイアウトマッピングポリシー (class template) | C++26 |
| [`layout_right_padded`](mdspan/layout_right_padded.md) | パディングあり行優先レイアウトマッピングポリシー (class template) | C++26 |


## 要素アクセサ

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`default_accessor`](mdspan/default_accessor.md) | デフォルト要素アクセサ (class template) | C++23 |
| [`aligned_accessor`](mdspan/aligned_accessor.md) | アライメント保証付き要素アクセサ (class template) | C++26 |


## 多次元配列ビュー

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`mdspan`](mdspan/mdspan.md) | 多次元配列ビュー (class template) | C++23 |


## 多次元配列部分ビュー

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`extent_slice`](mdspan/extent_slice.md) | 指定次元から、取り出す要素数とストライド幅を指定した要素取り出しを指示する集成体クラステンプレート (class template) | C++26 |
| [`range_slice`](mdspan/range_slice.md) | 指定次元から、取り出し元の半開区間とストライド幅を指定した要素取り出しを指示する集成体クラステンプレート (class template) | C++26 |
| [`full_extent_t`](mdspan/full_extent_t.md) | 指定次元の全要素取り出しを指示するタグ型 (class) | C++26 |
| [`full_extent`](mdspan/full_extent_t.md) | 指定次元の全要素取り出しを指示するタグ値 (variable) | C++26 |
| [`submdspan_mapping_result`](mdspan/submdspan_mapping_result.md) | 多次元配列部分ビューのレイアウトマッピング情報 (class template) | C++26 |
| [`subextents`](mdspan/subextents.md) | 多次元配列部分ビューの多次元配列サイズを計算する (function template) | C++26 |
| [`canonical_slices`](mdspan/canonical_slices.md) | 多次元配列部分ビュー取得時の多次元インデックスを正規化する (function template) | C++26 |
| [`submdspan`](mdspan/submdspan.md) | 多次元配列部分ビューを取得する (function template) | C++26 |


## バージョン
### 言語
- C++23


## 関連項目
- C++20 [`<span>`](span.md)
- C++26 [`<linalg>`](linalg.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
- [P2642R6 Padded mdspan layouts](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2642r6.pdf)
- [P2897R7 `aligned_accessor`: An mdspan accessor expressing pointer over-alignment](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2897r7.html)
- [P3663R3 Future-proof `submdspan_mapping`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3663r3.html)
- [LWG Issue 4275. `std::dynamic_extent` should also be defined in `<mdspan>`](https://cplusplus.github.io/LWG/issue4275)
    - C++26で、`<span>`で定義される[`dynamic_extent`](span/dynamic_extent.md)が`<mdspan>`のインクルードによっても利用可能になった
- [P2833R2 Freestanding Library: inout expected `span`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2833r2.html)
    - C++26で、このヘッダが（例外を送出するメンバなど一部を除いて）フリースタンディング処理系に対応した
