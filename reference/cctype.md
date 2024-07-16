# cctype
* cctype[meta header]

`<cctype>`ヘッダでは、文字の種別判定関数と変換関数を定義する。これは、C言語の標準ライブラリ`<ctype.h>`と同じである。

全ての関数で、文字は`int`型で表される。
また、全ての関数はロケールの影響を受ける。

## 判定関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`isalnum`](cctype/isalnum.md) | 文字が英数字であるかを判定する | |
| [`isalpha`](cctype/isalpha.md) | 文字が英文字であるかを判定する | |
| [`isblank`](cctype/isblank.md) | 文字が空白文字であるかを判定する | C++11 |
| [`iscntrl`](cctype/iscntrl.md) | 文字が制御文字であるかを判定する | |
| [`isdigit`](cctype/isdigit.md) | 文字が数字であるかを判定する | |
| [`isgraph`](cctype/isgraph.md) | 文字が図表文字であるかを判定する | |
| [`islower`](cctype/islower.md) | 文字が小文字であるかを判定する | |
| [`isprint`](cctype/isprint.md) | 文字が表示文字であるかを判定する | |
| [`ispunct`](cctype/ispunct.md) | 文字が区切り文字であるかを判定する | |
| [`isspace`](cctype/isspace.md) | 文字が空白文字であるかを判定する | |
| [`isupper`](cctype/isupper.md) | 文字が大文字であるかを判定する | |
| [`isxdigit`](cctype/isxdigit.md) | 文字が16進数字であるかを判定する | |


## 変換関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`tolower`](cctype/tolower.md) | 文字を小文字に変換する | |
| [`toupper`](cctype/toupper.md) | 文字を大文字に変換する | |
