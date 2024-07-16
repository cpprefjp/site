# bit
* bit[meta header]
* cpp20[meta cpp]

`<bit>`ヘッダでは、ビット操作のための機能を定義する。

本ヘッダはフリースタンディング環境でも提供される。

## 変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`bit_cast`](bit/bit_cast.md) | ビットレベルの再解釈キャスト (functional template) | C++20 |


## バイト入替

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`byteswap`](bit/byteswap.md) | バイト単位入れ替え (functional template) | C++23 |


## 2の累乗整数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`has_single_bit`](bit/has_single_bit.md) | 1ビットだけ立っている値をもっているか判定する (functional template) | C++20 |
| [`bit_ceil`](bit/bit_ceil.md)   | 整数値を2の累乗値に切り上げる (functional template) | C++20 |
| [`bit_floor`](bit/bit_floor.md) | 整数値を2の累乗値に切り下げる (functional template) | C++20 |
| [`bit_width`](bit/bit_width.md) | 値を表現するために必要なビット幅を求める (functional template) | C++20 |


## 循環ビットシフト

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`rotl`](bit/rotl.md) | 左循環ビットシフト (function template) | C++20 |
| [`rotr`](bit/rotr.md) | 右循環ビットシフト (function template) | C++20 |


## ビットカウント

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`countl_zero`](bit/countl_zero.md) | 左から連続した0のビットを数える (function template) | C++20 |
| [`countl_one`](bit/countl_one.md) | 左から連続した1のビットを数える (function template) | C++20 |
| [`countr_zero`](bit/countr_zero.md) | 右から連続した0のビットを数える (function template) | C++20 |
| [`countr_one`](bit/countr_one.md) | 右から連続した1のビットを数える (function template) | C++20 |
| [`popcount`](bit/popcount.md) | 立っているビットを数える (function template) | C++20 |


## エンディアン

| 名前 | 説明 | 対応バージョン |
|-------------|-----------------------------------|-------|
| [`endian`](bit/endian.md) | バイトの並び順を表す列挙型 (enum) | C++20 |


## バージョン
### 言語
- C++20
