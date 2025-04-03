# コンストラクタ
* typeinfo[meta header]
* std[meta namespace]
* bad_typeid[meta class]
* function[meta id-type]

```cpp
bad_typeid();                    // (1) C++03
bad_typeid() noexcept;           // (1) C++11
constexpr bad_typeid() noexcept; // (1) C++26

bad_typeid(const bad_typeid&);                    // (2) C++03
bad_typeid(const bad_typeid&) noexcept;           // (2) C++11
constexpr bad_typeid(const bad_typeid&) noexcept; // (2) C++26
```

## 概要
`bad_typeid`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ
- (2) : コピーコンストラクタ


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)

