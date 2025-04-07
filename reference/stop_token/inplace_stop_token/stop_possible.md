# stop_possible
* stop_token[meta header]
* function[meta id-type]
* std[meta namespace]
* inplace_stop_token[meta class]
* cpp26[meta cpp]

```cpp
bool stop_possible() const noexcept;
```

## 概要
停止要求が作成されうるかどうかを返す。


## 効果
自身が[`inplace_stop_source`](../inplace_stop_source.md)を参照する場合に、`true`を返す。
そうでなければ、`false`を返す。


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
