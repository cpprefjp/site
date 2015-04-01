#match_flag_type (C++11)
* regex[meta header]
* std::regex_constants[meta namespace]
* typedef[meta id-type]

```cpp
namespace std {
namespace regex_constants{
  typedef implementation-defined match_flag_type;
  constexpr match_flag_type match_default = {};
  constexpr match_flag_type match_not_bol = unspecified;
  constexpr match_flag_type match_not_eol = unspecified;
  constexpr match_flag_type match_not_bow = unspecified;
  constexpr match_flag_type match_not_eow = unspecified;
  constexpr match_flag_type match_any = unspecified;
  constexpr match_flag_type match_not_null = unspecified;
  constexpr match_flag_type match_continuous = unspecified;
  constexpr match_flag_type match_prev_avail = unspecified;
  constexpr match_flag_type format_default = {};
  constexpr match_flag_type format_sed = unspecified;
  constexpr match_flag_type format_no_copy = unspecified;
  constexpr match_flag_type format_first_only = unspecified;
}}
```
* implementation-defined[italic]
* unspecified[italic]

##概要
マッチ条件と書式を表す実装定義のビットマスク型


| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `match_default` | 空のマッチ条件を表す値。 | C++11 |
| `match_not_bol` | シーケンスの最初の文字を、行頭として扱わないようにする。`^`が`[first, first]`にマッチしなくなる。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_not_eol` | シーケンスの最後の文字を、行末として扱わないようにする。`$`が`[last, last)`にマッチしなくなる。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_not_bow` | シーケンスの最初の文字を、単語の開始として扱わないようにする。`\\b`が、先頭の文字から始まる単語にマッチしなくなる。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_not_eow` | シーケンスの最後の文字を、単語の終端として扱わないようにする。`\\b`が、最後の文字で終わる単語にマッチしなくなる。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_any` | 複数のマッチ候補がある場合、その全てをマッチ結果として受け入れる。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_not_null` | 空のシーケンスにはマッチしないようにする。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_continuous` | シーケンスの先頭にマッチするかどうかだけを調べる。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_prev_avail` | シーケンスの先頭の一文字前(`--first`)が有効な位置であることを示す。このフラグが設定されると、`match_not_bol`と`match_not_bow`は無視される。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `format_default` | ECMAScript形式のルールで置換を行う。 | C++11 |
| `format_sed` | POSIXユーティリティのsed形式のルールで置換を行う。 | C++11 |
| `format_no_copy` | 検索と置換の操作において、正規表現にマッチしない文字列を出力にコピーしない。 | C++11 |
| `format_first_only` | 検索と置換の操作において、最初にマッチしたもののみを扱う。 | C++11 |


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


