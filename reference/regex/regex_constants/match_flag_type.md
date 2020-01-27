# match_flag_type
* regex[meta header]
* std::regex_constants[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace regex_constants{
  using match_flag_type = implementation-defined;

  // C++11
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

  //C++17
  inline constexpr match_flag_type match_default = {};
  inline constexpr match_flag_type match_not_bol = unspecified;
  inline constexpr match_flag_type match_not_eol = unspecified;
  inline constexpr match_flag_type match_not_bow = unspecified;
  inline constexpr match_flag_type match_not_eow = unspecified;
  inline constexpr match_flag_type match_any = unspecified;
  inline constexpr match_flag_type match_not_null = unspecified;
  inline constexpr match_flag_type match_continuous = unspecified;
  inline constexpr match_flag_type match_prev_avail = unspecified;
  inline constexpr match_flag_type format_default = {};
  inline constexpr match_flag_type format_sed = unspecified;
  inline constexpr match_flag_type format_no_copy = unspecified;
  inline constexpr match_flag_type format_first_only = unspecified;
}}
```
* unspecified[italic]

## 概要
マッチ条件と書式を表す実装定義のビットマスク型


| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `match_default` | 空のマッチ条件を表す値。 | C++11 |
| `match_not_bol` | シーケンスの最初の文�を、行�として扱わないようにする。`'^'`が`[first, first)`にマッチしなくなる。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_not_eol` | シーケンスの最後の文�を、行末として扱わないようにする。`'$'`が`[last, last)`にマッチしなくなる。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_not_bow` | シーケンスの最初の文�を、単語の開始として扱わないようにする。`'\\b'`が、先�の文�から始まる単語にマッチしなくなる。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_not_eow` | シーケンスの最後の文�を、単語の終端として扱わないようにする。`'\\b'`が、最後の文�で終わる単語にマッチしなくなる。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_any` | 複数のマッチ候補がある場合、その全てをマッチ結果として受け入れる。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_not_null` | 空のシーケンスにはマッチしないようにする。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_continuous` | シーケンスの先�にマッチするかどうかだけを調べる。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `match_prev_avail` | シーケンスの先�の一文�前(`--first`)が有効な位置であることを示す。このフラグが�定されると、`match_not_bol`と`match_not_bow`は無視される。このオブジェクトのビットマスク値は未規定。 | C++11 |
| `format_default` | ECMAScript形式のルールで置換を行う。 | C++11 |
| `format_sed` | POSIXユーティリティのsed形式のルールで置換を行う。 | C++11 |
| `format_no_copy` | 検索と置換の操作において、�規表現にマッチしない文�列を出力にコピーしない。 | C++11 |
| `format_first_only` | 検索と置換の操作において、最初にマッチしたもののみを扱う。 | C++11 |


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 1450. Contradiction in `regex_constants`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#1450)
    - `match_default`と`format_default`の2つがデフォルト値`0`を持っているが、同じ値を持つビットマスク値が複数含まれていることはビットマスク型の要件と矛盾しているため、C++14でビットマスク型の要件を見なおした。
- [LWG Issue 2053. Errors in regex bitmask types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2053)
    - 定数定義に不要な`static`が付いていたため、C++14で削除

