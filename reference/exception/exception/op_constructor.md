# コンストラクタ
* exception[meta header]
* std[meta namespace]
* exception[meta class]
* function[meta id-type]

```cpp
exception();                    // (1) C++03
exception() noexcept;           // (1) C++11
constexpr exception() noexcept; // (1) C++26

exception(const exception&);                    // (2) C++03
exception(const exception&) noexcept;           // (2) C++11
constexpr exception(const exception&) noexcept; // (2) C++26
```

## 概要
`exception`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ
- (2) : コピーコンストラクタ


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)
