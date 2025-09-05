# get_await_completion_adaptor
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct get_await_completion_adaptor_t { unspecified };
  inline constexpr get_await_completion_adaptor_t get_await_completion_adaptor{};
}
```
* unspecified[italic]

## 概要
`get_await_completion_adaptor`は、関連付けられたAwaitable完了アダプタを問い合わせる[クエリオブジェクト](../queryable.md)である。

コア定数式[`forwarding_query`](../forwarding_query.md)`(get_await_completion_adaptor)`は`true`値を返す。


## 効果
呼び出し式`get_await_completion_adaptor(env)`は下記と等価。

- 引数`env`がconst修飾された`cenv`を用いて、式`cenv.query(get_await_completion_adaptor)`


## 例外
投げない


## カスタマイゼーションポイント
const修飾[クエリ可能オブジェクト](../queryable.md)`cenv`に対して式`cenv.query(get_await_completion_adaptor)`が呼び出される。
このとき、`noexcept(cenv.query(get_await_completion_adaptor)) == true`であること。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::as_awaitable`](as_awaitable.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3570R2 optional variants in sender/receiver](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3570r2.html)
