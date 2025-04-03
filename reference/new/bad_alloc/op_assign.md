# operator=
* new[meta header]
* std[meta namespace]
* bad_alloc[meta class]
* function[meta id-type]

```cpp
bad_alloc& operator=(const bad_alloc&);                    // (1) C++03
bad_alloc& operator=(const bad_alloc&) noexcept;           // (1) C++11
constexpr bad_alloc& operator=(const bad_alloc&) noexcept; // (1) C++26
```

## 概要
`bad_alloc`オブジェクトを代入する

- (1) : コピー代入


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)

