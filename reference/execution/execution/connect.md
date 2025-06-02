# connect
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct connect_t;
  inline constexpr connect_t connect{};
}
```

## 概要
`connect`は、[Sender](sender.md)と[Receiver](receiver.md)を接続した結果[Operation State](operation_state.md)を返すカスタマイゼーションポイントオブジェクトである。

呼び出し式`connect(sndr, rcvr)`は、下記の動作となる。

- [`transform_sender`](transform_sender.md)により`sndr`から新しいSender`new_sndr`へ変換する。（多くのケースで無変換）
- 呼び出し式が適格であるならば、`new_sndr.connect(rcvr)`を返す。
- そうでなければ、`new_sndr`を[コルーチンのAwaitable型](/lang/cpp20/coroutines.md)とみなして`rcvr`と接続した結果を返す。


## 効果
説明用の型`Sndr`を`decltype((sndr))`、型`Rcvr`を`decltype((rcvr))`とし、式`new_sndr`を次の通りとする。
このとき[`sender`](sender.md)`<Sndr> &&` [`receiver`](receiver.md)`<Rcvr> == true`であること。

```cpp
transform_sender(decltype(get-domain-late(sndr, get_env(rcvr))){}, sndr, get_env(rcvr))
```
* transform_sender[link transform_sender.md]
* get-domain-late[link get-domain-late.md]
* get_env[link get_env.md]

式`connect(sndr, rcvr)`は下記と等価であり、[`operation_state`](operation_state.md)を満たす型の値となる。

- 適格であるならば、式`new_sndr.connect(rcvr)`
- そうでなければ、式`connect-awaitable(new_sndr, rcvr)`


### Awaitable接続用へルパ
説明用のクラス`connect-awaitable-promise`, `operation-state-task`をそれぞれ下記の通り定義する。

型`DS`を[`decay_t`](/reference/type_traits/decay.md)`<decltype((new_sndr))>`、型`DR`を[`decay_t`](/reference/type_traits/decay.md)`<Rcvr>`とする。

```cpp
namespace std::execution {
  struct connect-awaitable-promise : with-await-transform<connect-awaitable-promise> {
    connect-awaitable-promise(DS&, DR& rcvr) noexcept : rcvr(rcvr) {}

    suspend_always initial_suspend() noexcept { return {}; }
    [[noreturn]] suspend_always final_suspend() noexcept { terminate(); }
    [[noreturn]] void unhandled_exception() noexcept { terminate(); }
    [[noreturn]] void return_void() noexcept { terminate(); }

    coroutine_handle<> unhandled_stopped() noexcept {
      set_stopped(std::move(rcvr));
      return noop_coroutine();
    }

    operation-state-task get_return_object() noexcept {
      return operation-state-task{
        coroutine_handle<connect-awaitable-promise>::from_promise(*this)};
    }

    env_of_t<DR> get_env() const noexcept {
      return execution::get_env(rcvr);
    }

  private:
    DR& rcvr;  // exposition only
  };
}
```
* with-await-transform[link with-await-transform.md]
* suspend_always[link /reference/coroutine/suspend_always.md]
* terminate()[link /reference/exception/terminate.md]
* coroutine_handle[link /reference/coroutine/coroutine_handle.md]
* set_stopped[link set_stopped.md]
* std::move[link /reference/utility/move.md]
* noop_coroutine()[link /reference/coroutine/noop_coroutine.md]
* from_promise[link /reference/coroutine/coroutine_handle/from_promise.md]
* env_of_t[link env_of_t.md]
* execution::get_env[link get_env.md]

```cpp
namespace std::execution {
  struct operation-state-task {  // exposition only
    using operation_state_concept = operation_state_t;
    using promise_type = connect-awaitable-promise;

    explicit operation-state-task(coroutine_handle<> h) noexcept : coro(h) {}
    operation-state-task(operation-state-task&&) = delete;
    ~operation-state-task() { coro.destroy(); }

    void start() & noexcept {
      coro.resume();
    }

  private:
    coroutine_handle<> coro;  // exposition only
  };
}
```
* operation_state_t[link operation_state.md]
* promise_type[link /lang/cpp20/coroutines.md]
* coroutine_handle<>[link /reference/coroutine/coroutine_handle.md]
* destroy()[link /reference/coroutine/coroutine_handle/destroy.md]
* resume()[link /reference/coroutine/coroutine_handle/resume.md]

`C`型の`c`と[コルーチンPromise型](/lang/cpp20/coroutines.md)の左辺値`p`に対して、`await-result-type<C, Promise>`を`decltype(`[`GET-AWAITER`](../is-awaitable.md)`(c, p).`[`await_resume()`](/lang/cpp20/coroutines.md)`)`型とする。
型`V`を`await-result-type<DS, connect-awaitable-promise>`とする。

[完了シグネチャ集合型](completion_signatures.md)`Sigs`を下記の通り定義する。

```cpp
completion_signatures<
  SET-VALUE-SIG(V),
  set_error_t(exception_ptr),
  set_stopped_t()>
```
* completion_signatures[link completion_signatures.md]
* SET-VALUE-SIG[link set_value.md]
* set_error_t[link set_error.md]
* set_stopped_t[link set_stopped.md]
* exception_ptr[link /reference/exception/exception_ptr.md]

説明用の関数テンプレート`suspend-complete`とコルーチン`suspend-awaitable`を下記の通り定義する。

```cpp
namespace std::execution {
  template<class Fun, class... Ts>
  auto suspend-complete(Fun fun, Ts&&... as) noexcept {  // exposition only
    auto fn = [&, fun]() noexcept { fun(std::forward<Ts>(as)...); };

    struct awaiter {
      decltype(fn) fn;  // exposition only

      static constexpr bool await_ready() noexcept { return false; }
      void await_suspend(coroutine_handle<>) noexcept { fn(); }
      [[noreturn]] void await_resume() noexcept { unreachable(); }
    };
    return awaiter{fn};
  }

  operation-state-task connect-awaitable(DS sndr, DR rcvr) requires receiver_of<DR, Sigs> {
    exception_ptr ep;
    try {
      if constexpr (same_as<V, void>) {
        co_await std::move(sndr);
        co_await suspend-complete(set_value, std::move(rcvr));
      } else {
        co_await suspend-complete(set_value, std::move(rcvr), co_await std::move(sndr));
      }
    } catch(...) {
      ep = current_exception();
    }
    co_await suspend-complete(set_error, std::move(rcvr), std::move(ep));
  }
}
```
* coroutine_handle<>[link /reference/coroutine/coroutine_handle.md]
* unreachable()[link /reference/utility/unreachable.md]
* receiver_of[link receiver_of.md]
* exception_ptr[link /reference/exception/exception_ptr.md]
* set_value[link set_value.md]
* set_error[link set_error.md]
* std::move[link /reference/utility/move.md]
* current_exception()[link /reference/exception/current_exception.md]


## カスタマイゼーションポイント
Sender`sndr`[変換後](transform_sender.md)の`new_sndr`に対して、式`new_sndr.connect(rcvr)`が呼び出される。


## 備考
`connect`は[Sender](sender.md)内部実装から呼び出される想定であり、実行制御ライブラリ利用者が直接利用する必要はない。


## 例
```cpp
#include <print>
#include <execution>
namespace ex = std::execution;

struct ValueReceiver {
  using receiver_concept = ex::receiver_t;

  void set_value(int v) && noexcept
  {
    std::println("{}", v);
  }
};

int main()
{
  // 値42を送信するSender
  ex::sender auto sndr = ex::just(42);
  // int値を受信して表示するReceiver
  ValueReceiver rcvr;
 
  // SenderとReceiverを接続
  ex::operation_state auto op = ex::connect(sndr, rcvr);
  // Operation Stateを開始
  ex::start(op);
}
```
* ex::connect[color ff0000]
* ex::receiver_t[link receiver.md]
* ex::sender[link sender.md]
* ex::just[link just.md]
* ex::operation_state[link operation_state.md]
* ex::start[link start.md]

### 出力
```
42
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
- [`execution::sender`](sender.md)
- [`execution::receiver`](receiver.md)
- [`execution::operation_state`](operation_state.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
