# operator=
* exception[meta header]
* std[meta namespace]
* exception[meta class]
* function[meta id-type]

```cpp
exception& operator=(const exception&);                    // (1) C++03
exception& operator=(const exception&) noexcept;           // (1) C++11
constexpr exception& operator=(const exception&) noexcept; // (1) C++26
```

## 概要
`exception`オブジェクトを代入する

- (1) : コピー代入


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)
