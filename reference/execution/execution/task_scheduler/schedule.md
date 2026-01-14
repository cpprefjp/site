# schedule
* execution[meta header]
* std::execution[meta namespace]
* task_scheduler[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
ts-sender schedule();
```
* ts-sender[italic]

## 概要
保持中[Scheduler](../scheduler.md)の[スケジュールSender](../schedule.md)を返す。


## 効果
[`schedule`](../schedule.md)`(SCHED(*this))`で初期化された[Sender](../sender.md)を保持する、説明専用の`ts-sender`型オブジェクトを返す。


## 説明専用エンティティ
### クラス`ts-sender`
説明専用のクラス`task_scheduler::ts-sender`は下記の通り定義される。

```cpp
class task_scheduler::ts-sender { // exposition only
public:
  using sender_concept = sender_t;

  template <receiver R>
  state<R> connect(R&& rcvr);
};
```
* sender_t[link ../sender.md]
* receiver[link ../receiver.md]
* state[italic]

`ts-sender`は[`sender`](../sender.md)のモデルであり、[`completion_signatures_of_t`](../completion_signatures_of_t.md)`<ts-sender>`は下記となる :

```cpp
completion_signatures<
  set_value_t(),
  set_error_t(error_code),
  set_error_t(exception_ptr),
  set_stopped_t()>
```
* completion_signatures[link ../completion_signatures.md]
* set_value_t[link ../set_value.md]
* set_error_t[link ../set_error.md]
* set_stopped_t[link ../set_stopped.md]
* error_code[link /reference/system_error/error_code.md]
* exception_ptr[link /reference/exception/exception_ptr.md]

説明用の`sch`を`task_sender`型のオブジェクト、`sndr`を[`schedule`](../schedule.md)`(sch)`により得られる`ts-sender`型のオブジェクトとする。[`get_completion_scheduler`](../get_completion_scheduler.md)`<`[`set_value_t`](../set_value.md)`>(`[`get_env`](../get_env.md)`(sndr)) == sch`は`true`となる。オブジェクト`SENDER(sndr)`は、`sndr`または同オブジェクトからムーブ構築された[Sender](../sender.md)オブジェクトとする。

```cpp
template<receiver Rcvr>
state<Rcvr> connect(Rcvr&& rcvr) &&;
```
* state[italic]

- 効果 : `r`を[`receiver`](../receiver.md)のモデルである型のオブジェクトとし、その完了ハンドラは
`rcvr`またはそのコピーに対応する完了ハンドラを呼び出すものとする。[`connect`](../connect.md)`(SENDER(*this),` [`std::move`](/reference/utility/move.md)`(r))`で初期化された[Operation State](../operation_state.md)オブジェクトを保持する`state<Rcvr>`型のオブジェクトを返す。


### クラステンプレート`state`
説明専用のクラステンプレート`task_scheduler::state`は下記の通り定義される。

```cpp
template <receiver R>
class task_scheduler::state { // exposition only
public:
  using operation_state_concept = operation_state_t;

  void start() & noexcept;
};
```
* receiver[link ../receiver.md]
* operation_state_t[link ../operation_state.md]

`state`の特殊化は[`operation_state`](../operation_state.md)のモデルである。

```cpp
void start() & noexcept;
```

- 効果 : `st`を`*this`に含まれる[Operation State](../operation_state.md)オブジェクトとして、[`start`](../start.md)`(st)`と等価。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::schedule`](../schedule.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [4342. Missing rvalue reference qualification for `task_scheduler::ts-sender::connect()`](https://cplusplus.github.io/LWG/issue4342)
