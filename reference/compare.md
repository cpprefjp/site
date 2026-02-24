# compare

* compare[meta header]
* cpp20[meta cpp]

## 概要

`<compare>`ヘッダでは三方比較演算子`<=>`の戻り値型である比較カテゴリ型、及び一貫比較に関連するコンセプトや関数等を提供する。

比較カテゴリ型を返す`<=>`を利用する際は本ヘッダのインクルードは必須である。

本ヘッダはフリースタンディング環境でも提供される。

## 代入可能性（*substitutability*）

代入可能性とは、`a == b`ならば`f(a) == f(b)`となる性質の事である。なお、ここでの`f()`は内部状態や副作用を持たず入力のアクセス可能な要素のみによって出力が決まる関数で、`pure`な関数と呼ばれるものである。

`strong_ordering`を返す`<=>`における同値比較がこの性質を満たしていることを表明する。このカテゴリを返す`<=>`を実装する際はこれらの性質を満たすように実装する必要がある。

数学の言葉ではこの性質は代入原理（*Substitution property*）と呼ばれ、これを満たす同値関係のことを特に相当関係と呼ぶ。  
また、相当関係による同値類（ある集合上で`a == b`となる要素を集めて出来る集合）を考れば、それら同値類のどれを取ってもその要素はただ1つだけとなる。その意味から、相当関係は最も細かい同値関係とも呼ばれる。

## 比較カテゴリ型

| 名前                                                      | 説明                           | 対応バージョン |
| --------------------------------------------------------- | ------------------------------ | -------------- |
| [`partial_ordering`](compare/partial_ordering.md) | 半順序関係を表す比較カテゴリ型 | C++20          |
| [`weak_ordering`](compare/weak_ordering.md)       | 弱順序関係を表す比較カテゴリ型 | C++20          |
| [`strong_ordering`](compare/strong_ordering.md)   | 全順序関係を表す比較カテゴリ型 | C++20          |

## 三方比較の結果型

| 名前                                                                          | 説明                                                      | 対応バージョン |
| ----------------------------------------------------------------------------- | --------------------------------------------------------- | -------------- |
| [`common_comparison_category`](compare/common_comparison_category.md) | 指定された全ての型の共通比較カテゴリ型を求める | C++20          |
| [`compare_three_way_result`](compare/compare_three_way_result.md)     | 指定された型の間での`<=>`による比較結果の型を求める          | C++20          |

## コンセプト

| 名前                                                                        | 説明                                                                                        | 対応バージョン |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------- |
| [`three_way_comparable`](compare/three_way_comparable.md)           | 指定された型が`<=>`による比較が可能であり、結果が指定した比較カテゴリ型に変換可能である     | C++20          |
| [`three_way_comparable_with`](compare/three_way_comparable.md) | 指定された型の間で`<=>`による比較が可能であり、結果が指定した比較カテゴリ型に変換可能である | C++20          |


## 名前付きの比較関数

| 名前                                    | 説明                                            | 対応バージョン |
| --------------------------------------- | ----------------------------------------------- | -------------- |
| [`is_eq`](compare/named_comparison_functions.md)     | `a <=> b`の比較結果が`a == b`であるかを取得する | C++20          |
| [`is_neq`](compare/named_comparison_functions.md)   | `a <=> b`の比較結果が`a != b`であるかを取得する | C++20          |
| [`is_lt`](compare/named_comparison_functions.md)     | `a <=> b`の比較結果が`a < b`であるかを取得する  | C++20          |
| [`is_lteq`](compare/named_comparison_functions.md) | `a <=> b`の比較結果が`a <= b`であるかを取得する | C++20          |
| [`is_gt`](compare/named_comparison_functions.md)     | `a <=> b`の比較結果が`a > b`であるかを取得する  | C++20          |
| [`is_gteq`](compare/named_comparison_functions.md) | `a <=> b`の比較結果が`a >= b`であるかを取得する | C++20          |


## 比較関数オブジェクト

| 名前                                                                                  | 説明                                                                                                    | 対応バージョン |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------- |
| [`compare_three_way`](compare/compare_three_way.md)                           | ポインタ比較時のみ実装定義の狭義全順序によって、その他の場合はデフォルトの三方比較を行う                | C++20          |
| [`strong_order`](compare/strong_order.md)                                     | 全順序による三方比較を行う（カスタマイゼーションポイントオブジェクト）                                  | C++20          |
| [`weak_order`](compare/weak_order.md)                                         | 弱順序による三方比較を行う（カスタマイゼーションポイントオブジェクト）                                  | C++20          |
| [`partial_order`](compare/partial_order.md)                                   | 半順序による三方比較を行う（カスタマイゼーションポイントオブジェクト）                                  | C++20          |
| [`compare_strong_order_fallback`](compare/compare_strong_order_fallback.md)   | `<=>`が無い場合でも`< ==`を用いて全順序による三方比較を行う（カスタマイゼーションポイントオブジェクト） | C++20          |
| [`compare_weak_order_fallback`](compare/compare_weak_order_fallback.md)       | `<=>`が無い場合でも`< ==`を用いて弱順序による三方比較を行う（カスタマイゼーションポイントオブジェクト） | C++20          |
| [`compare_partial_order_fallback`](compare/compare_partial_order_fallback.md) | `<=>`が無い場合でも`< ==`を用いて半順序による三方比較を行う（カスタマイゼーションポイントオブジェクト） | C++20          |

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]

## 関連項目

- [C++20 `<=>`/`==`による比較演算子の自動定義](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
- [P1959R0 Remove `std::weak_equality` and `std::strong_equality`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1959r0.html)
- [P1855R0 Make `<compare>` freestanding](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1855r0.html)
- [P2404R3 Move-only types for `equality_comparable_with`, `totally_ordered_with`, and `three_way_comparable_with`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2404r3.pdf)
