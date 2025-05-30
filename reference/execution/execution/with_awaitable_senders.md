# with_awaitable_senders
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class-type Promise>
  struct with_awaitable_senders {
    template<class OtherPromise>
      requires (!same_as<OtherPromise, void>)
    void set_continuation(coroutine_handle<OtherPromise> h) noexcept;

    coroutine_handle<> continuation() const noexcept { return continuation; }

    coroutine_handle<> unhandled_stopped() noexcept {
      return stopped-handler(continuation.address());
    }

    template<class Value>
    see below await_transform(Value&& value);

  private:
    [[noreturn]] static coroutine_handle<>
      default-unhandled-stopped(void*) noexcept {  // exposition only
      terminate();
    }

    coroutine_handle<> continuation{};                       // exposition only
    coroutine_handle<> (*stopped-handler)(void*) noexcept =  // exposition only
      &default-unhandled-stopped;
  };
}
```
* class-type[link class-type.md.nolink]
* terminate()[link /reference/exception/terminate.md]
* coroutine_handle[link /reference/coroutine/coroutine_handle.md]
* address()[link /reference/coroutine/coroutine_handle/address.md]
* see below[italic]

## 概要
`with_awaitable_senders`は、[コルーチンPromise型](/lang/cpp20/coroutines.md)の基底クラスとして利用することで、[Sender](sender.md)を`co_await`演算子でAwait可能とするクラステンプレートである。

また`unhandled_stopped`のデフォルト実装を提供し、Senderが[`set_stopped`](set_stopped.md)を呼び出して停止完了したとき、Await式からキャッチできない "停止" 例外が送出されたかのように取り扱う。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| `(constructor)` | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |
| [`set_continuation`](with_awaitable_senders/set_continuation.md) | 継続ハンドラを設定する | C++26 |
| `continuation` | 継続ハンドラを返す | C++26 |
| `unhandled_stopped` | 停止ハンドラを返す | C++26 |
| [`await_transform`](with_awaitable_senders/await_transform.md) | [`co_await`演算子](/lang/cpp20/coroutines.md)へアダプトしAwaitableオブジェクトを返す | C++26 |


## 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| `default-unhandled-stopped` | 説明専用のデフォルト停止ハンドラ | C++26 |


## 例
```cpp example
#include <coroutine>
#include <print>
#include <execution>
namespace ex = std::execution;

template<typename T>
class Lazy {
public:
  struct promise_type;
  using value_type = T;
  using handle_type = std::coroutine_handle<promise_type>;

  struct promise_type : ex::with_awaitable_senders<promise_type> {
    value_type value_;
    auto get_return_object() { return Lazy{handle_type::from_promise(*this)}; }
    auto initial_suspend() noexcept { return std::suspend_always{}; }
    auto final_suspend() noexcept { return std::suspend_always{}; }
    void unhandled_exception() { throw; }
    void return_value(value_type v) noexcept { value_ = v; }
  };

private:
  Lazy(handle_type h) : coro_{h} {}

public:
  Lazy(Lazy&& rhs)
    : coro_{std::exchange(rhs.coro_, nullptr)} {}
  Lazy& operator=(Lazy&& rhs) {
    if (coro_) { std::exchange(coro_, nullptr).destroy(); }
    std::swap(rhs.coro_, coro_);
    return *this;
  }
  ~Lazy()
    { if (coro_) { coro_.destroy(); } }

  value_type get() {
    assert(coro_);
    if (!coro_.done()) {
      coro_.resume();
    }
    return coro_.promise().value_;
  }

private:
  handle_type coro_;
};

// SenderをAwait可能なコルーチン
Lazy<int> coro(int n)
{
  std::println("coro start");
  ex::sender auto sndr =
    ex::just(n)
    | ex::then([](int m){ return m * 3; });

  // Senderを開始して値取得を待機
  int val = co_await sndr;

  std::println("coro end");
  co_return val * 7;
}

int main()
{
  try {
    auto task = coro(2);
    std::println("get");
    auto value = task.get();
    std::println("value={}", value);
  } catch (...) {
    std::println("<exception>");
  }
}
```
* ex::with_awaitable_senders[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* ex::then[link then.md]
* std::coroutine_handle[link /reference/coroutine/coroutine_handle.md]
* from_promise[link /reference/coroutine/coroutine_handle/from_promise.md]
* destroy()[link /reference/coroutine/coroutine_handle/destroy.md]
* done()[link /reference/coroutine/coroutine_handle/done.md]
* resume()[link /reference/coroutine/coroutine_handle/resume.md]
* promise()[link /reference/coroutine/coroutine_handle/promise.md]
* std::suspend_always[link /reference/coroutine/suspend_always.md]

### 出力
```
get
coro start
coro end
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
- [`execution::​as_awaitable`](​as_awaitable.md.nolink)
- [コルーチン](/lang/cpp20/coroutines.md)


## 参照
- [P3325R5 A Utility for Creating Execution Environments](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3325r5.html)


