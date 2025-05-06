# basic-receiver
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, class Rcvr, class Index>
    requires valid-specialization<env-type, Index, Sndr, Rcvr>
  struct basic-receiver {                    // exposition only
    using receiver_concept = receiver_t;

    using tag-t = tag_of_t<Sndr>;            // exposition only
    using state-t = state-type<Sndr, Rcvr>;  // exposition only
    static constexpr const auto& complete = impls-for<tag-t>::complete;   // exposition only

    template<class... Args>
      requires callable<decltype(complete), Index, state-t&, Rcvr&, set_value_t, Args...>
    void set_value(Args&&... args) && noexcept {
      complete(Index(), op->state, op->rcvr, set_value_t(), std::forward<Args>(args)...);
    }

    template<class Error>
      requires callable<decltype(complete), Index, state-t&, Rcvr&, set_error_t, Error>
    void set_error(Error&& err) && noexcept {
      complete(Index(), op->state, op->rcvr, set_error_t(), std::forward<Error>(err));
    }

    void set_stopped() && noexcept
      requires callable<decltype(complete), Index, state-t&, Rcvr&, set_stopped_t> {
      complete(Index(), op->state, op->rcvr, set_stopped_t());
    }

    auto get_env() const noexcept -> env-type<Index, Sndr, Rcvr> {
      return impls-for<tag-t>::get-env(Index(), op->state, op->rcvr);
    }

    basic-state<Sndr, Rcvr>* op;             // exposition only
  };
}
```
* receiver_t[link receiver.md]
* tag_of_t[link tag_of_t.md]
* state-type[link basic-operation.md]
* impls-for[link impls-for.md]
* callable[link /reference/functional/callable.md.nolink]
* set_value_t[link set_value.md]
* set_error_t[link set_error.md]
* set_stopped_t[link set_stopped.md]
* basic-state[link basic-operation.md]


## 概要
`basic-receiver`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のクラステンプレートである。

`basic-receiver<Sndr, Rcvr, Index>`は[`receiver`](receiver.md)のモデルであり、SenderアルゴリズムのReceiverとしてして[子Senderとの接続時](basic-operation.md)に利用される。

- `Sndr` : Senderアルゴリズムの[Sender](sender.md)。
- `Rcvr` : Senderアルゴリズムの接続先[Receiver](receiver.md)。Senderアルゴリズム同士を連結する場合は、親Senderアルゴリズム側のReceiver型。
- `Index` : Senderアルゴリズムの子Sender識別用インデクス値。Senderアダプタは通常1個の子Senderと接続され、この場合は`Index()`は定数値`0`となる。


## 説明専用エンティティ

```cpp
template<template<class...> class T, class... Args>
concept valid-specialization =  // exposition only
  requires { typename T<Args...>; };

template<class Index, class Sndr, class Rcvr>  // exposition only
using env-type = call-result-t<
  decltype(impls-for<tag_of_t<Sndr>>::get-env), Index,
  state-type<Sndr, Rcvr>&, const Rcvr&>;
```
* call-result-t[link call-result-t.md.nolink]
* impls-for[link impls-for.md]
* tag_of_t[link tag_of_t.md]
* state-type[link basic-operation.md]


## バージョン
### 言語
- C++26


## 関連項目
- [`basic-sender`](basic-sender.md)
- [`basic-operation`](basic-operation.md)
- [`execution::receiver`](receiver.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
