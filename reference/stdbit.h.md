# stdbit.h
* stdbit.h[meta header]
* cpp26[meta cpp]

`<stdbit.h>`はC23で追加されたビット操作ライブラリをC++から使用するための互換ヘッダである。

C言語では型総称マクロ (type-generic macro) として提供される汎用関数が、C++では関数テンプレートとして提供される。型別の関数 (`_uc`, `_us`, `_ui`, `_ul`, `_ull`サフィックス) はCと共通のインタフェースである。

このヘッダで宣言される関数およびマクロは`std`名前空間に属さず、グローバル名前空間に定義される。C++の対応するヘッダとして`<cstdbit>`は提供されない。これは、C言語との相互運用性を重視し、CとC++の両方でコンパイル可能なコードを記述できるようにするためである。

C++固有のビット操作機能が必要な場合は、[`<bit>`](bit.md)ヘッダの使用を推奨する。


## マクロ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `__STDC_VERSION_STDBIT_H__` | ヘッダのバージョン (`202311L`) | C++26 |
| [`__STDC_ENDIAN_BIG__`](stdbit.h/stdc_endian_big.md) | ビッグエンディアンを表す定数 | C++26 |
| [`__STDC_ENDIAN_LITTLE__`](stdbit.h/stdc_endian_little.md) | リトルエンディアンを表す定数 | C++26 |
| [`__STDC_ENDIAN_NATIVE__`](stdbit.h/stdc_endian_native.md) | 実行環境のエンディアンを表す定数 | C++26 |


## 先頭のビットカウント

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`stdc_leading_zeros`](stdbit.h/stdc_leading_zeros.md) | 左から連続した0のビットを数える (function template) | C++26 |
| [`stdc_leading_ones`](stdbit.h/stdc_leading_ones.md) | 左から連続した1のビットを数える (function template) | C++26 |


## 末尾のビットカウント

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`stdc_trailing_zeros`](stdbit.h/stdc_trailing_zeros.md) | 右から連続した0のビットを数える (function template) | C++26 |
| [`stdc_trailing_ones`](stdbit.h/stdc_trailing_ones.md) | 右から連続した1のビットを数える (function template) | C++26 |


## 先頭のビット位置検索

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`stdc_first_leading_zero`](stdbit.h/stdc_first_leading_zero.md) | 左から最初の0のビット位置を求める (function template) | C++26 |
| [`stdc_first_leading_one`](stdbit.h/stdc_first_leading_one.md) | 左から最初の1のビット位置を求める (function template) | C++26 |


## 末尾のビット位置検索

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`stdc_first_trailing_zero`](stdbit.h/stdc_first_trailing_zero.md) | 右から最初の0のビット位置を求める (function template) | C++26 |
| [`stdc_first_trailing_one`](stdbit.h/stdc_first_trailing_one.md) | 右から最初の1のビット位置を求める (function template) | C++26 |


## ビット数カウント

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`stdc_count_zeros`](stdbit.h/stdc_count_zeros.md) | 0のビットを数える (function template) | C++26 |
| [`stdc_count_ones`](stdbit.h/stdc_count_ones.md) | 1のビットを数える (function template) | C++26 |


## 2の累乗整数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`stdc_has_single_bit`](stdbit.h/stdc_has_single_bit.md) | 1ビットだけ立っている値をもっているか判定する (function template) | C++26 |
| [`stdc_bit_width`](stdbit.h/stdc_bit_width.md) | 値を表現するために必要なビット幅を求める (function template) | C++26 |
| [`stdc_bit_floor`](stdbit.h/stdc_bit_floor.md) | 整数値を2の累乗値に切り下げる (function template) | C++26 |
| [`stdc_bit_ceil`](stdbit.h/stdc_bit_ceil.md) | 整数値を2の累乗値に切り上げる (function template) | C++26 |


## バージョン
### 言語
- C++26

### 処理系

- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`<bit>`](bit.md) - C++標準のビット操作ライブラリ


## 参照
- [N3022 Modern Bit Utilities](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3022.htm)
- [P3370R1 Add new C headers as C++ headers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3370r1.html)