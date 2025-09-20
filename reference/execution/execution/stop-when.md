# stop-when
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  inline constexpr unspecified stop-when{};
}
```
* unspecified[italic]

# 概要
`stop-when`は、入力[Sender](sender.md)に追加の[停止トークン](/reference/stop_token/stop_token.md)を結合したSenderを返す、説明専用のSenderアダプタである。

説明用の式`sndr`と`token`に対して、

- `decltype((sndr))`が[`sender`](sender.md)を満たさない、もしくは[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype((token))>`が[`stoppable_token`](/reference/stop_token/stoppable_token.md)を満たさないとき、式`stop-token(sndr, token)`は不適格となる。
- そうでなく、[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype((token))>`が[`unstoppable_token`](/reference/stop_token/unstoppable_token.md)のモデルであるとき、式`stop-token(sndr, token)`は`sndr`と等価となる。
- そうでないとき、式`stop-token(sndr, token)`はSender`osndr`を返す。`osndr`が[Receiver](receiver.md)`r`と[接続(connect)](connect.md)されるとき、[`get_stop_token`](../get_stop_token.md)`(`[`get_env`](get_env.md)`(r))`の結果を`rtoken`とする。
    - `rtoken`の型が[`unstoppable_token`](/reference/stop_token/unstoppable_token.md)のモデルであるとき、`osdnr`と`r`との接続の効果は[`connect`](connect.md)`(`[`write_env`](write_env.md)`(sndr,` [`prop`](prop.md)`(`[`get_stop_token`](../get_stop_token.md)`, token)), r)`に等しい。
    - そうでないとき、下記のような説明専用の型`stoken-t`の`stoken`オブジェクトに対して、`osdnr`と`r`との接続の効果は[`connect`](connect.md)`(`[`write_env`](write_env.md)`(sndr,` [`prop`](prop.md)`(`[`get_stop_token`](../get_stop_token.md)`, stoken)), r)`に等しい。
        - `stoken-t`は[`stoppable_token`](/reference/stop_token/stoppable_token.md)のモデルである。
        - `stoken.stop_requested()`は`token.stop_requested() || rtoken.stop_requested()`を返す。
        - `stoken.stop_possible()`は`token.stop_possible() || rtoken.stop_possible()`を返す。
        - 説明用の型`Fn`と`Init`が[`invocable`](/reference/concepts/invocable.md)`<Fn>`および[`constructible_from`](/reference/concepts/constructible_from.md)`<Fn, Init>`のモデルであるとき、`stoken-t::callback_type<Fn>`は[`stoppable-callback-for`](/reference/stop_token/stoppable_token.md)のモデルである。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::spawn_future`](spawn_future.md.nolink)
- [`execution::counting_scope::token::wrap`](counting_scope/token/wrap.md)


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
