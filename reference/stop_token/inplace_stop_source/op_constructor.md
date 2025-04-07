# コンストラクタ
* stop_token[meta header]
* function[meta id-type]
* std[meta namespace]
* inplace_stop_source[meta class]
* cpp26[meta cpp]

```cpp
constexpr inplace_stop_source() noexcept;
```

## 概要
デフォルトコンストラクタ。停止状態を表すリソースを新たに確保して所有する。


## 効果
`*this`内部に新しい停止状態を初期化する。


## 事後条件
[`stop_requested()`](stop_requested.md) `== false`


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
