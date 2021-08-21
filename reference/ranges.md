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
| range                    | 範囲を定義するコンセプト (concept)                   | C++20          |
| enable_borrowed_range    | (variable template)         | C++20          |
| borrowed_range           | 所有権を持たない範囲 (concept)                   | C++20          |
| iterator_t               | 範囲のイテレータ型を取得する (alias template)                | C++20          |
| sentinel_t               | 範囲の番兵型を取得する (alias template)                | C++20          |
| range_difference_t       | 範囲のイテレータの差の型を取得する (alias template)                | C++20          |
| range_size_t             | 範囲のサイズの型を取得する(alias template)                | C++20          |
| range_value_t            | 範囲の要素の型を取得する (alias template)                | C++20          |
| range_reference_t        | 範囲の要素の参照型を取得する (alias template)                | C++20          |
| range_rvalue_reference_t | 範囲の要素の右辺値参照型を取得する (alias template)                | C++20          |

## sized ranges

| 名前        | 説明           | 対応バージョン |
|-------------|----------------|----------------|
| sized_range | サイズを一定時間で求められる範囲 (concept)               | C++20          |



## other range refinements

| 名前                | 説明           | 対応バージョン |
|---------------------|----------------|----------------|
| output_range        | イテレータが出力イテレータである範囲 (concept)      | C++20          |
| input_range         | イテレータが入力イテレータである範囲 (concept)      | C++20          |
| forward_range       | イテレータが前進イテレータである範囲 (concept)      | C++20          |
| bidirectional_range | イテレータが双方向イテレータである範囲 (concept)      | C++20          |
| random_access_range | イテレータがランダムアクセスイテレータである範囲 (concept)      | C++20          |
| contiguous_range    | イテレータが隣接イテレータである範囲 (concept)      | C++20          |
| common_range        | イテレータと番兵の型が等しい範囲 (concept)      | C++20          |
| viewable_range      | ビューに変換できる範囲 (concept)      | C++20          |

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
| borrowed_iterator_t | (alias template) | C++20          |
| borrowed_subrange_t | (alias template) | C++20          |

## ビュー

| 名前        | 説明                | 対応バージョン |
|-------------|---------------------|----------------|
| enable_view | (variable template) | C++20          |
| view_base   | (class)             | C++20          |
| view        | ビューである範囲 (concept)           | C++20          |

### Rangeファクトリ

#### empty view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| empty_view      | 空の範囲 (class template)     | C++20          |
| empty           | 空の範囲を生成する (variable template)  | C++20          |

#### single view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| single_view      | 指定した値1つからなる範囲 (class template)     | C++20          |
| single           | 指定した値1つからなる範囲を生成する (variable template)  | C++20          |

#### iota view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| iota_view      | (class template)     | C++20          |
| iota           | (variable template)  | C++20          |

#### istream view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| basic_istream_view | (class template)     | C++20          |
| istream_view       | (function template)     | C++20          |

#### all view

| 名前     | 説明           | 対応バージョン |
|----------|----------------|----------------|
| all      | (variable template)  | C++20          |
| all_t    | (alias template)  | C++20          |
| ref_view | (class template)     | C++20          |

### Rangeアダプタ

#### filter view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| filter_view      | 指定した条件を満たす要素だけを集めるビュー (class template)     | C++20          |
| filter           | 指定した条件を満たす要素だけを集めるビューを生成する (customization point object)  | C++20          |

#### transform view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| transform_view      | 指定した関数で各要素を変換するビュー (class template)     | C++20          |
| transform           | 指定した関数で各要素を変換するビューを生成する (customization point object)  | C++20          |

#### take view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| take_view      | 先頭から指定した個数だけ取り出すビュー (class template)     | C++20          |
| take           | 先頭から指定した個数だけ取り出すビューを生成する (customization point object)  | C++20          |

#### take while view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| take_while_view      | 先頭から指定した条件を満たす範囲を取り出すビュー (class template)     | C++20          |
| take_while           | 先頭から指定した条件を満たす範囲を取り出すビューを生成する (customization point object)  | C++20          |

#### drop view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| drop_view      | 先頭から指定した個数だけ除外するビュー (class template)     | C++20          |
| drop           | 先頭から指定した個数だけ除外するビューを生成する (customization point object)  | C++20          |

#### drop while view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| drop_while_view      | 先頭から指定した条件を満たす範囲を除外するビュー (class template)     | C++20          |
| drop_while           | 先頭から指定した条件を満たす範囲を除外するビューを生成する (customization point object)  | C++20          |

#### join view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| join_view      | ネストされた範囲を平坦にするビュー (class template)     | C++20          |
| join           | ネストされた範囲を平坦にするビューを生成する (customization point object)  | C++20          |

#### split view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| split_view      | 範囲を指定したデリミタで分割するビュー (class template)     | C++20          |
| split           | 範囲を指定したデリミタで分割するビューを生成する (customization point object)  | C++20          |

#### counted view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| counted           | イテレータを指定した数だけ進めるビューを生成する (customization point object)  | C++20          |

#### common view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| common_view      | common_rangeにしたビュー (class template)     | C++20          |
| common           | common_rangeなビューを生成する (customization point object)  | C++20          |

#### reverse view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| reverse_view      | 逆順のビュー (class template)     | C++20          |
| reverse           | 逆順のビューを生成する (customization point object)  | C++20          |

#### elements view

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| elements_view | 第n要素を集めたビュー (class template)     | C++20          |
| keys_view     | 第0要素を集めたビュー (alias template)     | C++20          |
| values_view   | 第1要素を集めたビュー (alias template)     | C++20          |
| elements      | 第n要素を集めたビューを生成する (variable template) | C++20          |
| keys          | 第0要素を集めたビューを生成する (customization point object)  | C++20          |
| values        | 第1要素を集めたビューを生成する (customization point object)  | C++20          |

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
