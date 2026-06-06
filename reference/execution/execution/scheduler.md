# scheduler
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sch>
  concept scheduler =
    derived_from<typename remove_cvref_t<Sch>::scheduler_concept, scheduler_t> &&
    queryable<Sch> &&
    requires(Sch&& sch) {
      { schedule(std::forward<Sch>(sch)) } -> sender;
      { get_forward_progress_guarantee(sch) } -> same_as<forward_progress_guarantee>;
    } &&
    equality_comparable<remove_cvref_t<Sch>> &&
    copyable<remove_cvref_t<Sch>>;

  struct scheduler_t {};  // タグ型
}
```
* derived_from[link /reference/concepts/derived_from.md]
* sender[link sender.md]
* queryable[link ../queryable.md]
* schedule[link schedule.md]
* get_forward_progress_guarantee[link get_forward_progress_guarantee.md]
* forward_progress_guarantee[link forward_progress_guarantee.md]
* copyable[link /reference/concepts/copyable.md]

## 概要
`scheduler`は、型`Sch`がScheduler型の要件を満たすことを表すコンセプトである。

下記をみたすクラス型はSchedulerとみなせる。

- `scheduler_t`をメンバ型`Sch::scheduler_concept`として定義する
- [クエリ可能オブジェクト](../queryable.md)である
- `Sch`型の値`sch`に対して下記を満たすこと
    - [`execution::schedule`](schedule.md)`(sch)`が[Sender](sender.md)を返す
    - [`execution::get_forward_progress_guarantee`](get_forward_progress_guarantee.md)`(sch)`が[`forward_progress_guarantee`](forward_progress_guarantee.md)列挙値を返す
- コピー可能かつ同値比較可能


## モデル
型`Sch`を`scheduler`の型、型`Env`を[`sender_in`](sender_in.md)`<`[`schedule_result_t`](schedule_result_t.md)`<Sch>, Env>`を満たす実行環境の型としたとき、[`sender-in-of`](sender-in-of.md)`<`[`schedule_result_t`](schedule_result_t.md)`<Sch>, Env>`のモデルとなること。

[`copyable`](/reference/concepts/copyable.md)`<remove_cvref_t<Sch>>`および[`equality_comparable`](/reference/concepts/equality_comparable.md)`<remove_cvref_t<Sch>>`により要求される操作は、例外で終了してはならない。
これらの操作やScheduler型の[`schedule`](schedule.md)関数は、異なるスレッドから同時に操作を呼び出す可能性がある場合でも、データ競合を引き起こしてはならない。

あるScheduler型`Sch`の2つの値`sch1`と`sch2`に対して、`sch1`と`sch2`が同じ実行リソースを共有する場合に限って、`sch1 == sch2`は`true`となる。

あるScheduler`sch`に対して、式[`get_completion_scheduler`](get_completion_scheduler.md)`<`[`set_value_t`](set_value.md)`>(`[`get_env`](get_env.md)`(`[`schedule`](schedule.md)`(sch)))`が適格なとき、`sch`と等しいこと。

あるScheduler`sch`、型`T`、部分式のパック`envs`に対して、下記の式がいずれも不適格となる、もしくはともに適格かつ同じ型を持つこと。

- [`get_completion_domain`](get_completion_domain.md)`<T>(sch, envs...)`
- [`get_completion_domain`](get_completion_domain.md)`<T>(`[`get_env`](get_env.md)`(`[`schedule`](schedule.md)`(sch)), envs...)`

同様に、下記の式がいずれも不適格となる、もしくはともに適格かつ同じ型と値を持つこと。

- [`get_completion_scheduler`](get_completion_scheduler.md)`<T>(sch, envs...)`
- [`get_completion_scheduler`](get_completion_scheduler.md)`<T>(`[`get_env`](get_env.md)`(`[`schedule`](schedule.md)`(sch)), envs...)`

Scheduler型のデストラクタは、[`schedule`](schedule.md)が返すSenderオブジェクトに接続されたReceiverの完了を待機してブロックしてはならない。


## 説明専用エンティティ
### 式`SCHED-ENV`
説明用のScheduler`sch`に対して、式`SCHED-ENV(sch)`は[`queryable`](../queryable.md)を満たす型の式`o`となり、下記を満たす。

- 式`o.query(`[`get_start_scheduler`](get_start_scheduler.md)`)`は、型および値が`sch`と等しい右辺値。
- 式`o.query(`[`get_domain`](get_domain.md)`)`は`sch.query(`[`get_domain`](get_domain.md)`)`と等価。


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::run_loop loop;
  ex::scheduler auto sch = loop.get_scheduler();
}
```
* ex::scheduler[color ff0000]
* ex::run_loop[link run_loop.md]
* get_scheduler()[link run_loop/get_scheduler.md]

### 出力
```
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
- [`execution::schedule`](schedule.md)
- [`execution::get_completion_scheduler`](get_completion_scheduler.md)
- [`execution::get_parallel_scheduler`](get_parallel_scheduler.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3396R1 std::execution wording fixes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3396r1.html)
- [LWG4354. Reconsider `weakly_parallel` as the default `forward_progress_guarantee`](https://cplusplus.github.io/LWG/issue4354)
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
- [P3941R4 Scheduler Affinity](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3941r4.html)
