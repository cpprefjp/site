# stoppable_token
* stop_token[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class Token>
  concept stoppable_token;
}
```

## 概要
`stoppable_token`は、型`Token`が停止トークンとしての基本的なインタフェースを提供することを表すコンセプトである。


## 要件
まず、説明専用クラステンプレート`check-type-alias-exists`を以下のように定義する。

```cpp
template<template<class> class>
struct check-type-alias-exists;
```

`stoppable_token`コンセプトは、以下のように定義される。

```cpp
template<class Token>
concept stoppable_token =
  requires (const Token tok) {
    typename check-type-alias-exists<Token::template callback_type>;
    { tok.stop_requested() } noexcept -> same_as<bool>;
    { tok.stop_possible() } noexcept -> same_as<bool>;
    { Token(tok) } noexcept;
  } &&
  copyable<Token> &&
  equality_comparable<Token> &&
  swappable<Token>;
```
* copyable[link /reference/concepts/copyable.md]
* swappable[link /reference/concepts/swappable.md]


## モデル

説明用の変数`t`, `u`を、同一の停止状態を参照する別々な`Token`型オブジェクトとする。
型`Token`が以下を満たす場合に限って、型`Token`は`stoppable_token`のモデルである。

- `SP`を`t.stop_possible()`が`false`となる評価としたとき、`SP`より後に発生する`u.stop_possible()`や`u.stop_requested()`の評価は`false`であること。
- `SR`を`t.stop_requested()`が`true`となる評価としたとき、`SR`より後に発生する`u.stop_possible()`や`u.stop_requested()`の評価は`true`であること。
- `stoppable-callback-for<CallbackFn, Token, Initialize>`を満たす任意の型`CallbackFn`および型`Initialize`が、`stoppable-callback-for<CallbackFn, Token, Initializer>`のモデルであること。
- `t`が停止状態を持たない(disengaged)とき、`t.stop_possible()`や`t.stop_requested()`の評価が`false`であること。
- `t`と`u`が同一の停止状態を参照するか共に停止状態を持たないとき`t == u`が`true`であり、それ以外のときは`false`であること。
- `request_stop`, `stop_requested`, `stop_possible`メンバ関数の呼び出しはデータ競合を引き起こさない。


ここで、説明専用コンセプト`stoppable-callback-for`を以下のように定義する。

```cpp
template<class CallbackFn, class Token, class Initializer = CallbackFn>
concept stoppable-callback-for =
  invocable<CallbackFn> &&
  constructible_from<CallbackFn, Initializer> &&
  requires { typename stop_callback_for_t<Token, CallbackFn>; } &&
  constructible_from<stop_callback_for_t<Token, CallbackFn>, const Token&, Initializer>;
```
* constructible_from[link /reference/concepts/constructible_from.md]
* stop_callback_for_t[link stop_callback_for_t.md]

説明用の`init`を[`same_as`](/reference/concepts/same_as.md)`<decltype(init), Initializer>`を満たす式、型`SCB`を[`stop_callback_for_t`](stop_callback_for_t.md)`<Token, CallbackFn>`とする。

`stoppable-callback-for<CallbackFn, Token, Initializer>`のモデルとなるには、下記を満たすこと。

- 次のコンセプトのモデルであること。
    - [`constructible_from`](/reference/concepts/constructible_from.md)`<SCB, Token, Initializer>`
    - [`constructible_from`](/reference/concepts/constructible_from.md)`<SCB, Token&, Initializer>`
    - [`constructible_from`](/reference/concepts/constructible_from.md)`<SCB, const Token, Initializer>`
- 説明用の`scb`を`SCB`型オブジェクト、`callback_fn`を`scb`に関連付けられた`CallbackFn`型のコールバック関数とする。引数`t`と`init`からの直接非リスト初期化`scb`は、次のように停止可能コールバック登録(stoppable callback registration)を実行すること。
    - `t.stop_possible() == true`のとき、
        - `callback_fn`が`init`で直接初期化される。
        - `scb`構築が送出する例外は、`init`からの`callback_fn`構築で送出された例外のみ。
        - コールバック呼び出し[`std::forward`](/reference/utility/forward.md)`<CallbackFn>(callback_fn)()`は、次のように`t`に関連する停止状態に登録されること。
            - 登録時点で`t.stop_requested()`が`false`に評価されるとき、コールバック呼び出しは停止状態のコールバックリストに追加され、停止状態に停止要求が行われたたときに[`std::forward`](/reference/utility/forward.md)`<CallbackFn>(callback_fn)()`が評価される。
            - そうでなければ、`scb`コンストラクタを実行したスレッド上で[`std::forward`](/reference/utility/forward.md)`<CallbackFn>(callback_fn)()`が即時実行され、コールバック呼び出しはリストに追加されない。
    - `t.stop_possible() == false`のとき、`callback_fn`の初期化による`scb`初期化には要求が課されない。
- `scb`の破棄は、次のように停止可能コールバック登録解除(stoppable callback deregistration)を実行すること。
    - `scb`コンストラクタが`t`の停止状態にコールバック呼び出しを登録していなければ、停止可能コールバック登録解除は`callback_fn`破棄以外の効果を持たない。
    - そうでなければ、関連する停止状態から`callback_fn`の呼び出しが除外されること。
    - `callback_fn`が別スレッド上で並行実行中の場合、当該`callback_fn`呼び出しから戻るまで停止可能コールバック登録解除はブロックされる。この`callback_fn`呼び出しからの戻りは`callback_fn`の破棄よりも確実に前に発生する。
    - `callback_fn`が現在のスレッド上で実行中の場合、デストラクタは`callback_fn`からの戻りを待機してブロックしてはいけない。
    - 停止可能コールバック登録解除は、同じ停止状態に登録された他のコールバック呼び出しの完了をブロックしてはいけない。
    - 停止可能コールバック登録解除は`callback_fn`を破棄すること。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`unstoppable_token`](unstoppable_token.md)
- [`stop_token`](stop_token.md)
- [`inplace_stop_token`](inplace_stop_token.md)
- [`never_stop_token`](never_stop_token.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
