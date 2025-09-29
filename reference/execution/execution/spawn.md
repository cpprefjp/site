# spawn
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct spawn_t { unspecified };
  inline constexpr spawn_t spawn{};
}
```
* unspecified[italic]

## 概要
`spawn`は、入力[Sender](sender.md)に対して[非同期トークンスコープ](scope_token.md))への関連付けを試み、成功時に入力Senderを早期開始(eagerly start)させるSenderコンシューマである。


## 効果
説明用の式`sndr`, `token`, `env`に対して、下記の通り定義する。

- `Sndr`型を`decltype((sndr))`、
- `Token`型を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype((token))>`、
- `Env`型を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype((env))>`とする。

[`sender`](sender.md)`<Sndr>`, [`scope_token`](scope_token.md)`<Token>`, [`queryable`](../queryable.md)`<Env>`のいずれかを満たさないとき、呼び出し式`spawn(sndr, token, env)`は不適格となる。

そうでなければ、呼び出し式`spawn(sndr, token, env)`に対して、説明用の式`new_sender`を[`token.wrap`](scope_token.md)`(sndr)`とし、`alloc`と`senv`を次の通りとする。

- 式[`get_allocator`](../get_allocator.md)`(env)`が適格なとき、`alloc`を[`get_allocator`](../get_allocator.md)`(env)`の結果、`senv`を式`env`とする。
- そうでなはく、式[`get_allocator`](../get_allocator.md)`(`[`get_env`](get_env.md)`(new_sender))`が適格なとき、`alloc`を[`get_allocator`](../get_allocator.md)`(`[`get_env`](get_env.md)`(new_sender))`の結果、`senv`を式[`JOIN-ENV`](../queryable.md)`(`[`prop`](prop.md)`(`[`get_allocator`](../get_allocator.md)`, alloc), env)`とする。
- そうではないとき、`alloc`を[`allocator`](/reference/memory/allocator.md)`<void>()`、`senv`を式`env`とする。

呼び出し式`spawn(sndr, token, env)`は`void`型であり、次の効果をもつ。

- `alloc`を用いてメモリ確保し、`alloc`, [`write_env`](write_env.md)`(token.wrap(sndr), senv)`, `token`から特殊化された`spawn-state`型のオブジェクト`o`を構築し、`o.run()`を呼び出す。何らかのオブジェクト構築・破棄時に例外送出されたときは、確保されたメモリが解放される。

式`spawn(sndr, token)`は、式`spawn(sndr, token,` [`execution::env<>`](env.md)`())`と等価である。


## 説明専用エンティティ
説明専用のクラス`spawn-state-base`を下記の通り定義する。

```cpp
namespace std::execution {
  struct spawn-state-base {                // exposition only
    virtual void complete() noexcept = 0;  // exposition only
  };
}
```

説明専用のクラス`spawn-receiver`を下記の通り定義する。

```cpp
namespace std::execution {
  struct spawn-receiver {                  // exposition only
    using receiver_concept = receiver_t;

    spawn-state-base* state;               // exposition only
    void set_value() && noexcept { state->complete(); }
    void set_stopped() && noexcept { state->complete(); }
  };
}
```
* receiver_t[link receiver.md]
* spawn-state-base[italic]

説明専用のクラステンプレート`spawn-state`を下記の通り定義する。

```cpp
🔗
namespace std::execution {
  template<class Alloc, scope_token Token, sender Sender>
  struct spawn-state : spawn-state-base {                   // exposition only
    using op-t = connect_result_t<Sender, spawn-receiver>;  // exposition only

    spawn-state(Alloc alloc, Sender&& sndr, Token token);   // exposition only
    void complete() noexcept override;                      // exposition only
    void run();                                             // exposition only

  private:
    using alloc-t =                                         // exposition only
      typename allocator_traits<Alloc>::template rebind_alloc<spawn-state>;

    alloc-t alloc;                                          // exposition only
    op-t op;                                                // exposition only
    Token token;                                            // exposition only

    void destroy() noexcept;                                // exposition only
  };
}
```
* scope_token[link scope_token.md]
* sender[link sender.md]
* connect_result_t[link connect_result_t.md]
* allocator_traits[link /reference/memory/allocator_traits.md]
* spawn-state-base[italic]
* spawn-receiver[italic]

```cpp
spawn-state(Alloc alloc, Sender&& sndr, Token token);
```

- 効果 : メンバ変数`alloc`を引数`alloc`で、メンバ変数`token`を引数`token`で、`op`を下記で初期化する。

    ```cpp
    connect(std::move(sndr), spawn-receiver(this))
    ```
    * connect[link connect.md]
    * std::move[link /reference/utility/move.md]

```cpp
void run();
```

- 効果 : 下記と等価

    ```cpp
    if (token.try_associate())
      start(op);
    else
      destroy();
    ```
    * start[link start.md]

```cpp
void complete() noexcept override;
```

- 効果 : 下記と等価

    ```cpp
    auto token = std::move(this->token);

    destroy();
    token.disassociate();
    ```
    * std::move[link /reference/utility/move.md]

```cpp
void destroy() noexcept;
```

- 効果 ： 下記と等価

    ```cpp
    auto alloc = std::move(this->alloc);

    allocator_traits<alloc-t>::destroy(alloc, this);
    allocator_traits<alloc-t>::deallocate(alloc, this, 1);
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
  ex::sender auto sndr =
    ex::schedule(sch)
    | ex::then([](){ std::println("hello async"); });

  // 非同期スコープを定義
  ex::counting_scope scope;

  // タスクを早期開始させる
  std::println("spawn");
  ex::spawn(std::move(sndr), scope.get_token());

  // 非同期スコープを合流
  std::println("sync_wait");
  std::this_thread::sync_wait(scope.join());
}
```
* ex::spawn[color ff0000]
* ex::scheduler[link scheduler.md]
* ex::get_parallel_scheduler()[link get_parallel_scheduler.md]
* ex::sender[link sender.md]
* ex::schedule[link schedule.md]
* ex::then[link then.md]
* ex::counting_scope[link counting_scope.md]
* get_token()[link counting_scope/get_token.md]
* join()[link counting_scope/join.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* std::move[link /reference/utility/move.md]

### 出力
```
spawn
hello async
sync_wait
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
- [`execution::spawn_future`](spawn_future.md.nolink)


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
