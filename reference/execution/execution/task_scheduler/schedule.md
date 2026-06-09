# schedule
* execution[meta header]
* std::execution[meta namespace]
* task_scheduler[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
see below schedule();
```

## 概要
保持中[Scheduler](../scheduler.md)の[スケジュールSender](../schedule.md)を返す。


## 戻り値
その型が[`sender`](../sender.md)のモデルであり、下記を満たす右辺値`ts-sndr`。

- [`get_completion_scheduler`](../get_completion_scheduler.md)`<`[`set_value_t`](../set_value.md)`>(`[`get_env`](../get_env.md)`(ts-sndr))`が`*this`と等しい。
- [`get_completion_domain`](../get_completion_domain.md)`<`[`set_value_t`](../set_value.md)`>(`[`get_env`](../get_env.md)`(ts-sndr))`が`ts-domain()`と等価な式である。
- [Receiver](../receiver.md)`rcvr`が`ts-sndr`に接続され、結果の[Opearation State](../operation_state.md)が開始されるとき、次の値で`sch_->`[`schedule`](../parallel_scheduler_replacement/parallel_scheduler_backend/schedule.md)`(r, s)`を呼び出す。
    - `r`は基底クラス[`parallel_scheduler_replacement::receiver_proxy`](../parallel_scheduler_replacement/receiver_proxy.md)を持つ`rcvr`のプロキシであり、かつ
    - `s`は`r`に対する[事前確保バックエンドストレージ](../parallel_scheduler.md)である。
- 任意の型`E`に対して、[`unstoppable_token`](/reference/stop_token/unstoppable_token.md)`<`[`stop_token_of_t`](../../stop_token_of_t.md)`<E>>`が`true`のとき、[`completion_signatures_of_t`](../completion_signatures_of_t.md)`<decltype(ts-sndr)>, E>`は[`completion_signatures`](../completion_signatures.md)`<`[`set_value_t`](../set_value.md)`()>`を表す。そうでなければ、[`completion_signatures`](../completion_signatures.md)`<`[`set_value_t`](../set_value.md)`(),` [`set_stopped_t`](../set_stopped.md)`()>`を表す。


## 説明専用エンティティ
### 式`WARP-RCVR`
[`receiver_proxy`](../parallel_scheduler_replacement/receiver_proxy.md)から派生した型の左辺値`r`に対して、`WARP-RCVR(r)`を[`receiver`](../receiver.md)のモデルであり、その完了ハンドラが`r`の対応する完了ハンドラを呼び出すような型のオブジェクトとする。

### クラステンプレート`backend-for`
```cpp
namespace std::execution {
  template<scheduler Sch>
  class task_scheduler::backend-for
    : public parallel_scheduler_replacement::parallel_scheduler_backend {  // exposition only
  public:
    explicit backend-for(Sch sch) : sched_(std::move(sch)) {}

    void schedule(receiver_proxy& r, span<byte> s) noexcept override;
    void schedule_bulk_chunked(size_t shape, bulk_item_receiver_proxy& r,
                               span<byte> s) noexcept override;
    void schedule_bulk_unchunked(size_t shape, bulk_item_receiver_proxy& r,
                                 span<byte> s) noexcept override;

  private:
    Sch sched_;
  };
}
```
* scheduler[link ../scheduler.md]
* parallel_scheduler_replacement::parallel_scheduler_backend[link ../parallel_scheduler_replacement/parallel_scheduler_backend.md]
* receiver_proxy[link ../parallel_scheduler_replacement/receiver_proxy.md]
* bulk_item_receiver_proxy[link ../parallel_scheduler_replacement/bulk_item_receiver_proxy.md]
* span[link /reference/span/span.md]
* byte[link /reference/cstddef/byte.md]
* std::move[link /reference/utility/move.md]

`env`を部分式のパックとしたとき、値完了シグネチャ[`set_value_t`](../set_value.md)`()`のみを持ち式[`get_completion_scheduler`](../get_completion_scheduler.md)`<set_value_t>(`[`get_env`](../get_env.md)`(just-sndr-like), env...)`が[`get_completion_scheduler`](../get_completion_scheduler.md)`<set_value_t>(sched_, env...)`と等価な式であるような[`Sender`](../sender.md)を`just-sndr-like`とする。

```cpp
void schedule(receiver_proxy& r, span<byte> s) noexcept override;
```
* receiver_proxy[link ../parallel_scheduler_replacement/receiver_proxy.md]

- 効果 : [`connect`](../connect.md)`(`[`schedule`](../schedule.md)`(sched_), WRAP-RCVR(r))`で[Operation State](../operation_state.md)`os`を構築し、[`start`](../start.md)`(os)`を呼び出す。

```cpp
void schedule_bulk_chunked(size_t shape, bulk_item_receiver_proxy& r,
                           span<byte> s) noexcept override;
```
* bulk_item_receiver_proxy[link ../parallel_scheduler_replacement/bulk_item_receiver_proxy.md]
* span[link /reference/span/span.md]
* byte[link /reference/cstddef/byte.md]

- 効果 : 説明用の`chunk_size`を`shape`以下の整数、`chunk_num`を`(shape + chunk_size - 1) / chunk_size`、`m`を`(i + 1) * chunk_size`と`shape`のうち小さい方として、整数`i`に対して`fn(i)`が`r.execute(i * chunk_sie, m)`を呼び出す関数オブジェクト`fn`とする。下記の式によって[Operation State](../operation_state.md)`os`を構築し、[`start`](../start.md)`(os)`を呼び出す。

    ```cpp
    connect(bulk(just-sndr-like, par, num_chunks, fn), WRAP-RCVR(r))
    ```
    * connect[link ../connect.md]
    * bulk[link ../bulk.md]
    * par[link ../execution_policy.md]

```cpp
void schedule_bulk_unchunked(size_t shape, bulk_item_receiver_proxy& r,
                             span<byte> s) noexcept override;
```
* bulk_item_receiver_proxy[link ../parallel_scheduler_replacement/bulk_item_receiver_proxy.md]
* span[link /reference/span/span.md]
* byte[link /reference/cstddef/byte.md]

- 効果 : 整数`i`に対して`fn(i)`が`r.execute(i, i + 1)`を呼び出す関数オブジェクト`fn`とする。下記の式によって[Operation State](../operation_state.md)`os`を構築し、[`start`](../start.md)`(os)`を呼び出す。

    ```cpp
    connect(bulk(just-sndr-like, par, shape, fn), WRAP-RCVR(r))
    ```
    * connect[link ../connect.md]
    * bulk[link ../bulk.md]
    * par[link ../execution_policy.md]


### クラス`ts-domain`
```cpp
namespace std::execution {
  class task_scheduler::ts-domain : public default_domain {  // exposition only
  public:
    template<class BulkSndr, class Env>  // exposition only
    static constexpr auto transform_sender(set_value_t, BulkSndr&& bulk_sndr, const Env& env)
      noexcept(see below);
  };
}
```
* default_domain[link ../default_domain.md]
* set_value_t[link ../set_value.md]

```cpp
template<class BulkSndr, class Env>
static constexpr auto transform_sender(BulkSndr&& bulk_sndr, const Env& env)
  noexcept(is_nothrow_constructible_v<decay_t<BulkSndr>, BulkSndr>);
```
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]
* decay_t[link /reference/type_traits/decay.md]

- テンプレートパラメータ制約 :
    - [`sender_in`](../sender_in.md)`<BulkSndr, Env>`が`true`
    - 式`auto(`[`std::forward`](/reference/utility/forward.md)`<BulkSndr>(bulk_sndr))`が適格
    - 下記のいずれかが`true`
        - [`sender-for`](../sender-for.md)`<BulkSndr,` [`bulk_chunked_t`](../bulk_chunked.md)`>`
        - [`sender-for`](../sender-for.md)`<BulkSndr,` [`bulk_unchunked_t`](../bulk_unchunked.md)`>`
- 効果 : 下記と等価
    ```cpp
    auto& [_, data, child] = bulk_sndr;
    auto& [_, shape, fn] = data;
    auto sch = call-with-default(get_completion_scheduler<set_value_t>,
                                 not-a-scheduler(), get_env(child), FWD-ENV(env));
    return e;
    ```
    * call-with-default[link ../call-with-default.md]
    * get_completion_scheduler[link ../get_completion_scheduler.md]
    * set_value_t[link ../set_value.md]
    * not-a-scheduler()[link ../not-a-scheduler.md]
    * get_env[link ../get_env.md]
    * FWD-ENV[link ../../forwarding_query.md]

    ここで、`sch`の型が[`task_scheduler`](../task_scheduler.md)ではないとき、`e`は[`not-a-sender()`](../not-a-sender.md)とする。そうでなければ、[Receiver](../receiver.md)`rvcr`と[接続(connect)](../connect.md)され結果の[Operation State](../operation_state.md)が[開始(start)](../start.md)されたとき、`child`が未規定のReceiver`R`と接続されて開始する[`sender`](../sender.md)のモデルである型の右辺値とする。

    `child`が[エラー完了](../set_error.md)もしくは[停止完了](../set_stopped.md)するとき、完了操作は変更されずに`rcvr`に転送される。そうでなければ、値完了結果からdecayコピーされたオブジェクトを指す左辺値式のパック`args`として、

    - `bulk_sndr`が[`bulk_chunked`](../bulk_chunked.md)`(child, policy, shape, fn)`と等価な式またはそのコピーの評価の結果であるとき、`r`を呼び出し可能オブジェクト`fn`と引数`args`を持つ`rcvr`に対するbulk chunkedプロキシ、`s`を`r`の[事前確保バックエンドストレージ](../parallel_scheduler.md)として、`sch_->`[`schedule_bulk_chunked`](../parallel_scheduler_replacement/parallel_scheduler_backend/schedule_bulk_chunked.md)`(shape, r, s)`が呼び出される。
    - そうでなければ、`r`を呼び出し可能オブジェクト`fn`と引数`args`を持つ`rcvr`に対するbulk unchunkedプロキシ、`s`を`r`の[事前確保バックエンドストレージ](../parallel_scheduler.md)として、`sch_->`[`schedule_bulk_unchunked`](../parallel_scheduler_replacement/parallel_scheduler_backend/schedule_bulk_unchunked.md)`(shape, r, s)`が呼び出される。
   

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execition::schedule`](../schedule.md)
- [`execition::bulk_chunked`](../bulk_chunked.md)
- [`execition::bulk_unchunked`](../bulk_unchunked.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [P3941R4 Scheduler Affinity](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3941r4.html)
- [P3927R2 `task_scheduler` support for parallel `bulk` execution](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3927r2.html)
