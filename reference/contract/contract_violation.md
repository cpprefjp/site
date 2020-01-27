# contract_violation
* contract[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  class contract_violation {
  public:
    uint_least32_t line_number() const noexcept;
    string_view file_name() const noexcept;
    string_view function_name() const noexcept;
    string_view comment() const noexcept;
    string_view assertion_level() const noexcept;
  };
}
```

## 概要

`contract_violation`クラスは、発生した[契約違反](/lang/cpp23/contract-based_programming.md)に関する情報を提供する。

契約違反が発生したとき、このクラスのオブジェクトが処理系定義の方法により構築され、違反ハンドラーに渡される。

違反ハンドラーは`void(const std::contract_violation&) noexcept`または`void(const std::contract_violation&)`の型を持つ関数であり、
処理系定義の方法によって指定される。

## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`line_number`](contract_violation/line_number.md.nolink)     | 契約違反が発生したソースコード上の行番号    | C++23 |
| [`file_name`](contract_violation/file_name.md.nolink)       | 契約違反が発生したソースコードのファイル名  | C++23 |
| [`function_name`](contract_violation/function_name.md.nolink)   | 契約違反が発生した関数の名前                    | C++23 |
| [`comment`](contract_violation/comment.md.nolink)         | 契約違反の原因となった述語を説明する処理系定義のテ�スト  | C++23 |
| [`assertion_level`](contract_violation/assertion_level.md.nolink) | 違反した契約のアサーションレベル             | C++23 |


## 例
(執��)

### 出力
(執��)

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 未実装
- [GCC](/implementation.md#gcc): 未実装
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 未実装

## 関連項目
- [契約に基づくプ�グラミング](/lang/cpp23/contract-based_programming.md)

## 参照
- [P0542R5 Support for contract based programming in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0542r5.html)
- [P0788R3 Standard Library Specification in a Concepts and Contracts World](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0788r3.pdf)
