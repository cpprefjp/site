# callback_type
* stop_token[meta header]
* std[meta namespace]
* inplace_stop_token[meta class]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
template<class CallbackFn>
using callback_type = inplace_stop_callback<CallbackFn>;
```
* inplace_stop_callback[link ../inplace_stop_callback.md.nolink]

## 概要
`inplace_stop_token`に対応するコールバック型。


## バージョン
### 言語
- C++26

### 処理系
- [GCC](/implementation.md#gcc): ??
- [Clang](/implementation.md#clang): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
