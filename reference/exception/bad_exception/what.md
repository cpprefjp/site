# what
* exception[meta header]
* std[meta namespace]
* bad_exception[meta class]
* function[meta id-type]

```cpp
virtual const char* what() const;                     // (1) C++03
virtual const char* what() const noexcept;            // (1) C++11
const char* what() const noexcept override;           // (1) C++17
constexpr const char* what() const noexcept override; // (1) C++26
```

## 概要
エラー理由となる実装依存文字列を取得する。


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)
