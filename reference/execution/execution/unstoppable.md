# unstoppable
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  inline constexpr unspecified unstoppable{};
}
```
* unspecified[italic]

## 概要
`unstoppable`は、[`get_stop_token`](../get_stop_token.md)クエリオブジェクトが[`never_stop_token`](/reference/stop_token/never_stop_token.md)を返すよう書き換えて、内側[Sender](sender.md)と外側[Receiver](receiver.md)の[環境](../queryable.md)を接続するSenderアダプタである。


## 効果
説明用の式`sndr`に対して、呼び出し式`unstoppable(sndr)`は式[`write_env`](write_env.md)`(sndr,` [`prop`](prop.md)`(`[`get_stop_token`](../get_stop_token.md)`,` [`never_stop_token{}`](/reference/stop_token/never_stop_token.md)`))`と等価。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::write_env`](write_env.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3284R4 `write_env` and `unstoppable` Sender Adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3284r4.html)
