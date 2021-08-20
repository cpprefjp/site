# ranges
* ranges[meta header]
* cpp20[meta cpp]

`<ranges>` では、イテレータの組ではなく、コンテナや配列、部分的なコンテナなどを扱う範囲ライブラリを提供する。

C++17までは、標準アルゴリズム関数はイテレータの組を扱い、範囲を直接扱ってはいなかった。
範囲ライブラリはBoost.Rangeやrange-v3などで実績があり、C++標準にも取り込まれることになった。


(執筆中…… とりあえずは、[N4861 24.2](https://timsong-cpp.github.io/cppwp/n4861/ranges.syn)などを参照のこと)

<!--
## range access
## ranges

| 名前                                  | 説明           | 対応バージョン |
|---------------------------------------|----------------|----------------|
| range (concept)                       |                | C++20          |
| borrowed_range (concept)              |                | C++20          |
| iterator_t (type-alias)               |                | C++20          |
| sentinel_t (type-alias)               |                | C++20          |
| range_difference_t (type-alias)       |                | C++20          |
| range_size_t (type-alias)             |                | C++20          |
| range_value_t (type-alias)            |                | C++20          |
| range_reference_t (type-alias)        |                | C++20          |
| range_rvalue_reference_t (type-alias) |                | C++20          |

## sized ranges

| 名前                  | 説明           | 対応バージョン |
|-----------------------|----------------|----------------|
| sized_range (concept) |                | C++20          |

## views

| 名前                | 説明           | 対応バージョン |
|---------------------|----------------|----------------|
| empty_view          |                | C++20          |
| iota_view           |                | C++20          |
| basic_istream_view  |                | C++20          |
| ref_view            |                | C++20          |
| filter_view         |                | C++20          |
| transform_view      |                | C++20          |
| take_view           |                | C++20          |
| take_while_view     |                | C++20          |
| drop_view           |                | C++20          |
| drop_while_view     |                | C++20          |
| join_view           |                | C++20          |
| split_view          |                | C++20          |
| common_view         |                | C++20          |
| reverse_view        |                | C++20          |
| elements_view       |                | C++20          |

## other range refinements
## class template view_interface
## sub-ranges
## dangling iterator handling


| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|                 |                | C++20          |
-->

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 19.29

## 関連項目
- [`<iterator>`](iterator.md)
- [`<concepts>`](concepts.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344?utm_source=twitter&utm_medium=social&utm_campaign=bought)
