#regex (C++11)
`<regex>`ヘッダは、文字列に対する正規表現を行うためのクラス・関数を定義する。

##正規表現クラス

| 名前                                    | 説明                                  | 対応バージョン |
|-----------------------------------------|---------------------------------------|-------|
| [`basic_regex`](./regex/basic_regex.md) | 正規表現クラス (class template)       | C++11 |
| [`regex`](./regex/basic_regex.md)       | `char`版の正規表現クラス (typedef)    | C++11 |
| [`wregex`](./regex/basic_regex.md)      | `wchar_t`版の正規表現クラス (typedef) | C++11 |


##オプション・定数

| 名前              | 説明                                  | 対応バージョン |
|-------------------|---------------------------------------|-------|
| `regex_constants` | 正規表現の構文オプション、マッチフラグ、エラー値などの定数 (namespace) | C++11 |
| `regex_traits`    | 正規表現の文字・変換に関する特性 (class template)                      | C++11 |


##エラー

| 名前              | 説明                                               | 対応バージョン |
|-------------------|----------------------------------------------------|-------|
| `regex_error`     | このライブラリから送出される正規表現の例外 (class) | C++11 |


##マッチ結果

| 名前              | 説明                                                                   | 対応バージョン |
|-------------------|------------------------------------------------------------------------|-------|
| `sub_match`       | 各部分マッチ結果が格納されるクラス (class template)                    | C++11 |
| `csub_match`      | `sub_match`クラスの`const char*`型バージョン (typedef)                 | C++11 |
| `wcsub_match`     | `sub_match`クラスの`const wchar_t*`型バージョン (typedef)              | C++11 |
| `ssub_match`      | `sub_match`クラスの[`string`](/reference/string/basic_string.md)`::const_iterator`バージョン (typedef) | C++11 |
| `wssub_match`     | `sub_match`クラスの[`wstring`](/reference/string/basic_string.md)`::const_iterator`バージョン (typedef) | C++11 |
| `match_results`   | 全マッチ結果が格納されるクラス (class template)                        | C++11 |
| `cmatch`          | `match_results`クラスの`const char*`型バージョン (typedef)             | C++11 |
| `wcmatch`         | `match_results`クラスの`const wchar_t*`型バージョン (typedef)          | C++11 |
| `smatch`          | `match_results`クラスの[`string`](/reference/string/basic_string.md)`::const_iterator`バージョン (typedef) | C++11 |
| `wsmatch`         | `match_results`クラスの[`wstring`](/reference/string/basic_string.md)`::const_iterator`バージョン (typedef) | C++11 |

##イテレータアダプタ

| 名前                                          | 説明                                                                                                         | 対応バージョン |
|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------|----------------|
| [`regex_iterator`](regex/regex_iterator.md)   | 正規表現のマッチ結果を走査するためのイテレータ (class template)                                              | C++11          |
| [`cregex_iterator`](regex/regex_iterator.md)  | `regex_iterator`クラスの`const char*`バージョン (typedef)                                                    | C++11          |
| [`wcregex_iterator`](regex/regex_iterator.md) | `regex_iterator`クラスの`const wchar_t*`バージョン (typedef)                                                 | C++11          |
| [`sregex_iterator`](regex/regex_iterator.md)  | `regex_iterator`クラスの[`string`](/reference/string/basic_string.md)`::const_iterator`バージョン (typedef)  | C++11          |
| [`wsregex_iterator`](regex/regex_iterator.md) | `regex_iterator`クラスの[`wstring`](/reference/string/basic_string.md)`::const_iterator`バージョン (typedef) | C++11          |
| `regex_token_iterator`                        | 正規表現の部分マッチ結果を走査するためのイテレータ (class template)                                          | C++11          |
| `cregex_token_iterator`                       | `regex_token_iterator`クラスの`const char*`バージョン (typedef)                                              | C++11          |
| `wcregex_token_iterator`                      | `regex_token_iterator`クラスの`const wchar_t*`バージョン (typedef)                                           | C++11          |
| `scregex_token_iterator`                      | `regex_token_iterator`クラスの[`string`](/reference/string/basic_string.md)`::const_iterator`バージョン      | C++11          |
| `wscregex_token_iterator`                     | `regex_token_iterator`クラスの[`wstring`](/reference/string/basic_string.md)`::const_iterator`バージョン     | C++11          |


##バージョン
###言語
- C++11

