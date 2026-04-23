# state
* [meta exposition-only]
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* task[meta class]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template <class T, class Environment>
    template <receiver R>
  class task<T, Environment>::state { // exposition only
  public:
    using operation_state_concept = operation_state_t;

    template <class Rcvr>
    state(coroutine_handle<promise_type> h, Rcvr&& rr);
    ~state();

    void start() & noexcept;

    stop_token_type get-stop-token(); // exposition only

  private:
    using own-env-t = see below;      // exposition only
    coroutine_handle<promise_type> handle;  // exposition only
    remove_cvref_t<R>              rcvr;    // exposition only
    own-env-t                      own-env; // exposition only
    optional<stop_source_type>     source;  // exposition only
    Environment                    environment; // exposition only
    optional<T>                    result;  // exposition only; is_void_v<T>がfalseのときのみ有効
    exception_ptr                  error;   // exposition only
  };
}
```
* receiver[link ../receiver.md]
* task[link ../task.md]
* operation_state_t[link ../operation_state.md]
* coroutine_handle[link /reference/coroutine/coroutine_handle.md]
* promise_type[link promise_type.md]
* optional[link /reference/optional/optional.md]
* stop_source_type[link ../task.md]
* exception_ptr[link /reference/exception/exception_ptr.md]
* own-env-t[italic]

## 概要
`task<T,E>::state`は、[タスクコルーチン](../task.md)動作の説明専用クラステンプレートである。


## クラス仕様
説明専用の`own-env-t`は、有効な型ならば`Environment::`[`template env_type`](../task.md)`<decltype(`[`get_env`](../get_env.md)`(declval<R>()))>`となる。そうでなければ[`env<>`](../env.md)となる。

```cpp
template <class Rcvr>
state(coroutine_handle<promise_type> h, Rcvr&& rr);
```
* coroutine_handle[link /reference/coroutine/coroutine_handle.md]
* promise_type[link promise_type.md]

- 効果 :
    - `handle`を[`std::move`](/reference/utility/move.md)`(h)`で初期化する。
    - `rcvr`を[`std::forward`](/reference/utility/forward.md)`<Rcvr>(rr)`で初期化する。
    - `own-env`を、式が有効ならば`own-env-t(`[`get_env`](../get_env.md)`(rcvr))`で、そうでなければ`own-env-t()`で初期化する。いずれの式も適格でなければ、プログラムは不適格となる。
    - `environment`を、式が有効ならば`Environment(own-env)`で、そうではなく式が有効ならば`Environment(`[`get_env`](../get_env.md)`(rcvr))`で、そうでなければ`Environment()`で初期化する。いずれの式も適格でなければ、プログラムは不適格となる。

```cpp
~state();
```

- 効果 : 以下と等価。

    ```cpp
    if (handle)
      handle.destroy();
    ```
    * destroy()[link /reference/coroutine/coroutine_handle/destroy.md]

```cpp
void start() & noexcept;
```

- 効果 : 説明用の`prom`を`handle.`[`promise()`](/reference/coroutine/coroutine_handle/promise.md)オブジェクトとする。`*this`と関連する`STATE(prom)`、`RCVR(prom)`、`SCHED(prom)`を下記とする。
    - `STATE(prom)` : `*this`
    - `RCVR(prom)` : `rcvr`
    - `SCHED(prom)` : 式が有効ならば[`scheduler_type`](../task.md)`(`[`get_scheduler`](../get_scheduler.md)`(`[`get_env`](../get_env.md)`(rcvr)))`で初期化したオブジェクト、そうでなれば`scheduler_type()`。いずれの式も適格でなければ、プログラムは不適格となる。

    その後、`handle.`[`resume()`](/reference/coroutine/coroutine_handle/resume.md)を呼び出す。

```cpp
stop_token_type get-stop-token();
```

- 効果 : [`same_as`](/reference/concepts/same_as.md)`<decltype(declval<`[`stop_source_type`](../task.md)`>().get_token()), decltype(`[`get_stop_token`](../../get_stop_token.md)`(get_env(rcvr)))>`が`true`のとき、`get_stop_token(get_env(rcvr))`を返す。そうではなく、`source.`[`has_value()`](/reference/optional/optional/has_value.md)が`false`のとき、下記の値で`source`を初期化する。

    - `source->stop_requested()`は`get_stop_token(get_env(rcvr))->stop_requested()`を返し、かつ
    - `source->stop_possible()`は`get_stop_token(get_env(rcvr))->stop_possible()`を返す。

    最後に、`source->get_token()`を返す。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::task::promise_type`](promise_type.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [LWG4339. `task`'s coroutine frame may be released late](https://cplusplus.github.io/LWG/issue4339)
- [LWG4347. `task`'s stop source is always created](https://cplusplus.github.io/LWG/issue4347)
