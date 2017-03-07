#regex
* regex[meta header]
* cpp11[meta cpp]

`<regex>`ヘッダは、正規表現に関するクラス・関数を定義する。

##正規表現クラス

| 名前                                    | 説明                                  | 対応バージョン |
|-----------------------------------------|---------------------------------------|----------------|
| [`basic_regex`](regex/basic_regex.md) | 正規表現クラス (class template)       | C++11          |
| [`regex`](regex/basic_regex.md)       | `char`版の正規表現クラス (type-alias)    | C++11          |
| [`wregex`](regex/basic_regex.md)      | `wchar_t`版の正規表現クラス (type-alias) | C++11          |


##オプション・定数

| 名前              | 説明                                  | 対応バージョン |
|-------------------|---------------------------------------|-------|
| [`regex_constants`](regex/regex_constants.md) | 正規表現の構文オプション、マッチフラグ、エラー値などの定数 (namespace) | C++11 |
| [`regex_traits`](regex/regex_traits.md)       | 正規表現の文字・変換に関する特性 (class template)                      | C++11 |


##エラー

| 名前              | 説明                                               | 対応バージョン |
|-------------------|----------------------------------------------------|-------|
| [`regex_error`](regex/regex_error.md) | このライブラリから送出される正規表現の例外 (class) | C++11 |


##マッチ結果

| 名前                                      | 説明                                                                                                                                     | 対応バージョン |
|-------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| [`sub_match`](regex/sub_match.md)         | 各サブマッチ結果が格納されるクラス (class template)                                                                                      | C++11          |
| [`csub_match`](regex/sub_match.md)        | [`sub_match`](regex/sub_match.md) クラスの `const char*` 型バージョン (type-alias)                                                          | C++11          |
| [`wcsub_match`](regex/sub_match.md)       | [`sub_match`](regex/sub_match.md) クラスの `const wchar_t*` 型バージョン (type-alias)                                                       | C++11          |
| [`ssub_match`](regex/sub_match.md)        | [`sub_match`](regex/sub_match.md) クラスの [`string`](/reference/string/basic_string.md)`::const_iterator` バージョン (type-alias)          | C++11          |
| [`wssub_match`](regex/sub_match.md)       | [`sub_match`](regex/sub_match.md) クラスの [`wstring`](/reference/string/basic_string.md)`::const_iterator` バージョン (type-alias)         | C++11          |
| [`match_results`](regex/match_results.md) | 全マッチ結果が格納されるクラス (class template)                                                                                          | C++11          |
| [`cmatch`](regex/match_results.md)        | [`match_results`](regex/match_results.md) クラスの `const char*` 型バージョン (type-alias)                                                  | C++11          |
| [`wcmatch`](regex/match_results.md)       | [`match_results`](regex/match_results.md) クラスの `const wchar_t*` 型バージョン (type-alias)                                               | C++11          |
| [`smatch`](regex/match_results.md)        | [`match_results`](regex/match_results.md) クラスの [`string`](/reference/string/basic_string.md)`::const_iterator` バージョン (type-alias)  | C++11          |
| [`wsmatch`](regex/match_results.md)       | [`match_results`](regex/match_results.md) クラスの [`wstring`](/reference/string/basic_string.md)`::const_iterator` バージョン (type-alias) | C++11          |


##アルゴリズム

| 名前                                      | 説明                                                                               | 対応バージョン |
|-------------------------------------------|------------------------------------------------------------------------------------|----------------|
| [`regex_match`](regex/regex_match.md)     | 文字列全体が正規表現にマッチするか否かの判定を行う (function template)             | C++11          |
| [`regex_search`](regex/regex_search.md)   | 文字列内に正規表現にマッチする部分が存在するか否かの判定を行う (function template) | C++11          |
| [`regex_replace`](regex/regex_replace.md) | 文字列内の正規表現にマッチする部分を置換する (function template)                   | C++11          |


##イテレータアダプタ

| 名前                                                       | 説明                                                                                                                               | 対応バージョン |
|------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|----------------|
| [`regex_iterator`](regex/regex_iterator.md)                | 正規表現のマッチ結果を走査するためのイテレータ (class template)                                                                    | C++11          |
| [`cregex_iterator`](regex/regex_iterator.md)               | [`regex_iterator`](regex/regex_iterator.md)`<const char*>` の別名                                                                  | C++11          |
| [`wcregex_iterator`](regex/regex_iterator.md)              | [`regex_iterator`](regex/regex_iterator.md)`<const wchar_t*>` の別名                                                               | C++11          |
| [`sregex_iterator`](regex/regex_iterator.md)               | [`regex_iterator`](regex/regex_iterator.md)`<`[`string`](/reference/string/basic_string.md)`::const_iterator>` の別名              | C++11          |
| [`wsregex_iterator`](regex/regex_iterator.md)              | [`regex_iterator`](regex/regex_iterator.md)`<`[`wstring`](/reference/string/basic_string.md)`::const_iterator>` の別名             | C++11          |
| [`regex_token_iterator`](regex/regex_token_iterator.md)    | 正規表現のサブマッチを走査するためのイテレータ (class template)                                                                    | C++11          |
| [`cregex_token_iterator`](regex/regex_token_iterator.md)   | [`regex_token_iterator`](regex/regex_token_iterator.md)`<const char*>` の別名                                                      | C++11          |
| [`wcregex_token_iterator`](regex/regex_token_iterator.md)  | [`regex_token_iterator`](regex/regex_token_iterator.md)`<const wchar_t*>` の別名                                                   | C++11          |
| [`scregex_token_iterator`](regex/regex_token_iterator.md)  | [`regex_token_iterator`](regex/regex_token_iterator.md)`<`[`string`](/reference/string/basic_string.md)`::const_iterator>` の別名  | C++11          |
| [`wscregex_token_iterator`](regex/regex_token_iterator.md) | [`regex_token_iterator`](regex/regex_token_iterator.md)`<`[`wstring`](/reference/string/basic_string.md)`::const_iterator>` の別名 | C++11          |


##バージョン
###言語
- C++11
