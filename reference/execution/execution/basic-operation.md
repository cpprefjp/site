# basic-operation
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, class Rcvr>
    requires valid-specialization<state-type, Sndr, Rcvr> &&
             valid-specialization<connect-all-result, Sndr, Rcvr>
  struct basic-operation : basic-state<Sndr, Rcvr> {  // exposition only
    using operation_state_concept = operation_state_t;
    using tag-t = tag_of_t<Sndr>;                     // exposition only

    connect-all-result<Sndr, Rcvr> inner-ops;         // exposition only

    basic-operation(Sndr&& sndr, Rcvr&& rcvr) noexcept(see below)  // exposition only
      : basic-state<Sndr, Rcvr>(std::forward<Sndr>(sndr), std::move(rcvr)),
        inner-ops(connect-all(this, std::forward<Sndr>(sndr), indices-for<Sndr>()))
    {}

    void start() & noexcept {
      auto& [...ops] = inner-ops;
      impls-for<tag-t>::start(this->state, this->rcvr, ops...);
    }
  };

  template<class Sndr, class Rcvr>
  struct basic-state {             // exposition only
    basic-state(Sndr&& sndr, Rcvr&& rcvr) noexcept(see below)
      : rcvr(std::move(rcvr))
      , state(impls-for<tag_of_t<Sndr>>::get-state(std::forward<Sndr>(sndr), rcvr)) { }

    Rcvr rcvr;                     // exposition only
    state-type<Sndr, Rcvr> state;  // exposition only
  };
}
```
* operation_state_t[link operation_state.md]
* tag_of_t[link tag_of_t.md]
* impls-for[link impls-for.md]
* std::move[link /reference/utility/move.md]
* see below[italic]

## 概要
`basic-operation`および`basic-state`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のクラステンプレートである。

`basic-operation<Sndr, Rcvr>`は[`operation_state`](operation_state.md)のモデルであり、[Senderアルゴリズム](basic-sender.md)と[Recevier](receiver.md)の[接続(connect)](connect.md)結果型として利用される。

- `rcvr` : 接続先Receiverオブジェクトを保持。Senderアルゴリズム同士を連結する場合は、親Senderアルゴリズム側の[Receiver](receiver.md)が該当する。
- `state` : Senderアルゴリズム構築時の引数リストを保持。（[`impls-for`](impls-for.md)でカスタマイズ可能）
- `inner-ops` : 子SenderリストとSenderアルゴリズムとの接続結果[Operation State](operation_state.md)リストを保持。Senderファクトリでは0個、Senderアダプタでは通常1個の子Senderと接続される。


## クラス仕様
`basic-operation`コンストラクタ`noexcept`節の式は下記の通り。

```cpp
is_nothrow_constructible_v<basic-state<Self, Rcvr>, Self, Rcvr> &&
noexcept(connect-all(this, std::forward<Sndr>(sndr), indices-for<Sndr>()))
```
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]

`basic-state`コンストラクタ`noexcept`節の式は下記の通り。

```cpp
is_nothrow_move_constructible_v<Rcvr> &&
nothrow-callable<decltype(impls-for<tag_of_t<Sndr>>::get-state), Sndr, Rcvr&> &&
(same_as<state-type<Sndr, Rcvr>, get-state-result> ||
 is_nothrow_constructible_v<state-type<Sndr, Rcvr>, get-state-result>)
```
* impls-for[link impls-for.md]
* tag_of_t[link tag_of_t.md]
* nothrow-callable[link /reference/functional/nothrow-callable.md.nolink]
* is_nothrow_move_constructible_v[link /reference/type_traits/is_nothrow_move_constructible.md]
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]

ここで、説明用の型`get-state-result`は下記の通り定義される。

```cpp
call-result-t<decltype(impls-for<tag_of_t<Sndr>>::get-state), Sndr, Rcvr&>.
```
* impls-for[link impls-for.md]
* tag_of_t[link tag_of_t.md]


## 説明専用エンティティ

```cpp
template<template<class...> class T, class... Args>
concept valid-specialization =  // exposition only
  requires { typename T<Args...>; };

template<class Sndr, class Rcvr>  // exposition only
using state-type = decay_t<call-result-t<
  decltype(impls-for<tag_of_t<Sndr>>::get-state), Sndr, Rcvr&>>;

constexpr auto connect-all = see below;  // exposition only

template<class Sndr, class Rcvr>
using connect-all-result = call-result-t<  // exposition only
  decltype(connect-all), basic-state<Sndr, Rcvr>*, Sndr, indices-for<Sndr>>;

template<class Sndr>
using indices-for = remove_reference_t<Sndr>::indices-for;  // exposition only 
```
* call-result-t[link call-result-t.md.nolink]
* impls-for[link impls-for.md]
* tag_of_t[link tag_of_t.md]
* decay_t[link /reference/type_traits/decay.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* see below[italic]

説明専用の定数`connect-all`は、下記ラムダ式と等価な関数呼び出し可能なオブジェクトとして初期化される。

- 全ての子Sender`child`とSenderアルゴリズム`sndr`の[Receiver](basic-receiver.md)を[接続(connect)](connect.md)し、結果の[Operation State](operation_state.md)リストを[`product-type`](product-type.md)型にまとめて返す。

```cpp
[]<class Sndr, class Rcvr, size_t... Is>(
  basic-state<Sndr, Rcvr>* op, Sndr&& sndr, index_sequence<Is...>) noexcept(see below)
    -> decltype(auto) {
    auto& [_, data, ...child] = sndr;
    return product-type{connect(
      std::forward_like<Sndr>(child),
      basic-receiver<Sndr, Rcvr, integral_constant<size_t, Is>>{op})...};
  }
```
* index_sequence[link /reference/utility/index_sequence.md]
* product-type[link product-type.md]
* connect[link connect.md]
* basic-receiver[link basic-receiver.md]
* integral_constant[link /reference/type_traits/integral_constant.md]
* see below[italic]

- テンプレートパラメータ制約 : ラムダ式中の`return`文の式が適格であること。
- ラムダ式中の`return`文の式が例外送出する可能性がある場合は、`noexcept(false)`となる。そうでなければ、`noexcept(true)`となる。


## バージョン
### 言語
- C++26


## 関連項目
- [`basic-sender`](basic-sender.md)
- [`basic-receiver`](basic-receiver.md)
- [`execution::operation_state`](operation_state.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
