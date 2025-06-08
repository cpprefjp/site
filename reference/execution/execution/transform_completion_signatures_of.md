# transform_completion_signatures_of
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<
    sender Sndr,
    class Env = env<>,
    valid-completion-signatures AdditionalSignatures = completion_signatures<>,
    template<class...> class SetValue = see below,
    template<class> class SetError = see below,
    valid-completion-signatures SetStopped = completion_signatures<set_stopped_t()>>
      requires sender_in<Sndr, Env>
  using transform_completion_signatures_of =
    transform_completion_signatures<
      completion_signatures_of_t<Sndr, Env>,
      AdditionalSignatures, SetValue, SetError, SetStopped>;
}
```
* sender[link sender.md]
* env<>[link env.md]
* valid-completion-signatures[link completion_signatures.md]
* completion_signatures[link completion_signatures.md]
* set_stopped_t()[link set_stopped.md]
* sender_in[link sender_in.md]
* transform_completion_signatures[link transform_completion_signatures.md]
* completion_signatures_of_t[link completion_signatures_of_t.md]
* see below[italic]

## 概要
[Sender型](sender.md)`Sndr`が[環境](../queryable.md)`Env`において非同期操作を作成できるとき、Senderの[完了シグネチャ集合](get_completion_signatures.md)から別の完了シグネチャ集合へ変換するエイリアステンプレート。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::get_completion_signatures`](get_completion_signatures.md)
- [`execution::transform_completion_signatures`](transform_completion_signatures.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
