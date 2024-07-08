# 機能テストマクロ
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

### 言語機能

| マクロ名 | 値 | 機能 |
|----------|----|------|
||||

### ライブラリ

ライブラリの機能テストマクロは全て[`<version>`](/reference/version.md)でも提供される。

| マクロ名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
|`__cpp_lib_ranges_as_const`|`202207L`|`ranges::cbegin`が常に定数イテレータを返すようにする|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_fold`|`202207L`|`fold`アルゴリズム|[`<algorithm>`](/reference/algorithm.md)|

## 参照

- [SD-FeatureTest: Feature-Test Macros and Policies - isocpp](https://isocpp.org/std/standing-documents/sd-6-sg10-feature-test-recommendations)