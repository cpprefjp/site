# basic-sender
* [meta exposition-only]
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

    template<decays-to<basic-sender> Self, class... Env>
    static constexpr auto get_completion_signatures();
  };
}
```
* product-type[link product-type.md]
* sender_t[link sender.md]
* index_sequence_for[link /reference/utility/index_sequence_for.md]
* impls-for[link impls-for.md]
* decays-to[link ../decays-to.md]
* receiver[link receiver.md]
* basic-operation[link basic-operation.md]
* std::move[link /reference/utility/move.md]
* this Self[link /lang/cpp23/deducing_this.md.nolink]

## 概要
`basic-sender`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のクラステンプレートである。

`basic-sender<Tag, Data, Child...>`は[`sender`](sender.md)のモデルであり、[Senderアルゴリズム構築](make-sender.md)の結果型として利用される。

- `Tag` : [Senderアルゴリズムタグ](tag_of_t.md)（例：[`just`](just.md), [`then`](then.md)）
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

### `get_completion_signatures`メンバ関数
```cpp
template<class Tag, class Data, class... Child>
template<decays-to<basic-sender> Sndr, class... Env>
constexpr auto basic-sender<Tag, Data, Child...>::get_completion_signatures();
```
* decays-to[link ../decays-to.md]

型`E`をリスト`Env...,` [`env<>`](env.md)における先頭の型としたとき、[環境](../queryable.md)`E`をもつ[Receiver](receiver.md)型を`Rcvr`とする。式`CHECK-TYPE()`を[`impls-for`](impls-for.md)`<Tag>::template check-types<Sndr, E>()`とし、型`CS`を下記の通り定義する。

- `CHECK-TYPE()`がコア定数式のとき、`op`を[`connect_result_t`](connect_result_t.md)`<Sndr, Rcvr>`型の左辺値とする。`CS`は[`completion_signatures`](completion_signatures.md)の特殊化となり、そのテンプレート引数の集合は評価`op.`[`start()`](start.md)の結果結果として得られる完了操作の集合に対応する。
- そうでなければ、`CS`は[`completion_signatures<>`](completion_signatures.md)となる。

テンプレートパラメータ制約 : 式`CHECK-TYPES()`が適格であること。

効果：下記と等価。

```cpp
CHECK-TYPES();
return CS();
```


## 説明専用エンティティ
説明専用のエイリアステンプレート`indices-for`を下記の通り定義する。

```cpp
template<class Sndr>
using indices-for = remove_reference_t<Sndr>::indices-for;  // exposition only 
```


## バージョン
### 言語
- C++26


## 関連項目
- [`make-sender`](make-sender.md)
- [`impls-for`](impls-for.md)
- [`basic-operation`](basic-operation.md)
- [`execution::sender`](sender.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
- [LWG4455 Add missing constraint to `basic-sender::get_completion_signatures` definition](https://cplusplus.github.io/LWG/issue4455)
