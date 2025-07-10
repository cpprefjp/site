# semantic
* contracts[meta header]
* std::contracts[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]
* contract_violation[meta class]

```cpp
evaluation_semantic semantic() const noexcept;
```

## 概要
契約の評価方法を返す。

## 戻り値
契約の評価方法を表す`evaluation_semantic`型

## 例外
投げない

## バージョン
- C++26

## 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [Contracts for C++](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf)
