# basic_format_args
* format[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]
* format_args,wformat_args[meta alias]

```cpp
namespace std {
  template<class Context>
  class basic_format_args; // (1)

  using format_args = basic_format_args<format_context>; // (2)
  using wformat_args = basic_format_args<wformat_context>; // (3)
}
```
* format_context[link /reference/format/basic_format_context.md]
* wformat_context[link /reference/format/basic_format_context.md]

## 概要
フォーマット引数列を保持する型。[`vformat`](vformat.md)や[`vformat_to`](vformat_to.md)の引数で使用する。
この型のオブジェクトは、[`make_format_args`](make_format_args.md)の戻り値から構築する。

* (1): クラステンプレートの定義
* (2): マルチバイト文字列版の特殊化
* (3): ワイド文字列版の特殊化

## メンバ関数

| 名前                                                   | 説明                              | 対応バージョン |
|--------------------------------------------------------|-----------------------------------|----------------|
| [`(constructor)`](basic_format_args/op_constructor.md) | コンストラクタ                    | C++20          |
| [`get`](basic_format_args/get.md)                      | フォーマット引数へアクセスする    | C++20          |

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
