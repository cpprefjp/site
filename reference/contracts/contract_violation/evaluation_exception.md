# evaluation_exception
* contracts[meta header]
* std::contracts[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]
* contract_violation[meta class]

```cpp
exception_ptr evaluation_exception() const noexcept;
```

## 概要
契約の判定時に例外が投げられた場合、その例外へのポインタを返す。

例外が飛ばなければ、空の`std::exception_ptr`を返す。

## 戻り値
契約の判定時に例外が投げられた場合、その例外へのポインタを返す。

例外が飛ばなければ、空の`std::exception_ptr`を返す。

## 例外
投げない

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [Contracts for C++](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf)
