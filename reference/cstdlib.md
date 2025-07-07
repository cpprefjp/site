# cstdlib
* cstdlib[meta header]

`<cstdlib>`ヘッダでは、一般的なユーティリティの関数を定義する。これらの機能は基本的には、`std`名前空間に属することを除いてC言語の標準ライブラリ`<stdlib.h>`ヘッダと同じである。

本ヘッダはフリースタンディング環境でも提供される。
フリースタンディング環境の場合、少なくとも`abort`, `atexit`, `at_quick_exit`, `exit`, `quick_exit`関数がサポートされる。

ただし、一部の機能には、`[[noreturn]]`属性、`noexcept`キーワード、スレッドローカルストレージのような、C++特有の言語機能に関する規定がある。


## 数値変換

| 名前 | 説明 | 対応バージョン |
|--------|------|----------------|
| [`atoi`](cstdlib/atoi_atol_atoll.md) | 文字列を`int`型に変換する (function) | |
| [`atol`](cstdlib/atoi_atol_atoll.md) | 文字列を`long`型に変換する (function) | |
| [`atoll`](cstdlib/atoi_atol_atoll.md) | 文字列を`long long`型に変換する (function) | C++11 |
| [`atof`](cstdlib/atof.md) | 文字列を`double`型に変換する (function) | |
| `strtol`   | 文字列を、基数を指定して`long`型に変換する (function) | |
| `strtoll`  | 文字列を、基数を指定して`long long`型に変換する (function) | C++11 |
| `strtoul`  | 文字列を、基数を指定して`unsigned long`型に変換する (function) | |
| `strtoull` | 文字列を、基数を指定して`unsigned long long`型に変換する (function) | C++11 |
| `strtof`   | 文字列を、`float`型に変換する (function) | |
| `strtod`   | 文字列を、`double`型に変換する (function) | |
| `strtold`  | 文字列を、`long double`型に変換する (function) | C++11 |


## 擬似乱数

| 名前 | 説明 | 対応バージョン |
|------------|------------------------------------------|-----------------|
| [`RAND_MAX`](cstdlib/rand_max.md) | `rand`関数によって生成される値域の最大値を表す整数値マクロ (macro) | C++14から非推奨 |
| [`srand`](cstdlib/srand.md)    | `rand`関数によって生成される擬似乱数のシードを指定する (function) | C++14から非推奨 |
| [`rand`](cstdlib/rand.md)     | `srand`で指定されたシードを元に、擬似乱数を生成する (function) | C++14から非推奨 |


## メモリ管理

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`aligned_alloc`](cstdlib/aligned_alloc.md) | 指定したアライメントでメモリを確保する (function) | C++17 |
| [`malloc`](cstdlib/malloc.md)  | メモリを確保する (function) | |
| [`calloc`](cstdlib/calloc.md) | メモリを確保し、領域をゼロ初期化する (function) | |
| [`realloc`](cstdlib/realloc.md.nolink) | メモリを再確保する (function) | |
| [`free`](cstdlib/free.md)    | 確保したメモリを解放する (function) | |


## プログラムの開始と終了

| 名前 | 説明 | 対応バージョン |
|-----------------|--------------------------------------------------------|-------|
| [`EXIT_FAILURE`](cstdlib/exit_failure.md)  | プログラムが異常終了したことを表す整数値マクロ (macro) | |
| [`EXIT_SUCCESS`](cstdlib/exit_success.md)  | プログラムが正常終了したことを表す整数値マクロ (macro) | |
| [`abort`](cstdlib/abort.md) | プログラムを異常終了させる (function) | |
| [`_Exit`](cstdlib/exit_.md) | 後処理をせずに、プログラムを終了させる (function) | C++11 |
| [`exit`](cstdlib/exit.md) | プログラムを終了させる (function) | |
| [`atexit`](cstdlib/atexit.md) | プログラムが通常の方法で終了するときに呼ばれる関数を登録する (function) | |
| [`quick_exit`](cstdlib/quick_exit.md) | 後処理をせずに、プログラムを終了させる (function) | C++11 |
| [`at_quick_exit`](cstdlib/at_quick_exit.md) | `quick_exit`関数でプログラムが終了するときに呼ばれる関数を登録する (function) | C++11 |


## 環境

| 名前 | 説明 | 対応バージョン |
|----------|------|----------------|
| [`getenv`](cstdlib/getenv.md) | 環境変数を取得する (function) | |
| [`system`](cstdlib/system.md) | システムコマンドを実行する (function) | |


## 検索と並び替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `bsearch` | 二分探索を行う (function) | |
| `qsort`   | 範囲の並べ替えを行う (function) | |


## 整数に対する算術関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`abs`](cstdlib/abs.md)         | `int`の絶対値を取得する (function) | |
| [`labs`](cstdlib/abs.md)        | `long`の絶対値を取得する (function) | |
| [`llabs`](cstdlib/abs.md)       | `long long`の絶対値を取得する (function) | C++11 |
| [`div_t`](cstdlib/div_t.md)     | `div`関数の戻り値型 (class) | |
| [`div`](cstdlib/div.md)         | `int`の除算と剰余算を行う (function) | |
| [`ldiv_t`](cstdlib/ldiv_t.md)   | `ldiv`関数の戻り値型 (class) | |
| [`ldiv`](cstdlib/div.md)        | `long`の除算と剰余算を行う (function) | |
| [`lldiv_t`](cstdlib/lldiv_t.md) | `lldiv`関数の戻り値型 (class) | C++11 |
| [`lldiv`](cstdlib/div.md)       | `long long`の除算と剰余算を行う (function) | C++11 |


## マルチバイト文字とワイド文字の変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `MB_CUR_MAX` | マルチバイト文字列の最大サイズを表す整数値マクロ (macro) 
| `mblen` | マルチバイト文字の長さを取得する (function) | |
| `mbtowc` | マルチバイト文字を、ワイド文字に変換する (function) | |
| `wctomb` | ワイド文字を、マルチバイト文字に変換する (function) | |
| `mbstowcs` | マルチバイト文字列を、ワイド文字列に変換する (function) | |
| `wcstombs` | ワイド文字列を、マルチバイト文字列に変換する (function) | |


