# syntax_option_type
* regex[meta header]
* std::regex_constants[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace regex_constants {
  using syntax_option_type = implementation-defined;

  // C++11
  constexpr syntax_option_type icase = unspecified;
  constexpr syntax_option_type nosubs = unspecified;
  constexpr syntax_option_type optimize = unspecified;
  constexpr syntax_option_type collate = unspecified;
  constexpr syntax_option_type ECMAScript = unspecified;
  constexpr syntax_option_type basic = unspecified;
  constexpr syntax_option_type extended = unspecified;
  constexpr syntax_option_type awk = unspecified;
  constexpr syntax_option_type grep = unspecified;
  constexpr syntax_option_type egrep = unspecified;

  //C++17
  inline constexpr syntax_option_type icase = unspecified;
  inline constexpr syntax_option_type nosubs = unspecified;
  inline constexpr syntax_option_type optimize = unspecified;
  inline constexpr syntax_option_type collate = unspecified;
  inline constexpr syntax_option_type ECMAScript = unspecified;
  inline constexpr syntax_option_type basic = unspecified;
  inline constexpr syntax_option_type extended = unspecified;
  inline constexpr syntax_option_type awk = unspecified;
  inline constexpr syntax_option_type grep = unspecified;
  inline constexpr syntax_option_type egrep = unspecified;
  inline constexpr syntax_option_type multiline = unspecified;
}}
```
* unspecified[italic]

## 概要
構文オプションを表す実装定義のビットマスク型。


| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `icase`      | �規表現のマッチで大文�小文�を区別しないことを指定する。 | C++11 |
| `nosubs`     | �規表現のマッチ成功時に、渡された[`match_results`](/reference/regex/match_results.md)オブジェクトへの参照に、部分式のマッチ情報を格納しないことを指定する | C++11 |
| `optimize`   | �規表現エンジンに、�規表現オブジェクトの構築速度よりもマッチ速度に注意を払うべきであることを指定する。 | C++11 |
| `collate`    | \[a-b\]形式の文�範囲が�ケールを考慮することを指定する | C++11 |
| `ECMAScript` | ECMA-262仕様第 3 版のECMAScript言語で使用されている�規表現と同じ構文を使用する | C++11 |
| `basic`      | POSIX基本�規表現と同じ構文を使用する | C++11 |
| `extended`   | POSIX拡張�規表現と同じ構文を使用する | C++11 |
| `awk`        | POSIXユーティリティのawkと同じ構文を使用する | C++11 |
| `grep`       | POSIXユーティリティのgrepと同じ構文を使用する | C++11 |
| `egrep`      | POSIXユーティリティのgrepに`-E`オプションを指定した場合と同じ構文を使用する | C++11 |
| `multiline`  | 複数行モードを有効にする。このオプションはECMAScript構文でのみ使用できる。このオプションを有効にした場合、行�マッチの`^`が先�行の行�にマッチし、行末マッチの`$`が最終行の行末にマッチするようになる | C++17 |


## 備考
`syntax_option_type` の有効な値には、`ECMAScript`、`basic`、`extended`、`awk`、`grep`、`egrep` は 2 つ以上含んではならない。  
いずれの値も含まれていない場合、構文は `ECMAScript` となる。  
なお、C++11 では「いずれか 1 つを必ず含んでいる必要がある」となっていたが、それだと例えば [`regex`](../basic_regex.md)`("meow", regex::icase)` のような指定が許されなくなってしまうため、規格の誤りとして C++14 で修�された。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2053. Errors in regex bitmask types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2053)
    - 定数定義に不要な`static`が付いていたため、C++14で削除
- [LWG Issue 2330. regex("meow", regex::icase) is technically forbidden but should be permitted](http://cplusplus.github.io/LWG/lwg-defects.html#2330)
    - [`regex`](../basic_regex.md)`("meow", regex::icase)` のような指定を許可する
- [LWG Issue 2503. `multiline` option should be added to `syntax_option_type`](https://wg21.cmeerw.net/lwg/issue2503)
    - C++17で`multiline`オプションを追加
