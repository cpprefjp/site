# operator=
* exception[meta header]
* std[meta namespace]
* bad_exception[meta class]
* function[meta id-type]

```cpp
bad_exception& operator=(const bad_exception&);                    // (1) C++03
bad_exception& operator=(const bad_exception&) noexcept;           // (1) C++11
constexpr bad_exception& operator=(const bad_exception&) noexcept; // (1) C++26
```

## 概要
`bad_exception`オブジェクトを代入する

- (1) : コピー代入


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)

