# impls-for
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Tag>
  struct impls-for : default-impls {};  // exposition only

  struct default-impls {  // exposition only
    static constexpr auto get-attrs = see below;  // exposition only
    static constexpr auto get-env = see below;    // exposition only
    static constexpr auto get-state = see below;  // exposition only
    static constexpr auto start = see below;      // exposition only
    static constexpr auto complete = see below;   // exposition only

    template<class Sndr, class... Env>
    static consteval void check-types();
  };
}
```

## 概要
`impls-for`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のクラステンプレートである。

説明専用のクラス`default-impls`にてSenderアルゴリズム共通動作を記述し、[Senderアルゴリズムタグ型](tag_of_t.md)`Tag`を用いて`impls-for<Tag>`特殊化を定義することでSenderアルゴリズムの固有動作を静的にオーバーライドする。


## 説明専用クラス `default-impls`

### `get-attrs`メンバ
`get-attrs`は、[`basic-sender`](basic-sender.md)実装におけるSender[属性](../queryable.md)取得のカスタマイゼーションポイントとして機能する。

`default-impls::get-attrs`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

- 子[Sender](sender.md)`child`が1個の場合は、その子Senderの[属性](../queryable.md)を転送する。
- それ以外の場合は、空の属性[`env<>()`](env.md)を返す。

```cpp
[](const auto&, const auto&... child) noexcept -> decltype(auto) {
  if constexpr (sizeof...(child) == 1)
    return (FWD-ENV(get_env(child)), ...);
  else
    return env<>();
}
```
* FWD-ENV[link ../forwarding_query.md]
* get_env[link get_env.md]
* env<>[link env.md]

### `get-env`メンバ
`get-env`は、[`basic-receiver`](basic-receiver.md)実装におけるReceiver[環境](../queryable.md)取得のカスタマイゼーションポイントとして機能する。

`default-impls::get-env`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

- 接続先[Receiver](receiver.md)`rcvr`の[環境](../queryable.md)を転送する。

```cpp
[](auto, auto&, const auto& rcvr) noexcept -> decltype(auto) {
  return FWD-ENV(get_env(rcvr));
}
```
* FWD-ENV[link ../forwarding_query.md]
* get_env[link get_env.md]

### `get-state`メンバ
`get-state`は、[`basic-operation`](basic-operation.md)実装がメンバ変数として保持する状態(state)取得のカスタマイゼーションポイントとして機能する。

`default-impls::get-state`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

- [Sender](sender.md)`sndr`オブジェクト構築時の引数を返す。

```cpp
[]<class Sndr, class Rcvr>(Sndr&& sndr, Rcvr& rcvr) noexcept -> decltype(auto) {
  auto& [_, data, ...child] = sndr;
  return allocator-aware-forward(std::forward_like<Sndr>(data), rcvr);
}
```
* allocator-aware-forward[link allocator-aware-forward.md]

### `start`メンバ
`start`は、[`basic-operation`](basic-operation.md)実装における[開始(start)](start.md)のカスタマイゼーションポイントとして機能する。

`default-impls::start`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

- 子[Operation State](operation_state.md)`ops`を逐次的に[開始(start)](start.md)する。

```cpp
[](auto&, auto&, auto&... ops) noexcept -> void {
  (execution::start(ops), ...);
}
```
* execution::start[link start.md]

### `complete`メンバ
`complete`は、[`basic-receiver`](basic-receiver.md)実装における各種完了操作のカスタマイゼーションポイントとして機能する。

`default-impls::complete`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

- 完了タグ`Tag`と引数リスト`args`を用いて、接続先[Receiver](receiver.md)`rcvr`の完了操作を呼び出す。
    - `Tag`型は[`set_value_t`](set_value.md), [`set_error_t`](set_error.md), [`set_stopped_t`](set_stopped.md)のいずれか。
- 第1引数`Index`は、`default-impls`実装では利用しない。
    - 複数の子Senderを保持するSenderアルゴリズムの`impls-for`オーバーライド実装で利用する（例 : [`when_all`](when_all.md)）。

```cpp
[]<class Index, class Rcvr, class Tag, class... Args>(
  Index, auto& state, Rcvr& rcvr, Tag, Args&&... args) noexcept
    -> void requires callable<Tag, Rcvr, Args...> {
  static_assert(Index::value == 0);
  Tag()(std::move(rcvr), std::forward<Args>(args)...);
}
```
* callable[link /reference/functional/callable.md]
* std::move[link /reference/utility/move.md]

### `check-types`メンバ関数

```cpp
template<class Sndr, class... Env>
static consteval void default-impls::check-types();
```

説明用のパック`Is`を、[`indices-for`](basic-sender.md)`<Sndr>`で導入される[`integer_sequence`](/reference/utility/integer_sequence.md)クラス特殊化の整数テンプレート引数とする。

効果：下記と等価。

```cpp
((void)get_completion_signatures<child-type<Sndr, Is>, FWD-ENV-T(Env)...>(), ...);
```
* get_completion_signatures[link get_completion_signatures.md]
* child-type[link child-type.md]
* FWD-ENV-T[link ../forwarding_query.md]


## バージョン
### 言語
- C++26


## 関連項目
- [`basic-sender`](basic-sender.md)
- [`basic-receiver`](basic-receiver.md)
- [`basic-operation`](basic-operation.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3433R1 Allocator Support for Operation States](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3433r1.pdf)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
- [LWG4459 Protect `get_completion_signatures` fold expression from overloaded commas](https://cplusplus.github.io/LWG/issue4459)
