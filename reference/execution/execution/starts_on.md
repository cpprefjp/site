# starts_on
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct starts_on_t { unspecified };
  inline constexpr starts_on_t starts_on{};
}
```
* unspecified[italic]

## 概要
`starts_on`は、入力[Sender](sender.md)を指定[Scheduler](scheduler.md)に関連付けられた実行リソースに属する実行エージェント上で開始するSenderアダプタである。


## 効果
説明用の式`sch`と`sndr`に対して、`decltype((sch))`が[`scheduler`](scheduler.md)を満たさない、もしくは`decltype((sndr))`が[`sender`](sender.md)を満たさないとき、呼び出し式`starts_on(sch, sndr)`は不適格となる。

そうでなければ、呼び出し式`starts_on(sch, sndr)`は`sch`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(
  query-or-default(get_domain, sch, default_domain()),
  make-sender(starts_on, sch, sndr))
```
* transform_sender[link transform_sender.md]
* query-or-default[link query-or-default.md.nolink]
* get_domain[link get_domain.md]
* default_domain()[link default_domain.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `starts_on`
説明用の式`out_sndr`と`env`に対して、型`OutSndr`を`decltype((out_sndr))`とする。[`sender-for`](sender-for.md)`<OutSndr, starts_on_t> == false`のとき、式`starts_on.transform_env(out_sndr, env)`および式`starts_on.transform_sender(out_sndr, env)`はいずれも不適格となる。

そうでなければ、下記の通り。

- 式`starts_on.transform_env(out_sndr, env)`は下記と等価。

    ```cpp
    auto&& [_, sch, _] = out_sndr;
    return JOIN-ENV(SCHED-ENV(sch), FWD-ENV(env));
    ```
    * JOIN-ENV[link JOIN-ENV.md.nolink]
    * SCHED-ENV[link SCHED-ENV.md.nolink]
    * FWD-ENV[link ../forwarding_query.md]

- 式`starts_on.transform_sender(out_sndr, env)`は下記と等価。

    ```cpp
    auto&& [_, sch, sndr] = out_sndr;
    return let_value(
      schedule(sch),
      [sndr = std::forward_like<OutSndr>(sndr)]() mutable
        noexcept(is_nothrow_move_constructible_v<decay_t<OutSndr>>) {
        return std::move(sndr);
      });
    ```
    * let_value[link let_value.md]
    * schedule[link schedule.md]
    * is_nothrow_move_constructible_v[link /reference/type_traits/is_nothrow_move_constructible.md]
    * decay_t[link /reference/type_traits/decay.md]
    * std::move[link /reference/utility/move.md]


## カスタマイゼーションポイント
Senderアルゴリズム構築時に、[Scheduler](scheduler.md)`sch`に[関連付けられた実行ドメイン](query-or-default.md.nolink)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](../execution/default_domain.md)では無変換。

[Receiver](receiver.md)との[接続(connect)](connect.md)時に、[関連付けられた実行ドメイン](get-domain-late.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](../execution/default_domain.md)では`starts_on.transform_sender(out_sndr, env)`が呼ばれ、前述仕様通りのSenderへと変換される。

説明用の式`out_sndr`を`starts_on(sch, sndr)`の戻り値[Sender](sender.md)とし、型`OutSndr`を`decltype((out_sndr))`とする。式`out_rcvr`を[`sender_in`](sender_in.md)`<OutSndr, Env> == true`となる[環境](../queryable.md)`Env`に関連付けられた[Receiver](receiver.md)とする。`out_sndr`と`out_rcvr`との[接続(connect)](connect.md)結果[Operation State](operation_state.md)への左辺値参照を`op`としたとき、

- 呼び出し[`start`](start.md)`(op)`は、[Scheduler](scheduler.md)`sch`に関連付けられた実行リソースに属する実行エージェント上で入力[Sender](sender.md)`sndr`を開始すべき。
- `sch`上でのスケジューリングが失敗した場合、未規定の実行エージェント上で`out_rcvr`の[エラー完了](set_error.md)が行われるべき。


## 例
```cpp example
#include <thread>
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  std::println("main#{}", std::this_thread::get_id());

  ex::run_loop loop;
  std::jthread worker{[&]{
    std::println("start worker#{}", std::this_thread::get_id());
    loop.run();
  }};

  ex::scheduler auto sch = loop.get_scheduler();
  ex::sender auto sndr =
    ex::starts_on(sch, ex::just(21))
    | ex::then([](int n) {
      std::println("on worker#{}", std::this_thread::get_id());
      return n * 2;
    });

  auto [val] = std::this_thread::sync_wait(std::move(sndr)).value();
  std::println("val={}", val);

  loop.finish();
}
```
* ex::starts_on[color ff0000]
* ex::run_loop[link run_loop.md]
* ex::sender[link sender.md]
* ex::scheduler[link scheduler.md]
* ex::then[link then.md]
* get_scheduler()[link run_loop/get_scheduler.md]
* run()[link run_loop/run.md]
* finish()[link run_loop/finish.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]
* std::move[link /reference/utility/move.md]
* std::this_thread::get_id()[link /reference/thread/this_thread/get_id.md]


### 出力例
```
main#126057012819776
start worker#126057007023680
on worker#126057007023680
val=42
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
- [`execution::continues_on`](continues_on.md)
- [`execution::on`](on.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
