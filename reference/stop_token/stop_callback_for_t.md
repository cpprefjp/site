# stop_callback_for_t
* stop_token[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class T, class CallbackFn>
  using stop_callback_for_t = T::template callback_type<CallbackFn>;
}
```

## 概要

型`T`に対応する`CallbackFn`型のコールバック型を取得する。


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
