# request_stop
* stop_token[meta header]
* function[meta id-type]
* std[meta namespace]
* inplace_stop_source[meta class]
* cpp26[meta cpp]

```cpp
bool request_stop() noexcept;
```

## 概要
自身が所有している停止状態に対して停止要求を作成する。


## 効果
[停止要求操作](../stoppable-source.md)を実行する。


## 事後条件
[`stop_requested()`](stop_requested.md) `== true`


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
