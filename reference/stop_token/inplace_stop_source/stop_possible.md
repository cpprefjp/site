# stop_possible
* stop_token[meta header]
* function[meta id-type]
* std[meta namespace]
* inplace_stop_source[meta class]
* cpp26[meta cpp]

```cpp
static constexpr bool stop_possible() noexcept;
```

## 概要
停止要求を作成できるかどうかを返す。


## 戻り値
`true`


## 例外
投げない


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
