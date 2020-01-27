# sstream
* sstream[meta header]

`<sstream>`ヘッダでは、文�列オブジェクトを出力先・入力元とするストリームクラスを定義する。

## ストリームバッファ

| 名前                  | 説明                                           | 対応バージョン |
|-----------------------|------------------------------------------------|----------------|
| `basic_stringbuf`     | 文�列ストリームバッファ(class template)       | |
| `stringbuf`           | `char`版の文�列ストリームバッファ(type-alias)    | |
| `wstringbuf`          | `wchar_t`版の文�列ストリームバッファ(type-alias) | |

## 入力ストリーム

| 名前                  | 説明                                           | 対応バージョン |
|-----------------------|------------------------------------------------|----------------|
| [`basic_istringstream`](sstream/basic_istringstream.md) | 文�列入力ストリーム(class template)           | |
| [`istringstream`](sstream/basic_istringstream.md)       | `char`版の文�列入力ストリーム(type-alias)        | |
| [`wistringstream`](sstream/basic_istringstream.md)      | `wchar_t`版の文�列入力ストリーム(type-alias)     | |

## 出力ストリーム

| 名前                  | 説明                                           | 対応バージョン |
|-----------------------|------------------------------------------------|----------------|
| `basic_ostringstream` | 文�列出力ストリーム(class template)           | |
| `ostringstream`       | `char`版の文�列出力ストリーム(type-alias)        | |
| `wostringstream`      | `wchar_t`版の文�列出力ストリーム(type-alias)     | |

## 入出力ストリーム

| 名前                  | 説明                                           | 対応バージョン |
|-----------------------|------------------------------------------------|----------------|
| `basic_stringstream`  | 文�列入出力ストリーム(class template)         | |
| `stringstream`        | `char`版の文�列入出力ストリーム(type-alias)      | |
| `wstringstream`       | `wchar_t`版の文�列入出力ストリーム(type-alias)   | |


