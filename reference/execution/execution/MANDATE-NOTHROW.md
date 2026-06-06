# MANDATE-NOTHROW
* [meta exposition-only]
* execution[meta header]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
MANDATE-NOTHROW(expr)
```

## 概要
部分式`expr`に対して、説明専用の式`MANDATE-NOTHROW(expr)`は`expr`と等価な式となる。
`noexcept(expr)`が`true`であることを要求する。


## バージョン
### 言語
- C++26

## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
