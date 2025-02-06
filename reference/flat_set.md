# flat_set
* flat_set[meta header]
* cpp23[meta cpp]

`<flat_set>` ヘッダは、ソート済みキーによる連想コンテナを定義する。

[`std::set`](/reference/set/set.md)と違ってノードベースの実装ではなく、メモリ連続性のある平坦 (flat) な配列で扱われる。

`<flat_set>` ヘッダでは、キーの重複を許さない `std::`[`flat_set`](flat_set/flat_set.md) クラステンプレート、およびキーの重複を許す `std::`[`flat_multiset`](flat_set/flat_multiset.md) クラステンプレートを提供する。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md)
- [`<compare>`](compare.md)


| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|----------------------------------------------------------------------|-------|
| [`flat_set`](flat_set/flat_set.md)                       | キーの重複を許さない平坦な順序付き連想コンテナ(class template)       | C++23 |
| [`flat_multiset`](flat_set/flat_multiset.md)             | キーの重複を許す平坦な順序付き連想コンテナ(class template)           | C++23 |
| [`sorted_unique_t`](flat_set/sorted_unique_t.md)         | ソート済みかつ重複要素がないことを示すためのタグ型(class)            | C++23 |
| [`sorted_unique`](flat_set/sorted_unique_t.md)           | ソート済みかつ重複要素がないことを示すためのタグ値(variable)         | C++23 |
| [`sorted_equivalent_t`](flat_set/sorted_equivalent_t.md) | ソート済みであること（重複はしてもよい）を示すためのタグ型(class)    | C++23 |
| [`sorted_equivalent`](flat_set/sorted_equivalent_t.md)   | ソート済みであること（重複はしてもよい）を示すためのタグ値(variable) | C++23 |


## バージョン
### 言語
- C++23


## 参照
- [P1222R0 A Standard `flat_set`](hhttps://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1222r0.pdf)
    - C++23で`flat_set`が導入された経緯・動機・設計について記載されている
- [P1222R4 A Standard `flat_set`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1222r4.pdf)
    - C++23で導入された`flat_set`の仕様
