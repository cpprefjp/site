# as_awaitable
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct as_awaitable_t { unspecified };
  inline constexpr as_awaitable_t as_awaitable{};
}
```
* unspecified[italic]

## 概要
`as_awaitable`は、オブジェクトを特定コルーチン内でAwaitableに変換するカスタマイゼーションポイントオブジェクトである。


## 効果
説明用の式`expr`と左辺値`p`に対して、型`Expr`を`decltype((expr))`、型`Promise`を[`decay_t`](/reference/type_traits/decay.md)`<decltype((p))>`とする。

呼び出し式`as_awaitable(expr, p)`は、`expr`と`p`の評価が不定順で順序付けられることを除いて、下記と等価。

- 適格であるならば、式`expr.as_awaitable(p)`
    - 適格要件 : 同式の型を`A`としたとき、[`is-awaitable`](../is-awaitable.md)`<A, Promise> == true`であるべき。
- そうではなく、説明用の型`U`を`Promise`とは異なりかつ`await_transform`メンバ関数を持たない未規定の型としたとき、[`is-awaitable`](../is-awaitable.md)`<Expr, U> == true`ならば、式`(void(p), expr)`
    - 事前条件 : [`is-awaitable`](../is-awaitable.md)`<Expr, Promise> == true`、かつPromise型`U`のコルーチンにおける式`co_await expr`がPromise型`Promise`のコルーチンにおける同式と等しさを保持すること。
- そうではなく、`awaitable-sender<Expr, Promise>`ならば、式`sender-awaitable{expr, p}`
- そうでなければ、式`(void(p), expr)`


## 説明専用エンティティ
### コンセプト`awaitable-sender`
```cpp
namespace std::execution {
  template<class Sndr, class Promise>
  concept awaitable-sender =
    single-sender<Sndr, env_of_t<Promise>> &&
    sender_to<Sndr, awaitable-receiver> &&  // see below
    requires (Promise& p) {
      { p.unhandled_stopped() } -> convertible_to<coroutine_handle<>>;
    };
}
```
* single-sender[link single-sender.md]
* sender_to[link sender_to.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* coroutine_handle<>[link /reference/coroutine/coroutine_handle.md]
* see below[italic]

### クラステンプレート`sender-awaitable`
```cpp
namespace std::execution {
  template<class Sndr, class Promise>
  class sender-awaitable {
    struct unit {};                                           // exposition only
    using value-type =                                        // exposition only
      single-sender-value-type<Sndr, env_of_t<Promise>>;
    using result-type =                                       // exposition only
      conditional_t<is_void_v<value-type>, unit, value-type>;
    struct awaitable-receiver;                                // exposition only

    variant<monostate, result-type, exception_ptr> result{};  // exposition only
    connect_result_t<Sndr, awaitable-receiver> state;         // exposition only

  public:
    sender-awaitable(Sndr&& sndr, Promise& p);
    static constexpr bool await_ready() noexcept { return false; }
    void await_suspend(coroutine_handle<Promise>) noexcept { start(state); }
    value-type await_resume();
  };
}
```
* single-sender-value-type[link single-sender-value-type.md]
* env_of_t[link env_of_t.md]
* connect_result_t[link connect_result_t.md]
* start[link start.md]
* conditional_t[link /reference/type_traits/conditional.md]
* is_void_v[link /reference/type_traits/is_void.md]
* variant[link /reference/variant/variant.md]
* monostate[link /reference/variant/monostate.md]
* exception_ptr[link /reference/exception/exception_ptr.md]
* coroutine_handle[link /reference/coroutine/coroutine_handle.md]

### クラステンプレート`awaitable-receiver`
説明専用のクラステンプレート`sender-awaitable<Sndr, Promise>::awaitable-receiver`は下記の通り定義される。

```cpp
struct awaitable-receiver {
  using receiver_concept = receiver_t;
  variant<monostate, result-type, exception_ptr>* result-ptr;  // exposition only
  coroutine_handle<Promise> continuation;                      // exposition only
  // see below
};
```
* receiver_t[link receiver.md]
* variant[link /reference/variant/variant.md]
* monostate[link /reference/variant/monostate.md]
* exception_ptr[link /reference/exception/exception_ptr.md]
* coroutine_handle[link /reference/coroutine/coroutine_handle.md]
* see below[italic]

説明用の式`rcvr`を`awaitable-reciever`型の右辺値、`crcvr`を`rcvr`をconst参照する左辺値、`vs`を式パック、`err`を`Err`型の式とする。このとき

- [`constructible_from`](/reference/concepts/constructible_from.md)`<result-type, decltype((vs))...>`を満たすとき、式`set_value(rcvr, vs...)`は下記と等価。そうでなければ、式`set_value(rcvr, vs...)`は不適格となる。

    ```cpp
    try {
      rcvr.result-ptr->template emplace<1>(vs...);
    } catch(...) {
      rcvr.result-ptr->template emplace<2>(current_exception());
    }
    rcvr.continuation.resume();
    ```
    * template emplace[link /reference/variant/variant/emplace.md]
    * current_exception()[link /reference/exception/current_exception.md]
    * resume()[link /reference/coroutine/coroutine_handle/resume.md]

- 式`set_error(rcvr, err)`は下記と等価。

    ```cpp
    rcvr.result-ptr->template emplace<2>(AS-EXCEPT-PTR(err));
    rcvr.continuation.resume();
    ```
    * template emplace[link /reference/variant/variant/emplace.md]
    * resume()[link /reference/coroutine/coroutine_handle/resume.md]

- 式`set_stopped(rcvr)`は下記と等価。

    ```cpp
    static_cast<coroutine_handle<>>(rcvr.continuation.promise().unhandled_stopped()).resume();
    ```
    * coroutine_handle<>[link /reference/coroutine/coroutine_handle.md]
    * promise()[link /reference/coroutine/coroutine_handle/promise.md]
    * resume()[link /reference/coroutine/coroutine_handle/resume.md]

- [`forwarding-query`](../forwarding-query.md)を満たす型の式`tag`とパック式`as`に対して、[`get_env`](get_env.md)`(crcvr).query(tag, as...)`は下記と等価。

    ```cpp
    tag(get_env(as_const(crcvr.continuation.promise())), as...)
    ```
    * get_env[link get_env.md]
    * as_const[link /reference/utility/as_const.md]
    * promise()[link /reference/coroutine/coroutine_handle/promise.md]

```cpp
sender-awaitable(Sndr&& sndr, Promise& p);
```

- 効果 : `state`を下記で初期化する。

    ```cpp
    connect(std::forward<Sndr>(sndr),
            awaitable-receiver{addressof(result), coroutine_handle<Promise>::from_promise(p)})
    ```
    * connect[link connect.md]
    * coroutine_handle[link /reference/coroutine/coroutine_handle.md]
    * from_promise[link /reference/coroutine/coroutine_handle/from_promise.md]

```cpp
value-type await_resume();
```

- 効果 : 下記と等価。

    ```cpp
    if (result.index() == 2)
      rethrow_exception(get<2>(result));
    if constexpr (!is_void_v<value-type>)
      return std::forward<value-type>(get<1>(result));
    ```
    * index()[link /reference/variant/variant/index.md]
    * get[link /reference/variant/variant/get.md]
    * rethrow_exception[link /reference/exception/rethrow_exception.md]
    * is_void_v[link /reference/type_traits/is_void.md]


## カスタマイゼーションポイント
`expr`に対して、適格であるならば式`expr.as_awaitable(p)`が呼び出される。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::with_awaitable_senders`](with_awaitable_senders.md)
- [C++20 コルーチン](/lang/cpp20/coroutines.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
