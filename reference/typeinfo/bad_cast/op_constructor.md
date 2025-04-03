# コンストラクタ
* typeinfo[meta header]
* std[meta namespace]
* bad_cast[meta class]
* function[meta id-type]

```cpp
bad_cast();                    // (1) C++03
bad_cast() noexcept;           // (1) C++11
constexpr bad_cast() noexcept; // (1) C++26

bad_cast(const bad_cast&);                    // (2) C++03
bad_cast(const bad_cast&) noexcept;           // (2) C++11
constexpr bad_cast(const bad_cast&) noexcept; // (2) C++26
```

## 概要
`bad_cast`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ
- (2) : コピーコンストラクタ


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)

