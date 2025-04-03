# コンストラクタ
* format[meta header]
* std[meta namespace]
* format_error[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
explicit format_error(const string& what_arg);           // (1) C++20
constexpr explicit format_error(const string& what_arg); // (1) C++26

explicit format_error(const char* what_arg);           // (2) C++20
constexpr explicit format_error(const char* what_arg); // (2) C++26
```

## 概要
`format_error`オブジェクトを構築する。

- (1) : `std::string`オブジェクトでエラー理由を受け取る
- (2) : `const char*`でエラー理由を受け取る


## 事後条件

- (1) : `strcmp(what(), what_arg.c_str()) == 0`
- (2) : `strcmp(what(), what_arg) == 0`


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [P3378R2 `constexpr` exception types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3378r2.html)
    - C++26で`constexpr`対応した
