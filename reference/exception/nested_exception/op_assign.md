# operator=
* exception[meta header]
* std[meta namespace]
* nested_exception[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
nested_exception& operator=(const nested_exception&) noexcept = default; // (1) C++11
```

## 概要
`nested_exception`オブジェクトを代入する

- (1) : コピー代入


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [P3842R2 A conservative fix for constexpr `uncaught_exceptions()` and `current_exception()`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3842r2.pdf)
    - C++26の策定中に`constexpr`が追加されたが、本提案文書により巻き戻された (C++29で再検討予定)
