# AS-CONST
* [meta exposition-only]
* execution[meta header]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
AS-CONST(expr)
```

## 概要
部分式`expr`に対して、説明専用の式`AS-CONST(expr)`は下記と等価な式となる。

```cpp
[](const auto& x) noexcept -> const auto& { return x; }(expr)
```


## バージョン
### 言語
- C++26

## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [LWG4175. `get_env()` specified in terms of `as_const()` but this doesn't work with rvalue senders](https://cplusplus.github.io/LWG/issue4175)
