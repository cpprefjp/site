# cwchar
* cwchar[meta header]

`<cwchar>`ヘッダでは、ワイド文字 (`wchar_t`) の入出力・文字列操作・数値変換と、マルチバイト文字とワイド文字の変換のための機能を定義する。これらの機能は、`std`名前空間に属することを除いてC言語の標準ライブラリ`<wchar.h>`ヘッダと同じである（ただし`wchar_t`型は宣言しない）。


## 型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`size_t`](/reference/cstddef/size_t.md) | 符号なし整数型 | |
| [`mbstate_t`](cwchar/mbstate_t.md) | マルチバイト文字とワイド文字の変換状態を保持する型 | |
| [`wint_t`](cwchar/wint_t.md) | ワイド文字とファイル終端 (`WEOF`) を表現できる整数型 | |
| [`tm`](/reference/ctime/tm.md) | 日時を保持する構造体型（[`<ctime>`](ctime.md)で定義される型の宣言） | |


## マクロ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`NULL`](/reference/cstddef/null.md) | ヌルポインタ定数に展開されるマクロ | |
| [`WCHAR_MAX`](cwchar/wchar_max.md) | `wchar_t`型の最大値 | |
| [`WCHAR_MIN`](cwchar/wchar_min.md) | `wchar_t`型の最小値 | |
| [`WEOF`](cwchar/weof.md) | ワイド文字ストリームの終端を表す`wint_t`型の定数 | |
| `__STDC_VERSION_WCHAR_H__` | `<cwchar>`が提供するC標準ライブラリ機能のバージョン (`202311L`) | C++26 |


## 書式付き入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`wprintf`](cwchar/wprintf.md) | 書式を指定して標準出力に出力する | |
| [`wscanf`](cwchar/wscanf.md) | 書式を指定して標準入力から入力する | |
| [`fwprintf`](cwchar/fwprintf.md) | 書式を指定してファイルストリームに出力する | |
| [`fwscanf`](cwchar/fwscanf.md) | 書式を指定してファイルストリームから入力する | |
| [`swprintf`](cwchar/swprintf.md) | 書式と文字数を指定して、ワイド文字列領域に出力する | |
| [`swscanf`](cwchar/swscanf.md) | 書式を指定してワイド文字列領域から入力する | |
| [`vwprintf`](cwchar/vwprintf.md) | 可変引数リスト`va_list`を使用し、書式を指定して標準出力に出力する | |
| [`vwscanf`](cwchar/vwscanf.md) | 可変引数リスト`va_list`を使用し、書式を指定して標準入力から入力する | C++11 |
| [`vfwprintf`](cwchar/vfwprintf.md) | 可変引数リスト`va_list`を使用し、書式を指定してファイルストリームに出力する | |
| [`vfwscanf`](cwchar/vfwscanf.md) | 可変引数リスト`va_list`を使用し、書式を指定してファイルストリームから入力する | C++11 |
| [`vswprintf`](cwchar/vswprintf.md) | 可変引数リスト`va_list`を使用し、書式を指定してワイド文字列領域に出力する | |
| [`vswscanf`](cwchar/vswscanf.md) | 可変引数リスト`va_list`を使用し、書式を指定してワイド文字列領域から入力する | C++11 |


## 文字単位の入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`getwchar`](cwchar/getwchar.md) | 標準入力から1文字入力する | |
| [`getwc`](cwchar/getwc.md) | ファイルストリームから1文字入力する | |
| [`fgetwc`](cwchar/fgetwc.md) | ファイルストリームから1文字入力する | |
| [`fgetws`](cwchar/fgetws.md) | ファイルストリームからN文字入力する | |
| [`putwchar`](cwchar/putwchar.md) | 標準出力に1文字出力する | |
| [`putwc`](cwchar/putwc.md) | ファイルストリームに1文字出力する | |
| [`fputwc`](cwchar/fputwc.md) | ファイルストリームに1文字出力する | |
| [`fputws`](cwchar/fputws.md) | ファイルストリームに文字列を出力する | |
| [`ungetwc`](cwchar/ungetwc.md) | 入力ストリームに1文字戻す | |
| [`fwide`](cwchar/fwide.md) | ストリームの入出力の単位（ワイド文字／マルチバイト文字）を設定・取得する | |


## 数値変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`wcstod`](cwchar/wcstod.md) | ワイド文字列を`double`型に変換する | |
| [`wcstof`](cwchar/wcstof.md) | ワイド文字列を`float`型に変換する | C++11 |
| [`wcstold`](cwchar/wcstold.md) | ワイド文字列を`long double`型に変換する | C++11 |
| [`wcstol`](cwchar/wcstol.md) | ワイド文字列を、基数を指定して`long`型に変換する | |
| [`wcstoll`](cwchar/wcstoll.md) | ワイド文字列を、基数を指定して`long long`型に変換する | C++11 |
| [`wcstoul`](cwchar/wcstoul.md) | ワイド文字列を、基数を指定して`unsigned long`型に変換する | |
| [`wcstoull`](cwchar/wcstoull.md) | ワイド文字列を、基数を指定して`unsigned long long`型に変換する | C++11 |


## 文字列操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`wcslen`](cwchar/wcslen.md) | 文字列の長さを取得する | |
| [`wcscpy`](cwchar/wcscpy.md) | 文字列をコピーする | |
| [`wcsncpy`](cwchar/wcsncpy.md) | 文字数を指定して文字列をコピーする | |
| [`wcscat`](cwchar/wcscat.md) | 文字列を連結する | |
| [`wcsncat`](cwchar/wcsncat.md) | 文字数を指定して文字列を連結する | |
| [`wcscmp`](cwchar/wcscmp.md) | 文字列を比較する | |
| [`wcsncmp`](cwchar/wcsncmp.md) | 文字数を指定して文字列を比較する | |
| [`wcscoll`](cwchar/wcscoll.md) | 現在のロケールに従って文字列を比較する | |
| [`wcsxfrm`](cwchar/wcsxfrm.md) | ロケールに従った比較のために文字列を変換する | |
| [`wcschr`](cwchar/wcschr.md) | 文字列から文字を検索する | |
| [`wcsrchr`](cwchar/wcsrchr.md) | 文字列から文字を後方検索する | |
| [`wcsstr`](cwchar/wcsstr.md) | 文字列から部分文字列を検索する | |
| [`wcspbrk`](cwchar/wcspbrk.md) | 文字列から、指定した集合に含まれる文字を検索する | |
| [`wcsspn`](cwchar/wcsspn.md) | 文字列の先頭から、指定した集合に含まれる文字が続く長さを取得する | |
| [`wcscspn`](cwchar/wcscspn.md) | 文字列の先頭から、指定した集合に含まれない文字が続く長さを取得する | |
| [`wcstok`](cwchar/wcstok.md) | 文字列を分割する | |
| [`wcsftime`](cwchar/wcsftime.md) | 日時を書式化して文字列に出力する | |


## メモリ操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`wmemcpy`](cwchar/wmemcpy.md) | 指定した文字数をコピーする | |
| [`wmemmove`](cwchar/wmemmove.md) | 領域が重なっていてもよい形で、指定した文字数をコピーする | |
| [`wmemcmp`](cwchar/wmemcmp.md) | 指定した文字数を比較する | |
| [`wmemchr`](cwchar/wmemchr.md) | 指定した文字数の中から文字を検索する | |
| [`wmemset`](cwchar/wmemset.md) | 指定した文字数を、指定した文字で埋める | |


## マルチバイト文字とワイド文字の変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`mbsinit`](cwchar/mbsinit.md) | 変換状態が初期状態であるかを判定する | |
| [`mbrlen`](cwchar/mbrlen.md) | マルチバイト文字のバイト数を取得する | |
| [`mbrtowc`](cwchar/mbrtowc.md) | マルチバイト文字を、ワイド文字に変換する | |
| [`wcrtomb`](cwchar/wcrtomb.md) | ワイド文字を、マルチバイト文字に変換する | |
| [`mbsrtowcs`](cwchar/mbsrtowcs.md) | マルチバイト文字列を、ワイド文字列に変換する | |
| [`wcsrtombs`](cwchar/wcsrtombs.md) | ワイド文字列を、マルチバイト文字列に変換する | |
| [`btowc`](cwchar/btowc.md) | 1バイト文字を、ワイド文字に変換する | |
| [`wctob`](cwchar/wctob.md) | ワイド文字を、1バイト文字に変換する | |


## 備考
- これらの関数名の末尾や中間にある`r`は、変換状態を引数として受け取る「再入可能 (restartable)」なバージョンであることを表す。[`<cstdlib>`](cstdlib.md)の[`mblen()`](cstdlib/mblen.md)などのように内部状態をもつ関数と異なり、複数のスレッドから安全に使用できる


## 関連項目
- [`<cuchar>`](cuchar.md)
- [`<cstdlib>`](cstdlib.md)


## 参照
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、`__STDC_VERSION_WCHAR_H__`が追加された
