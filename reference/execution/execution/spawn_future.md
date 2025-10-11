# spawn_future
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct spawn_future_t { unspecified };
  inline constexpr spawn_future_t spawn_future{};
}
```
* unspecified[italic]

## 概要
`spawn_future`は、入力[Sender](sender.md)に対して[非同期トークンスコープ](scope_token.md)への関連付けを試み、成功時に入力Senderを早期開始(eagerly start)させるSenderアダプタである。

戻り値Senderの[接続(connect)](connect.md)および[開始(start)](start.md)により、早期開始した入力Senderの戻り値を用いて値完了、もしくは入力Senderが開始していなければ[`set_stopped`](set_stopped.md)で完了する。


## 効果
説明用の式`sndr`, `token`, `env`を下記の通り定義する。

- `Sndr`型を`decltype((sndr))`、
- `Token`型を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype((token))>`、
- `Env`型を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype((env))>`とする。

[`sender`](sender.md)`<Sndr>`, [`scope_token`](scope_token.md)`<Token>`, [`queryable`](../queryable.md)`<Env>`のいずれかを満たさないとき、呼び出し式`spawn_future(sndr, token, env)`は不適格となる。

そうでなければ、呼び出し式`spawn_future(sndr, token, env)`に対して、説明用の式`new_sender`を[`token.wrap`](scope_token.md)`(sndr)`とし、`alloc`と`senv`を次の通りとする。

- 式[`get_allocator`](../get_allocator.md)`(env)`が適格なとき、`alloc`を[`get_allocator`](../get_allocator.md)`(env)`の結果、`senv`を式`env`とする。
- そうでなはく、式[`get_allocator`](../get_allocator.md)`(`[`get_env`](get_env.md)`(new_sender))`が適格なとき、`alloc`を[`get_allocator`](../get_allocator.md)`(`[`get_env`](get_env.md)`(new_sender))`の結果、`senv`を式[`JOIN-ENV`](../queryable.md)`(`[`prop`](prop.md)`(`[`get_allocator`](../get_allocator.md)`, alloc), env)`とする。
- そうではないとき、`alloc`を[`allocator`](/reference/memory/allocator.md)`<void>()`、`senv`を式`env`とする。

呼び出し式`spawn_future(sndr, token, env)`は、次の効果をもつ。

- `alloc`を用いてメモリ確保し、`alloc`, `token.wrap(sndr)`, `token`, `senv`から特殊化された`spawn-future-state`型のオブジェクト`s`を構築する。いずれかのオブジェクト構築・破棄時に例外送出されたときは、確保されたメモリが解放される。
- 下記を満たす[`unique_ptr`](/reference/memory/unique_ptr.md)の特殊化型のオブジェクト`u`を構築する。
    - `u.`[`get()`](/reference/memory/unique_ptr/get.md)は`s`のアドレスに等しく、かつ
    - `u.`[`get_deleter()`](/reference/memory/unique_ptr/get_deleter.md)`(u.`[`release()`](/reference/memory/unique_ptr/release.md)`)`は`u.release()->abandon()`に等しい。
- [`make-sender`](make-sender.md)`(spawn_future,` [`std::move`](/reference/utility/move.md)`(u))`を返す。

呼び出し式`spawn_future(sndr, token)`は、式`spawn_future(sndr, token,` [`execution::env<>`](env.md)`())`と等価である。


### Senderアルゴリズムタグ `spawn_future`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<spawn_future_t> : default-impls {
    static constexpr auto start = see below;  // exposition only
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]

`impls-for<spawn_future_t>::start`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[](auto& state, auto& rcvr) noexcept -> void {
  state->consume(rcvr);
}
```


## 説明専用エンティティ
### クラステンプレート`spawn-future-state-base`
```cpp
namespace std::execution {
  template<class Completions>
  struct spawn-future-state-base;                                   // exposition only

  template<class... Sigs>
  struct spawn-future-state-base<completion_signatures<Sigs...>> {  // exposition only
    using variant-t = see below;                                    // exposition only
    variant-t result;                                               // exposition only
    virtual void complete() noexcept = 0;                           // exposition only
  };
}
```
* completion_signatures[link completion_signatures.md]

説明用のパック`Sigs`を、クラステンプレート`spawn-future-state-base`のパラメータに指定する[`completion_signatures`](completion_signatures.md)特殊化の引数パックと定義する。説明用のエイリアステンプレート`as-tuple<Tag(Args...)>`を[`decayed-tuple`](decayed-tuple.md)`<Tag, Args...>`と定義する。

- `Sigs`に含まれる全ての完了シグニチャ`Tag(Args...)`における全てのパラメータパック`Args`の全ての型`Any`に対して[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<Arg>, Arg> == true`のとき、エイリアス`variant-t`は[`variant`](/reference/variant/variant.md)`<`[`monostate`](/reference/variant/monostate.md)`,` [`tuple`](/reference/tuple/tuple.md)`<`[`set_stopped_t`](set_stopped.md)`>, as-tuple<Sigs>...>`において重複削除した型となる。
- そうではないとき、エイリアス`variant-t`は[`variant`](/reference/variant/variant.md)`<`[`monostate`](/reference/variant/monostate.md)`,` [`tuple`](/reference/tuple/tuple.md)`<`[`set_stopped_t`](set_stopped.md)`>, tuple<`[`set_error_t`](set_error.md)`,` [`exception_ptr`](/reference/exception/exception_ptr.md)`>, as-tuple<Sigs>...>`において重複削除した型となる。

### クラステンプレート`spawn-future-receiver`
```cpp
namespace std::execution {
  template<class Completions>
  struct spawn-future-receiver {                  // exposition only
    using receiver_concept = receiver_t;

    spawn-future-state-base<Completions>* state;  // exposition only

    template<class... T>
    void set_value(T&&... t) && noexcept {
      set-complete<set_value_t>(std::forward<T>(t)...);
    }

    template<class E>
    void set_error(E&& e) && noexcept {
      set-complete<set_error_t>(std::forward<E>(e));
    }

    void set_stopped() && noexcept {
      set-complete<set_stopped_t>();
    }

  private:
    template<class CPO, class... T>
      void set-complete(T&&... t) noexcept {      // exposition only
        constexpr bool nothrow = (is_nothrow_constructible_v<decay_t<T>, T> && ...);
        try {
          state->result.template emplace<decayed-tuple<CPO, T...>>(CPO{},
                                                                   std::forward<T>(t)...);
        }
        catch (...) {
          if constexpr (!nothrow) {
            using tuple_t = decayed-tuple<set_error_t, exception_ptr>;
            state->result.template emplace<tuple_t>(set_error_t{}, current_exception());
          }
        }
        state->complete();
      }
  };
}
```
* receiver_t[link receiver.md]
* set_value_t[link set_value.md]
* set_error_t[link set_error.md]
* set_stopped_t[link set_stopped.md]
* decayed-tuple[link decayed-tuple.md]
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]
* template emplace[link /reference/variant/variant/emplace.md]
* exception_ptr[link /reference/exception/exception_ptr.md]
* current_exception()[link /reference/exception/current_exception.md]

型`ssource-t`を[`stoppabe-source`](/reference/stop_token/stoppable-source.md)のモデルである未規定の型、`ssource`を型`ssource-t`の左辺値とする。
型`stoken-t`を`decltype(ssource.get_token())`とする。

### エイリアステンプレート `future-spawned-sender`

```cpp
template<sender Sender, class Env>
using future-spawned-sender =  // exposition only
  decltype(write_env(stop-when(declval<Sender>(), declval<stoken-t>()), declval<Env>()));
```
* write_env[link write_env.md]
* stop-when[link stop-when.md]

### クラステンプレート`spawn-future-state`

```cpp
namespace std::execution {
  template<class Alloc, scope_token Token, sender Sender, class Env>
  struct spawn-future-state                                                 // exposition only
    : spawn-future-state-base<completion_signatures_of_t<future-spawned-sender<Sender, Env>>> {
    using sigs-t =                                                          // exposition only
      completion_signatures_of_t<future-spawned-sender<Sender, Env>>;
    using receiver-t =                                                      // exposition only
      spawn-future-receiver<sigs-t>;
    using op-t =                                                            // exposition only
      connect_result_t<future-spawned-sender<Sender, Env>, receiver-t>;

    spawn-future-state(Alloc alloc, Sender&& sndr, Token token, Env env)    // exposition only
      : alloc(std::move(alloc)),
        op(connect(
          write_env(stop-when(std::forward<Sender>(sndr), ssource.get_token()), std::move(env)),
          receiver-t(this))),
        token(std::move(token)),
        associated(token.try_associate()) {
          if (associated)
            start(op);
          else
            set_stopped(receiver-t(this));
        }

    void complete() noexcept override;                                      // exposition only
    void consume(receiver auto& rcvr) noexcept;                             // exposition only
    void abandon() noexcept;                                                // exposition only

  private:
    using alloc-t =                                                         // exposition only
      typename allocator_traits<Alloc>::template rebind_alloc<spawn-future-state>;

    alloc-t alloc;                                                          // exposition only
    ssource-t ssource;                                                      // exposition only
    op-t op;                                                                // exposition only
    Token token;                                                            // exposition only
    bool associated;                                                        // exposition only

    void destroy() noexcept;                                                // exposition only
  };
}
```
* completion_signatures_of_t[link completion_signatures_of_t.md]
* connect_result_t[link connect_result_t.md]
* connect[link connect.md]
* write_env[link write_env.md]
* stop-when[link stop-when.md]
* start[link start.md]
* set_stopped[link set_stopped.md]
* allocator_traits[link /reference/memory/allocator_traits.md]
* std::move[link /reference/utility/move.md]

データ競合の存在を判定する目的において、`complete`, `consume`, `abandon`はアトミック操作として振る舞う。
`spawn-future-state`の特殊化である型の単一オブジェクトに対するこれらの操作は、単一の全順序で発生するように見える。

```cpp
void complete() noexcept;
```

- 効果 :
    - `*this`に対するこの`complete`の呼び出しが`consume`もしくは`abandon`の呼び出しよりも前に発生するならば、効果を持たない。
    - そうではなく、`*this`に対する`consume`の呼び出しがこの`complete`の呼び出しよりも前に発生するならば、[Receiver](receiver.md)`rcvr`が登録され、そのReceiverは`consume(rcvr)`によって完了する。
    - そうではないとき、`destroy`が呼び出される。

```cpp
void consume(receiver auto& rcvr) noexcept;
```
* receiver[link receiver.md]

- 効果 :
    - `*this`に対するこの`consume`の呼び出しが`complete`の呼び出しよりも前に発生するならば、`*this`に対してその後`complete`が呼び出されるとき`rcvr`が完了するよう登録される。
    - そうではないとき、下記のように`rcvr`が完了する :

        ```cpp
        std::move(this->result).visit(
          [&rcvr](auto&& tuple) noexcept {
            if constexpr (!same_as<remove_reference_t<decltype(tuple)>, monostate>) {
              apply([&rcvr](auto cpo, auto&&... vals) {
                cpo(std::move(rcvr), std::move(vals)...);
              }, std::move(tuple));
            }
          });
        ```
        * visit[link /reference/variant/visit.md]
        * monostate[link /reference/variant/monostate.md]
        * apply[link /reference/tuple/apply.md]
        * std::move[link /reference/utility/move.md]

```cpp
void abandon() noexcept;
```

- 効果 :
    - `*this`に対するこの`abandon`の呼び出しが`complete`の呼び出しより前に発生するならば、下記と等価。

        ```cpp
        ssource.request_stop();
        ```

    - そうでなければ、`destroy`が呼び出される。

```cpp
void destroy() noexcept;
```

- 効果 : 下記と等価。

    ```cpp
    auto token = std::move(this->token);
    bool associated = this->associated;

    {
      auto alloc = std::move(this->alloc);

      allocator_traits<alloc-t>::destroy(alloc, this);
      allocator_traits<alloc-t>::deallocate(alloc, this, 1);
    }

    if (associated)
      token.disassociate();
    ```
    * allocator_traits[link /reference/memory/allocator_traits.md]
    * destroy[link /reference/memory/allocator_traits/destroy.md]
    * deallocate[link /reference/memory/allocator_traits/deallocate.md]
    * std::move[link /reference/utility/move.md]


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  // システムスレッドプール上の実行タスクを定義
  ex::scheduler auto sch = ex::get_parallel_scheduler();
  ex::sender auto snd0 =
    ex::schedule(sch)
    | ex::then([]{
        // ワーカースレッド処理
        std::println("hello async");
        return 42;
      });

  // 非同期スコープを定義
  ex::counting_scope scope;

  // タスクを早期開始させる
  std::println("spawn");
  ex::sender auto snd1 = ex::spawn_future(std::move(snd0), scope.get_token());

  // (メインスレッド処理)

  // 非同期スコープを合流
  auto result = std::this_thread::sync_wait(ex::when_all(std::move(snd1), scope.join()));
  auto [value] = *result;
  std::println("value={}", value);
}
```
* ex::spawn_future[color ff0000]
* ex::scheduler[link scheduler.md]
* ex::get_parallel_scheduler()[link get_parallel_scheduler.md]
* ex::sender[link sender.md]
* ex::schedule[link schedule.md]
* ex::then[link then.md]
* ex::counting_scope[link counting_scope.md]
* get_token()[link counting_scope/get_token.md]
* join()[link counting_scope/join.md]
* ex::when_all[link when_all.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* std::move[link /reference/utility/move.md]

### 出力
```
spawn
hello async
value=42
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::scope_token`](scope_token.md)
- [`execution::spawn`](spawn.md)


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
