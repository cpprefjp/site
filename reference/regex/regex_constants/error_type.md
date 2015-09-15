#error_type (C++11)
* regex[meta header]
* std::regex_constants[meta namespace]
* enum[meta id-type]

```cpp
namespace std {
namespace regex_constants {
  typedef implementation-defined error_type;
  constexpr error_type error_collate = unspecified;
  constexpr error_type error_ctype = unspecified;
  constexpr error_type error_escape = unspecified;
  constexpr error_type error_backref = unspecified;
  constexpr error_type error_brack = unspecified;
  constexpr error_type error_paren = unspecified;
  constexpr error_type error_brace = unspecified;
  constexpr error_type error_badbrace = unspecified;
  constexpr error_type error_range = unspecified;
  constexpr error_type error_space = unspecified;
  constexpr error_type error_badrepeat = unspecified;
  constexpr error_type error_complexity = unspecified;
  constexpr error_type error_stack = unspecified;
}}
```
* implementation-defined[italic]
* unspecified[italic]

##概要
正規表現のエラーを表す実装定義の列挙型。


| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `error_collate` | 式に、不正な照合要素名が含まれている | C++11 |
| `error_ctype`   | 式に、不正な文字クラス名が含まれている | C++11 |
| `error_escape`  | 式に、不正なエスケープ文字もしくは不正な後方エスケープ(trailing escape)が含まれている | C++11 |
| `error_backref` | 式に、不正な後方参照が含まれている。backrefはback reference(後方参照)の略称 | C++11 |
| `error_brack`   | 式に、対応していない角カッコ`[ ]`が含まれている。brackはbracket(角カッコ)の略称 | C++11 |
| `error_paren`   | 式に、対応していない丸カッコ`( )`が含まれている | C++11 |
| `error_brace`   | 式に、対応していない波カッコ`{ }`が含まれている | C++11 |
| `error_badbrace` | 式に、不正な範囲が設定された波カッコ`{ }`が含まれている | C++11 |
| `error_range` | 式に、不正な文字範囲が含まれている。多くのエンコーディングでは、`[b-a]`のようなものが不正な文字範囲となる。 | C++11 |
| `error_space` | メモリ不足のため、式を有限状態マシンに変換できない | C++11 |
| `error_badrepeat` | 有効な正規表現において、繰り返し`*?+{`が処理されなかった | C++11 |
| `error_complexity` | 式の複雑さが、事前に設定したレベルを超えている | C++11 |
| `error_stack` | メモリ不足のため、正規表現が指定されたシーケンスにマッチするかどうかを判断できない | C++11 |


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [LWG Issue 2053. Errors in regex bitmask types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2053)
    - 定数定義に不要な`static`が付いていたため、C++14で削除

