# cstdlib
* cstdlib[meta header]

`<cstdlib>`ヘッダでは、一般的なユーティリティの関数を定義する。これらの機能は基本的には、`std`名前空間に属することを除いてC言語の標準ライブラリ`<stdlib.h>`ヘッダと同じである。

ただし、一部の機能には、`[[noreturn]]`属性、`noexcept`�ーワード、スレッド�ーカルストレージのような、C++特有の言語機能に関する規定がある。


## 数値変換

| 名前 | 説明 | 対応バージョン |
|--------|------|----------------|
| `atoi`     | 文�列を`int`型に変換する (function) | |
| `atol`     | 文�列を`long`型に変換する (function) | |
| `atoll`    | 文�列を`long long`型に変換する (function) | C++11 |
| `atof`     | 文�列を`double`型に変換する (function) | |
| `strtol`   | 文�列を、基数を指定して`long`型に変換する (function) | |
| `strtoll`  | 文�列を、基数を指定して`long long`型に変換する (function) | C++11 |
| `strtoul`  | 文�列を、基数を指定して`unsigned long`型に変換する (function) | |
| `strtoull` | 文�列を、基数を指定して`unsigned long long`型に変換する (function) | C++11 |
| `strtof`   | 文�列を、`float`型に変換する (function) | |
| `strtod`   | 文�列を、`double`型に変換する (function) | |
| `strtold`  | 文�列を、`long double`型に変換する (function) | C++11 |


## 擬似乱数

| 名前 | 説明 | 対応バージョン |
|------------|------------------------------------------|-----------------|
| `RAND_MAX` | `rand`関数によって生成される値域の最大値を表す整数値マク� (macro) | C++14から非推奨 |
| `srand`    | `rand`関数によって生成される擬似乱数のシードを指定する (function) | C++14から非推奨 |
| `rand`     | `srand`で指定されたシードを元に、擬似乱数を生成する (function) | C++14から非推奨 |


## メモリ管理

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `aligned_alloc` | 指定したアライメントでメモリを確保する (function) | C++17 |
| `malloc`  | メモリを確保する (function) | |
| `calloc`  | メモリを確保し、領域をゼ�初期化する (function) | |
| `realloc` | メモリを再確保する (function) | |
| `free`    | 確保したメモリを解放する (function) | |


## プ�グラムの開始と終了

| 名前 | 説明 | 対応バージョン |
|-----------------|--------------------------------------------------------|-------|
| [`EXIT_FAILURE`](cstdlib/exit_failure.md)  | プ�グラムが異常終了したことを表す整数値マク� (macro) | |
| [`EXIT_SUCCESS`](cstdlib/exit_success.md)  | プ�グラムが�常終了したことを表す整数値マク� (macro) | |
| [`abort`](cstdlib/abort.md) | プ�グラムを異常終了させる (function) | |
| [`_Exit`](cstdlib/exit_.md) | 後処理をせずに、プ�グラムを終了させる (function) | C++11 |
| [`exit`](cstdlib/exit.md) | プ�グラムを終了させる (function) | |
| [`atexit`](cstdlib/atexit.md) | プ�グラムが通常の方法で終了するときに呼ばれる関数を登録する (function) | |
| [`quick_exit`](cstdlib/quick_exit.md) | 後処理をせずに、プ�グラムを終了させる (function) | C++11 |
| [`at_quick_exit`](cstdlib/at_quick_exit.md) | `quick_exit`関数でプ�グラムが終了するときに呼ばれる関数を登録する (function) | C++11 |


## 環境

| 名前 | 説明 | 対応バージョン |
|----------|------|----------------|
| `getenv` | 環境変数を取得する (function) | |
| `system` | システムコマンドを実行する (function) | |


## 検索と並び替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `bsearch` | 二分木探索を行う (function) | |
| `qsort`   | 範囲の並べ替えを行う (function) | |


## 整数に対する算術関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `abs`     | `int`の絶対値を取得する (function) | |
| `labs`    | `long`の絶対値を取得する (function) | |
| `llabs`   | `long long`の絶対値を取得する (function) | C++11 |
| `div_t`   | `div`関数の戻り値型 (class) | |
| `div`     | `int`の除算を行う (function) | |
| `ldiv_t`  | `div`関数の戻り値型 (class) | |
| `ldiv`    | `long`の除算を行う (functon) | |
| `lldiv_t` | `div`関数の戻り値型 (class) | C++11 |
| `lldiv`   | `long long`の除算を行う (function) | C++11 |


## マルチバイト文�とワイド文�の変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `MB_CUR_MAX` | マルチバイト文�列の最大サイズを表す整数値マク� (macro) 
| `mblen` | マルチバイト文�の長さを取得する (function) | |
| `mbtowc` | マルチバイト文�を、ワイド文�に変換する (function) | |
| `wctomb` | ワイド文�を、マルチバイト文�に変換する (function) | |
| `mbstowcs` | マルチバイト文�列を、ワイド文�列に変換する (function) | |
| `wcstombs` | ワイド文�列を、マルチバイト文�列に変換する (function) | |


