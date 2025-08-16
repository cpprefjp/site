# write-env
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<sender Sndr, queryable Env>
constexpr auto write-env(Sndr&& sndr, Env&& env);  // exposition only
```

## 概要
`write-env`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のSenderアダプタである。

[クエリ可能オブジェクト](../queryable.md)`env`と接続先[Receiver](receiver.md)の環境を合成した、新たなクエリ可能オブジェクトに関連付けれられたSenderを生成する。


## 戻り値
説明専用の`write-env-t`を空のクラスとしたとき、下記を返す。

```cpp
make-sender(write-env-t(), std::forward<Env>(env), std::forward<Sndr>(sndr))
```
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
template<>
struct impls-for<write-env-t> : default-impls {
  static constexpr auto join-env(const auto& state, const auto& env) noexcept {
    return see below;
  }

  static constexpr auto get-env =
    [](auto, const auto& state, const auto& rcvr) noexcept {
      return join-env(state, FWD-ENV(get_env(rcvr)));
    };

  template<class Sndr, class... Env>
  static consteval void check-types();
};
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* FWD-ENV[link ../forwarding_query.md]
* get_env[link get_env.md]

`impls-for<write-env-t>::join-env`メンバの呼び出しは下記を満たすオブジェクト`e`を返す。

- 型`decltype(e)`が[`queryable`](../queryable.md)のモデルであり、かつ
- 与えられた[クエリオブジェクト](../queryable.md)`q`に対して、式`e.query(q)`は式`state.query(q)`が有効ならばその式と等価。そうでなければ、式`e.query(q)`は`env.query(q)`と等価。
- 型`Sndr`と型パック`Env`に対して、型`State`を[`data-type`](data-type.md)`<Sndr>`とし、パック`JoinEnv`を`decltype(join-env(declval<State>(),` [`FWD-ENV`](../forwarding_query.md)`(declval<Env>())))`とする。式`impls-for<write-env-t>::check-types<Sndr, Env...>()`は[`get_completion_signatures`](get_completion_signatures.md)`<`[`child-type`](child-type.md)`<Sndr>, JoinEnv...>()`と等価。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::on`](on.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3396R1 std::execution wording fixes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3396r1.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
