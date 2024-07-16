# flat_map
* flat_map[meta header]
* cpp23[meta cpp]

`<flat_map>` ヘッダは、ソート済みキーによる順序付き連想配列を定義する。

[`std::map`](/reference/map/map.md)と違ってノードベースの実装ではなく、メモリ連続性のある平坦 (flat) な配列で扱われる。

`<flat_map>` ヘッダでは、キーの重複を許さない `std::`[`flat_map`](flat_map/flat_map.md) クラステンプレート、およびキーの重複を許す `std::`[`flat_multimap`](flat_map/flat_multimap.md.nolink) クラステンプレートを提供する。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md)
- [`<compare>`](compare.md)


| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|--------------------------------------------------------|-------|
| [`flat_map`](flat_map/flat_map.md)           | キーの重複を許さない平坦な順序付き連想コンテナ(class template) | C++23 |
| [`flat_multimap`](flat_map/flat_multimap.md.nolink) | キーの重複を許す平坦な順序付き連想コンテナ(class template) | C++23 |
| [`sorted_unique_t`](flat_map/sorted_unique_t.md) | ソート済みかつ重複要素がないことを示すためのタグ型(class) | C++23 |
| [`sorted_unique`](flat_map/sorted_unique_t.md) | ソート済みかつ重複要素がないことを示すためのタグ値(variable) | C++23 |


## バージョン
### 言語
- C++23


## 参照
- [P0429R3 A Standard `flat_map`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0429r3.pdf)
    - C++23で`flat_map`が導入された経緯・動機・設計について記載されている
- [P0429R9 A Standard `flat_map`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0429r9.pdf)
    - C++23で導入された`flat_map`の仕様
