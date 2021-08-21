# ranges
* ranges[meta header]
* cpp20[meta cpp]

`<ranges>` では、イテレータの組ではなく、コンテナや配列、部分的なコンテナなどを扱う範囲ライブラリを提供する。

C++17までは、標準アルゴリズム関数はイテレータの組を扱い、範囲を直接扱ってはいなかった。
範囲ライブラリはBoost.Rangeやrange-v3などで実績があり、C++標準にも取り込まれることになった。

## range access

| 名前      | 説明           | 対応バージョン |
|----------|----------------|----------------|
| begin    | 範囲の先頭を指すイテレータを取得する (customization point object) | C++20          |
| end      | 範囲の末尾の次を指すイテレータを取得する (customization point object) | C++20          |
| cbegin   | 範囲の先頭を指す読み取り専用イテレータを取得する (customization point object) | C++20          |
| cend     | 範囲の末尾の次を指す読み取り専用イテレータを取得する (customization point object) | C++20          |
| rbegin   | 範囲の末尾を指す逆イテレータを取得する (customization point object) | C++20          |
| rend     | 範囲の先頭の前を指す逆イテレータを取得する (customization point object) | C++20          |
| crbegin  | 範囲の末尾を指す読み取り専用逆イテレータを取得する (customization point object) | C++20          |
| crend    | 範囲の先頭の前を指す読み取り専用逆イテレータを取得する (customization point object) | C++20          |
| size     | 範囲の要素数を取得する (customization point object) | C++20          |
| ssize    | 範囲の要素数を、符号付き整数型で取得する (customization point object) | C++20          |
| empty    | 範囲が空かどうかを判定する (customization point object) | C++20          |
| data     | 範囲の要素配列へのポインタを取得する (customization point object) | C++20          |
| cdata    | 範囲の要素配列への読み取り専用ポインタを取得する (customization point object) | C++20          |

## ranges

| 名前                                  | 説明           | 対応バージョン |
|---------------------------------------|----------------|----------------|
| range                    | (concept)                   | C++20          |
| enable_borrowed_range    | (variable template)         | C++20          |
| borrowed_range           | (concept)                   | C++20          |
| iterator_t               | (type-alias)                | C++20          |
| sentinel_t               | (type-alias)                | C++20          |
| range_difference_t       | (type-alias)                | C++20          |
| range_size_t             | (type-alias)                | C++20          |
| range_value_t            | (type-alias)                | C++20          |
| range_reference_t        | (type-alias)                | C++20          |
| range_rvalue_reference_t | (type-alias)                | C++20          |

## sized ranges

| 名前        | 説明           | 対応バージョン |
|-------------|----------------|----------------|
| sized_range | (concept)               | C++20          |

## views

| 名前        | 説明                | 対応バージョン |
|-------------|---------------------|----------------|
| enable_view | (variable template) | C++20          |
| view_base   | (class)             | C++20          |
| view        | (concept)           | C++20          |

## other range refinements

| 名前                | 説明           | 対応バージョン |
|---------------------|----------------|----------------|
| output_range        | (concept)      | C++20          |
| input_range         | (concept)      | C++20          |
| forward_range       | (concept)      | C++20          |
| bidirectional_range | (concept)      | C++20          |
| random_access_range | (concept)      | C++20          |
| contiguous_range    | (concept)      | C++20          |
| common_range        | (concept)      | C++20          |
| viewable_range      | (concept)      | C++20          |

## class template view_interface

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| view_interface  | (class template) | C++20          |

## sub-ranges

| 名前                  | 説明                 | 対応バージョン |
|-----------------------|----------------------|----------------|
| subrange_kind         | (enum class)         | C++20          |
| subrange              | (class template)     | C++20          |


## dangling iterator handling

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| dangling            | (class)      | C++20          |
| borrowed_iterator_t | (type-alias) | C++20          |
| borrowed_subrange_t | (type-alias) | C++20          |

## empty view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| empty_view      | (class template)     | C++20          |
| empty           | (variable template)  | C++20          |

## single view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| single_view      | (class template)     | C++20          |
| single           | (variable template)  | C++20          |

## iota view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| iota_view      | (class template)     | C++20          |
| iota           | (variable template)  | C++20          |

## istream view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| basic_istream_view | (class template)     | C++20          |
| istream_view       | (function template)     | C++20          |

## all view

| 名前     | 説明           | 対応バージョン |
|----------|----------------|----------------|
| all      | (variable template)  | C++20          |
| all_t    | (type-alias)  | C++20          |
| ref_view | (class template)     | C++20          |

## filter view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| filter_view      | (class template)     | C++20          |
| filter           | (variable template)  | C++20          |

## transform view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| transform_view      | (class template)     | C++20          |
| transform           | (variable template)  | C++20          |

## take view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| take_view      | (class template)     | C++20          |
| take           | (variable template)  | C++20          |

## take while view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| take_while_view      | (class template)     | C++20          |
| take_while           | (variable template)  | C++20          |

## drop view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| drop_view      | (class template)     | C++20          |
| drop           | (variable template)  | C++20          |

## drop while view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| drop_while_view      | (class template)     | C++20          |
| drop_while           | (variable template)  | C++20          |

## join view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| join_view      | (class template)     | C++20          |
| join           | (variable template)  | C++20          |

## split view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| split_view      | (class template)     | C++20          |
| split           | (variable template)  | C++20          |

## counted view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| counted           | (variable template)  | C++20          |

## common view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| common_view      | (class template)     | C++20          |
| common           | (variable template)  | C++20          |

## reverse view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| reverse_view      | (class template)     | C++20          |
| reverse           | (variable template)  | C++20          |

## elements view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| elements_view      | (class template)     | C++20          |
| keys_view      | (class template)     | C++20          |
| values_view      | (class template)     | C++20          |
| elements           | (variable template)  | C++20          |
| keys           | (variable template)  | C++20          |
| values           | (variable template)  | C++20          |

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
