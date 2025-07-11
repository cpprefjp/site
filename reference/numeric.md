# numeric
* numeric[meta header]

`<numeric>` ヘッダでは、数値のシーケンスや数値の処理に特化したアルゴリズムを定義する。


## 集計

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`accumulate`](numeric/accumulate.md)             | 範囲を集計する | |
| [`reduce`](numeric/reduce.md)                     | 範囲を集計する | C++17 |
| [`transform_reduce`](numeric/transform_reduce.md) | 範囲の要素を変換しながら集計する | C++17 |


## 内積

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`inner_product`](numeric/inner_product.md) | 2つのシーケンスの内積を計算する | |


## 部分和

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`partial_sum`](numeric/partial_sum.md)     | 範囲の部分和を計算する  | |
| [`inclusive_scan`](numeric/inclusive_scan.md) | 範囲の部分和を計算する (i番目の部分和にi番目の要素を含む) | C++17 |
| [`exclusive_scan`](numeric/exclusive_scan.md) | 範囲の部分和を計算する (i番目の部分和にi番目の要素を含めない) | C++17 |
| [`transform_inclusive_scan`](numeric/transform_inclusive_scan.md) | 範囲の要素を変換しながら部分和を計算する (i番目の部分和にi番目の要素を含む) | C++17 |
| [`transform_exclusive_scan`](numeric/transform_exclusive_scan.md) | 範囲の要素を変換しながら部分和を計算する (i番目の部分和にi番目の要素を含めない) | C++17 |


## 数列

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`adjacent_difference`](numeric/adjacent_difference.md) | 隣接する要素間の差を計算する | |
| [`iota`](numeric/iota.md)                   | 指定された値から始まる整数列を生成する | C++11 |
| [`ranges::iota`](numeric/ranges_iota.md)                   | 指定された値から始まる整数列を生成する | C++23 |


## 最大公約数と最小公倍数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`gcd`](numeric/gcd.md)                     | 最大公約数を求める | C++17 |
| [`lcm`](numeric/lcm.md)                     | 最小公倍数を求める | C++17 |


## 中点

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`midpoint`](numeric/midpoint.md) | 数値とポインタの中点を求める | C++20 |


## 飽和演算

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`add_sat`](numeric/add_sat.md) | 飽和加算`x + y` | C++26 |
| [`sub_sat`](numeric/sub_sat.md) | 飽和減算`x - y` | C++26 |
| [`mul_sat`](numeric/mul_sat.md) | 飽和乗算`x * y` | C++26 |
| [`div_sat`](numeric/div_sat.md) | 飽和除算`x / y` | C++26 |
| [`saturate_cast`](numeric/saturate_cast.md) | 飽和演算あり型キャスト | C++26 |


## 関連項目
- [`<algorithm>`](/reference/algorithm.md)
    - より汎用的なアルゴリズム
