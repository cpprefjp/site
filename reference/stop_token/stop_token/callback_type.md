# callback_type
* stop_token[meta header]
* std[meta namespace]
* stop_token[meta class]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
template<class CallbackFn>
using callback_type = stop_callback<CallbackFn>;
```
* stop_callback[link ../stop_callback.md]

## 概要
`stop_token`に対応するコールバック型。


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
