# what
* memory[meta header]
* std[meta namespace]
* bad_weak_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
virtual const char* what() const noexcept;            // (1) C++11
const char* what() const noexcept override;           // (1) C++17
constexpr const char* what() const noexcept override; // (1) C++26
```

## 概要
エラー理由となる実装依存文字列を取得する。


## 例外
投げない


## 参照
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)