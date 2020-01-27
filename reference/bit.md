# bit
* bit[meta header]
* cpp20[meta cpp]

`<bit>`ヘッダでは、ビット操作のための機能を定義する。

## 変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`bit_cast`](bit/bit_cast.md) | ビットレベルの再解釈�ャスト (functional template) | C++20 |


## 2の累乗整数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ispow2`](bit/ispow2.md) | 整数値が2の累乗かを判定する (functional template) | C++20 |
| [`ceil2`](bit/ceil2.md)   | 整数値を2の累乗値に切り上げる (functional template) | C++20 |
| [`floor2`](bit/floor2.md) | 整数値を2の累乗値に切り下げる (functional template) | C++20 |
| [`log2p1`](bit/log2p1.md) | 2を底とした整数値の対数を求めて1を足す (functional template) | C++20 |


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
