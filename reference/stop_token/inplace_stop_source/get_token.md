# get_token
* stop_token[meta header]
* function[meta id-type]
* std[meta namespace]
* inplace_stop_source[meta class]
* cpp26[meta cpp]

```cpp
constexpr inplace_stop_token get_token() const noexcept;
```
* inplace_stop_token[link ../inplace_stop_token.md.nolink]

## 概要
自身と停止状態を共有する[`inplace_stop_token`](../inplace_stop_token.md.nolink)を返す。


## 戻り値
自身が所有する停止状態に関連付けられた[`inplace_stop_token`](../inplace_stop_token.md.nolink)を返す。


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
