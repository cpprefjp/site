# get_stop_token
* execution[meta header]
* cpo[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  struct get_stop_token_t { unspecified };
  constexpr get_stop_token_t get_stop_token{};
}
```
* unspecified[italic]

## 概要
`get_stop_token`は、[クエリ可能オブジェクト](queryable.md)から[停止トークン](/reference/stop_token/stoppable_token.md)を取得する[クエリオブジェクト](queryable.md)である。

コア定数式[`forwarding_query`](forwarding_query.md.nolink)`(get_stop_token)`は`true`値を返す。


## 効果
呼び出し式`get_stop_token(env)`は下記と等価であり、[`stoppable_token`](/reference/stop_token/stoppable_token.md)を満たす型の値となる。

- 引数`env`がconst修飾された`cenv`を用いて、式`cenv.query(get_stop_token)`が適格であればその値。
- そうでなければ、[`never_stop_token{}`](/reference/stop_token/never_stop_token.md)


## 例外
投げない


## カスタマイゼーションポイント
const修飾[クエリ可能オブジェクト](queryable.md)`cenv`に対して式`cenv.query(get_stop_token)`が呼び出される。
このとき、`noexcept(cenv.query(get_stop_token)) == true`であること。


## 例
```cpp
#include <concepts>
#include <stop_token>
#include <execution>
namespace ex = std::execution;

int main()
{
  // just Senderは停止トークンを持たない
  ex::sender auto sndr = ex::just(42);
  auto token = std::get_stop_token(ex::get_env(sndr));
  static_assert(std::same_as<decltype(token), std::never_stop_token>);
}
```
* std::get_stop_token[color ff0000]
* ex::sender[link execution/sender.md]
* ex::just[link execution/just.md.nolink]
* ex::get_env[link execution/get_env.md]
* std::never_stop_token[link /reference/stop_token/never_stop_token.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`stoppable_token`](/reference/stop_token/stoppable_token.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
