# inline_scheduler
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  class inline_scheduler {
    class inline-sender; // exposition only
    template <receiver R>
    class inline-state;  // exposition only

  public:
    using scheduler_concept = scheduler_tag;

    constexpr inline-sender schedule() noexcept { return {}; }
    constexpr bool operator==(const inline_scheduler&) const noexcept = default;
  };
}
```
* scheduler_tag[link scheduler.md]
* receiver[link receiver.md]
* inline-sender[italic]
* inline-state[italic]

## 概要
`inline_scheduler`は、インラインでタスクを実行する[Scheduler](scheduler.md)である。

[`schedule`](schedule.md)操作により得られる[Sender](sender.md)と[Receiver](receiver.md)を[接続(connect)](connect.md)した[OperationState](operation_state.md)は、[開始(start)](start.md)したスレッド上で即座に[値完了](set_value.md)する。


## クラス仕様
`inline_scheduler`型の全オブジェクトは等しい。`inline_scheduler`型の部分式`sch`、[クエリオブジェクト](../queryable.md)`q`、部分式のパック`args`としたとき、式`sch.query(q, args...)`は`inline-attrs<`[`set_value_t`](set_value.md)`>.query(q, args...)`と等価な式となる。

説明専用のクラス`inline-sender`を[`sender`](sender.md)を満たす型とする。[`completion_signatures_of_t`](completion_signatures_of_t.md)`<inline-sender>`は、[`completion_signatures`](completion_signatures.md)`<`[`set_value_t`](set_value.md)`()>`となる。

説明用の`sndr`を`inline-sender`型の式とする。`CS`を[`completion_signatures`](completion_signatures.md)`<`[`set_value_t`](set_value.md)`()>`としたとき、`rcvr`を[`receiver-of`](receiver-of.md)`<decltype((rcvr)), CS>`が`true`となる式とする。式[`connect`](connect.md)`(sndr, rcvr)`の型は`inline-state<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype((rcvr))>>`であり、式`((void)sndr, auto(rcvr))`が潜在的に例外送出(potentially-throwing)するときに限って潜在的に例外送出する。

説明用の`o`を`inline-state<Rcvr>`型の非const左辺値とし、`REC(o)`を`o`を返す[接続(connect)](connect.md)呼び出しへ渡した式`rcvr`で初期化された`Rcvr`型の非const左辺値参照とする。

- `REC(o)`が参照するオブジェクトは、`o`が参照するオブジェクトの生存期間(lifetime)で有効である。
- 式[`start`](start.md)`(o)`は、[`set_value`](set_value.md)`(`[`std::move`](/reference/utility/move.md)`(REC(o)))`と等価。

### 説明専用クラステンプレート`inline-attrs`
```cpp
template<class Tag>
struct inline-attrs {
  see below
};
```
部分式`env`としたとき、`inline-attrs<Tag>{}.query(`[`get_completion_scheduler`](get_completion_scheduler.md)`<Tag>, env)`は[`get_scheduler`](get_scheduler.md)`(env)`と等価な式となる。

部分式`env`としたとき、`inline-attrs<Tag>{}.query(`[`get_completion_domain`](get_completion_domain.md)`<Tag>, env)`は[`get_domain`](get_domain.md)`(env)`と等価な式となる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `(constructor)` | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |
| `schedule` | [スケジュールSender](schedule.md)を返す | C++26 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `scheduler_concept` | [`scheduler_tag`](scheduler.md) | C++26 |


## 例
```cpp example
#include <execution>
#include <print>
namespace ex = std::execution;

int main()
{
  ex::scheduler auto sch = ex::inline_scheduler{};

  std::this_thread::sync_wait(
    ex::schedule(sch)
    | ex::then([]{ std::println("task"); })
  );
}
```
* ex::inline_scheduler[color ff0000]
* ex::scheduler[link scheduler.md]
* ex::schedule[link schedule.md]
* ex::then[link then.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]

### 出力
```
task
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
- [`execution::scheduler`](scheduler.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
- [P4159R0 Make `sender_in` and `receiver_of` exposition-only](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4159r0.html)
- C++now 2025, [Getting The Lazy Task Done](https://schedule.cppnow.org/wp-content/uploads/2025/03/Getting_The_Lazy_Task_Done.pdf)
