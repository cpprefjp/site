# sync-wait-receiver
* execution[meta header]
* class template[meta id-type]
* std::this_thread[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::this_thread {
  template<class Sndr>
  struct sync-wait-receiver {      // exposition only
    using receiver_concept = execution::receiver_t;
    sync-wait-state<Sndr>* state;  // exposition only

    template<class... Args>
    void set_value(Args&&... args) && noexcept;

    template<class Error>
    void set_error(Error&& err) && noexcept;

    void set_stopped() && noexcept;

    sync-wait-env get_env() const noexcept { return {&state->loop}; }
  };

  template<class Sndr>
  struct sync-wait-state {               // exposition only
    execution::run_loop loop;            // exposition only
    exception_ptr error;                 // exposition only
    sync-wait-result-type<Sndr> result;  // exposition only
  };
}
```
* execution::receiver_t[link ../execution/receiver.md]
* sync-wait-env[link sync-wait-env.md]
* execution::run_loop[link ../execution/run_loop.md]
* exception_ptr[link /reference/exception/exception_ptr.md]
* sync-wait-result-type[link sync_wait.md]

## 概要
`sync-wait-receiver`および`sync-wait-state`は、実行制御ライブラリの仕様定義で用いられる説明専用のクラステンプレートである。

Senderコンシューマ[`sync_wait`](sync_wait.md)動作において[Sender](../execution/sender.md)と[接続(connect)](../execution/connect.md)する[Receiver](../execution/receiver.md)、同Receiverの内部状態として利用される。


### メンバ関数 `set_value`
```cpp
template<class... Args>
void set_value(Args&&... args) && noexcept;
```

効果 : 下記と等価

```cpp
try {
  state->result.emplace(std::forward<Args>(args)...);
} catch (...) {
  state->error = current_exception();
}
state->loop.finish();
```
* emplace[link /reference/optional/optional/emplace.md]
* current_exception()[link /reference/exception/current_exception.md]
* finish()[link ../execution/run_loop/finish.md]


### メンバ関数 `set_error`
```cpp
template<class Error>
void set_error(Error&& err) && noexcept
```

説明用の式`err`に対して`decltype((err))`を型`Err`としたとき、式`AS-EXCEPT-PTR(err)`を下記の通り定義する。

- [`decay_t`](/reference/type_traits/decay.md)`<Err>`が[`exception_ptr`](/reference/exception/exception_ptr.md)型と等しければ、`err`となる。このとき、事前条件として`!err == false`であること。
- そうではなく、[`decay_t`](/reference/type_traits/decay.md)`<Err>`が[`error_code`](/reference/system_error/error_code.md)型と等しければ、[`make_exception_ptr`](/reference/exception/make_exception_ptr.md)`(`[`system_error`](/reference/system_error/system_error.md)`(err))`となる。
- そうでなければ、[`make_exception_ptr`](/reference/exception/make_exception_ptr.md)`(err)`となる。

効果 : 下記と等価

```cpp
state->error = AS-EXCEPT-PTR(std::forward<Error>(err));
state->loop.finish();
```
* finish()[link ../execution/run_loop/finish.md]


### メンバ関数 `set_stopped`
```cpp
void set_stopped() && noexcept;
```

効果 : `state->loop.`[`finish()`](../execution/run_loop/finish.md)と等価。


## バージョン
### 言語
- C++26


## 関連項目
- [`this_thread::sync_wait`](sync_wait.md)
- [`execution::run_loop`](../execution/run_loop.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
