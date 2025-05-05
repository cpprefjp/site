# basic-sender
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Tag, class Data, class... Child>
  struct basic-sender : product-type<Tag, Data, Child...> {  // exposition only
    using sender_concept = sender_t;
    using indices-for = index_sequence_for<Child...>;        // exposition only

    decltype(auto) get_env() const noexcept {
      auto& [_, data, ...child] = *this;
      return impls-for<Tag>::get-attrs(data, child...);
    }

    template<decays-to<basic-sender> Self, receiver Rcvr>
    auto connect(this Self&& self, Rcvr rcvr) noexcept(see below)
      -> basic-operation<Self, Rcvr> {
      return {std::forward<Self>(self), std::move(rcvr)};
    }

    template<decays-to<basic-sender> Self, class Env>
    auto get_completion_signatures(this Self&& self, Env&& env) noexcept
      -> completion-signatures-for<Self, Env> {
      return {};
    }
  };
}
```
* product-type[link product-type.md]
* sender_t[link sender.md]
* index_sequence_for[link /reference/utility/index_sequence_for.md]
* impls-for[link impls-for.md]
* receiver[link receiver.md]
* basic-operation[link basic-operation.md]
* this Self[link /lang/cpp23/deducing_this.md.nolink]
* see below[italic]

## 概要
`basic-sender`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のクラステンプレートである。

`basic-sender<Tag, Data, Child...>`は[`sender`](sender.md)のモデルであり、[Senderアルゴリズム構築](make-sender.md)の結果型として利用される。

- `Tag` : [Senderアルゴリズムタグ](tag_of_t.md)（例：[`just`](just.md), [`then`](then.md.nolink)）
- `Data` : Senderアルゴリズムに指定された追加の引数。複数個の引数は[`product-type`](product-type.md)型を用いて単一値として保持する。
- `Child` : 子Senderのリスト。Senderファクトリでは0個、Senderアダプタでは通常1個の子Senderを保持する。


## クラス仕様
`basic-sender`の特殊化が集成体となるか否かは未規定である。
`basic-sender`型の式は[構造化束縛](/lang/cpp17/structured_bindings.md)における初期化子として利用できる。

`basic-sender::connect`メンバ関数`noexcept`節の式は下記の通り。

```cpp
is_nothrow_constructible_v<basic-operation<Self, Rcvr>, Self, Rcvr>
```
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]
* basic-operation[link basic-operation.md]

説明専用のエイリアステンプレート`completion-signatures-for`は、下記の通り定義される。

```cpp
template<class Sndr, class Env>
using completion-signatures-for = see below;  // exposition only
```
* see below[italic]

説明用の`sndr`を`decltype((sndr))`が`Sndr`型となる式、`rcvr`を[`sender_in`](sender_in.md)`<Sndr, Env> == true`となる[環境](../queryable.md)`Env`に関連付けられた[`Receiver`](receiver.md)とする。

`completion-signatures-for<Sndr, Env>`は[`completion_signatures`](completion_signatures.md)の特殊化であり、そのテンプレート引数は `sndr`と`rcvr`との[接続(connect)](connect.md)結果[Operation State](operation_state.md)を[開始(start)](start.md)して得られる可能性のある結果の完了シグネチャ集合となる。

[`sender_in`](sender_in.md)`<Sndr, Env> == false`となる場合、`completion-signatures-for<Sndr, Env>`は[`completion_signatures`](completion_signatures.md)の特殊化ではない別の型となる。
 処理系（標準ライブラリ実装者）は、この型を用いてユーザにエラー理由を通知することが推奨される。


## バージョン
### 言語
- C++26


## 関連項目
- [`make-sender`](make-sender.md)
- [`execution::sender`](sender.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
