# bit
* bit[meta header]
* cpp20[meta cpp]

`<bit>`ヘッダでは、ビット操作のための機能を定義する。

本ヘッダはフリースタンディング環境でも提供される。

## 変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`bit_cast`](bit/bit_cast.md) | ビットレベルの再解釈キャスト (function template) | C++20 |


## バイト入替

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`byteswap`](bit/byteswap.md) | バイト単位入れ替え (function template) | C++23 |


## 2の累乗整数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`has_single_bit`](bit/has_single_bit.md) | 1ビットだけ立っている値をもっているか判定する (function template) | C++20 |
| [`bit_ceil`](bit/bit_ceil.md)   | 整数値を2の累乗値に切り上げる (function template) | C++20 |
| [`bit_floor`](bit/bit_floor.md) | 整数値を2の累乗値に切り下げる (function template) | C++20 |
| [`bit_width`](bit/bit_width.md) | 値を表現するために必要なビット幅を求める (function template) | C++20 |


## 循環ビットシフト

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`rotl`](bit/rotl.md) | 左循環ビットシフト (function template) | C++20 |
| [`rotr`](bit/rotr.md) | 右循環ビットシフト (function template) | C++20 |


## ビットシフト

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`shl`](bit/shl.md) | 左ビットシフト（未定義動作にならない） (function template) | C++29 |
| [`shr`](bit/shr.md) | 右ビットシフト（未定義動作にならない） (function template) | C++29 |


## ビット並べ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`bit_reverse`](bit/bit_reverse.md) | ビット列の並びを反転する (function template) | C++29 |
| [`bit_repeat`](bit/bit_repeat.md) | 最下位`l`ビットのパターンを繰り返す (function template) | C++29 |
| [`bit_compress`](bit/bit_compress.md) | マスクで立っている位置のビットを下位へ詰める (function template) | C++29 |
| [`bit_expand`](bit/bit_expand.md) | 下位ビットをマスクで立っている位置へ展開する (function template) | C++29 |


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


## 関連項目
- [`<stdbit.h>`](stdbit.h.md) - C互換のビット操作ライブラリ


## バージョン
### 言語
- C++20
