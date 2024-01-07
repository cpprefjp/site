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
| [`layout_left`](mdspan/layout_left.md.nolink)     | 最左次元が隣接するレイアウトマッピング (class) | C++23 |
| [`layout_right`](mdspan/layout_right.md.nolink)   | 最右次元が隣接するレイアウトマッピング (class) | C++23 |
| [`layout_stride`](mdspan/layout_stride.md.nolink) | 汎用ストライド配置レイアウトマッピング (class) | C++23 |


## 要素アクセサ

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`default_accessor`](mdspan/default_accessor.md) | デフォルト要素アクセサ (class template) | C++23 |


## 多次元配列ビュー

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`mdspan`](mdspan/mdspan.md) | 多次元配列ビュー (class template) | C++23 |


## バージョン
### 言語
- C++23


## 関連項目
- C++20 [`<span>`](span.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
