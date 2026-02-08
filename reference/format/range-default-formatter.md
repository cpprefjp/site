# range-default-formatter
* [meta exposition-only]
* format[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template <range_format K, ranges::input_range R, class charT>
  struct range-default-formatter;      // (1) C++23

  template <ranges::input_range R, class charT>
  struct range-default-formatter<
    range_format::sequence, R, charT>; // (2) C++23

  template <ranges::input_range R, class charT>
  struct range-default-formatter<
    range_format::map, R, charT>;      // (3) C++23

  template <ranges::input_range R, class charT>
  struct range-default-formatter<
    range_format::set, R, charT>;      // (4) C++23

  template <range_format K, ranges::input_range R, class charT>
    requires (K == range_format::string || K == range_format::debug_string)
  struct range-default-formatter<
    K, R, charT>;                      // (5) C++23
}
```
* range_format[link range_format.md]
* ranges::input_range[link /reference/ranges/input_range.md]

## 概要
`range-default-formatter`は、Range・コンテナに対するデフォルトの書式解析と書式文字列化を行う説明専用クラスである。

このクラスは、[`formatter`](formatter.md)クラスのRange・コンテナに対する特殊化実装として標準ライブラリの内部で使用される。

このクラスの内部実装として[`range_formatter`](range_formatter.md)が使用される。


- (1) : プライマリテンプレート。宣言のみ
- (2) : Range・シーケンスコンテナに対する特殊化。デバッグ出力の有効化と、`[a, b, c]`形式の出力を行う
- (3) : [`std::map`](/reference/map/map.md)や[`std::flat_map`](/reference/flat_map/flat_map.md)などの連想コンテナに対する特殊化。デバッグ出力の有効化と、`{1: a, 2: b}`形式での出力を行う
- (4) : [`std::set`](/reference/set/set.md)や[`std::flat_set`](/reference/flat_set/flat_set.md)などの集合コンテナに対する特殊化。デバッグ出力の有効化と、`{a, b, c}`形式の出力を行う
- (5) : 文字列形式の出力を行うRangeに対する特殊化。Rangeを文字列として出力し、[`range_format::debug_string`](range_format.md)指定であればデバッグ文字列として出力する


## 備考
- (5) : この特殊化は規格上、標準ライブラリ内では使用されないが ([`formatter`](formatter.md)`<`[`string`](/reference/string/basic_string.md)`, charT>`がすでにある)、以下のような用途が考えられる
    - ユーザー定義の文字列クラスを定義する場合に、[`format_kind`](format_kind.md)で値として[`range_format::string`](range_format.md)もしくは[`range_format::debug_string`](range_format.md)をもつよう特殊化するか ([`formatter`](formatter.md)`<`[`string`](/reference/string/basic_string.md)`, charT>`をラップする方がかんたんではある)
    - [`std::vector<char>`](/reference/vector/vector.md)のような文字を要素とするシーケンスコンテナで、文字列形式で出力する書式オプション ([`s`や`?s`](format.md#range-format-options)) を指定した際に`range-default-formatter<range_format::sequence, R, charT>`の内部で使用される


## メンバ関数

| メンバ関数 | 説明 | 対応バージョン |
|------------|------|----------------|
| `parse`    | 書式の解析を行う | C++23 |
| `format`   | 書式化を行う | C++23 |


### sequenceに対する特殊化

| メンバ関数 | 説明 | 対応バージョン |
|------------|------|----------------|
| `constexpr void set_separator(basic_string_view<charT> sep);` | 要素の区切り文字を設定する | C++23 |
| `constexpr void set_brackets(basic_string_view<charT> opening, basic_string_view<charT> closing);` | 全体の囲み文字を設定する | C++23 |


### mapに対する特殊化

| メンバ関数 | 説明 | 対応バージョン |
|------------|------|----------------|
| `constexpr range-default-formatter();` | 全体の囲み文字を`{}`、要素の囲み文字を空、要素同士の区切り文字を`": "`に設定する | C++23 |

### setに対する特殊化

| メンバ関数 | 説明 | 対応バージョン |
|------------|------|----------------|
| `constexpr range-default-formatter();` | 全体の囲み文字を`{}`に設定する | C++23 |


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2286R8 Formatting Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2286r8.html)
- [P2585R1 Improve default container formatting](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2585r1.html)
    - C++23から、Range・コンテナ、`pair`、`tuple`のフォーマット出力、および文字・文字列のデバッグ指定 (`"?"`) が追加された
- [P3391R2 `constexpr std::format`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3391r2.html)
    - C++26から`constexpr`に対応した