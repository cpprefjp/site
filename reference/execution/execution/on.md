# on
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct on_t { unspecified };
  inline constexpr on_t on{};
}
```
* unspecified[italic]

## 概要
`on`は、2種類の呼び出し形式サポートするSenderアダプタである。

- `on(sch, sndr)` : [Sender](sender.md)`sndr`を[Scheduler](scheduler.md)`sch`に関連付けられた実行リソースに属する実行エージェント上で開始し、完了後に`on`Senderが開始された実行リソースへと実行制御を戻す。
- `on(sndr, sch, closure)` : [Sender](sender.md)`sndr`の完了後に、[Scheduler](scheduler.md)`sch`に関連付けられた実行リソースに属する実行エージェントへ実行を移し、`sndr`の完了結果をもってSenderアダプタクロージャ`closure`を実行し、Sender`sndr`が完了された実行リソースへと実行制御を戻す。

`on`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。


## 効果
### 呼び出し式 `on(sch, sndr)`
説明用の式`sch`と`sndr`に対して、下記いずれかが`true`となるとき呼び出し式`on(sch, sndr)`は不適格となる。

- `decltype((sch))`が[`scheduler`](scheduler.md)を満たさない、もしくは
- `decltype((sndr))`が[`sender`](sender.md)を満たさず、かつ[パイプ可能Senderアダプタクロージャオブジェクト](sender_adaptor_closure.md)ではない、もしくは
- `decltype((sndr))`が[`sender`](sender.md)を満たし、かつ[パイプ可能Senderアダプタクロージャオブジェクト](sender_adaptor_closure.md)である。

そうでなければ、呼び出し式`on(sch, sndr)`は`sch`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(
  query-or-default(get_domain, sch, default_domain()),
  make-sender(on, sch, sndr))
```
* transform_sender[link transform_sender.md]
* query-or-default[link query-or-default.md.nolink]
* get_domain[link get_domain.md]
* default_domain()[link default_domain.md]
* make-sender[link make-sender.md]


### 呼び出し式 `on(sndr, sch, closure)`
説明用の式`sndr`, `sch`, `closure`に対して、下記いずれかが`true`となるとき呼び出し式`on(sndr, sch, closure)`は不適格となる。

- `decltype((sch))`が[`scheduler`](scheduler.md)を満たさない、もしくは
- `decltype((sndr))`が[`sender`](sender.md)を満たさない、もしくは
- `closure`が[パイプ可能Senderアダプタクロージャオブジェクト](sender_adaptor_closure.md)ではない。

そうでなければ、呼び出し式`on(sndr, sch, closure)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(
  get-domain-early(sndr),
  make-sender(on, product-type{sch, closure}, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]
* product-type[link product-type.md]


### Senderアルゴリズムタグ `on`
説明用の式`out_sndr`と`env`に対して、型`OutSndr`を`decltype((out_sndr))`とし、型`Env`を`decltype((env))`とする。[`sender-for`](sender-for.md)`<OutSndr, on_t> == false`のとき、式`on.transform_env(out_sndr, env)`および式`on.transform_sender(out_sndr, env)`はいずれも不適格となる。

そうでなければ、下記の通り。

- 式`on.transform_env(out_sndr, env)`は下記と等価。

    ```cpp
    auto&& [_, data, _] = out_sndr;
    if constexpr (scheduler<decltype(data)>) {
      return JOIN-ENV(SCHED-ENV(std::forward_like<OutSndr>(data)), FWD-ENV(std::forward<Env>(env)));
    } else {
      return std::forward<Env>(env);
    }
    ```
    * scheduler[link scheduler.md]
    * JOIN-ENV[link ../queryable.md]
    * SCHED-ENV[link scheduler.md]
    * FWD-ENV[link ../forwarding_query.md]

- 式`on.transform_sender(out_sndr, env)`は下記と等価。

    ```cpp
    auto&& [_, data, child] = out_sndr;
    if constexpr (scheduler<decltype(data)>) {
      auto orig_sch =
        query-with-default(get_scheduler, env, not-a-scheduler());

      if constexpr (same_as<decltype(orig_sch), not-a-scheduler>) {
        return not-a-sender{};
      } else {
        return continues_on(
          starts_on(std::forward_like<OutSndr>(data), std::forward_like<OutSndr>(child)),
          std::move(orig_sch));
      }
    } else {
      auto& [sch, closure] = data;
      auto orig_sch = query-with-default(
        get_completion_scheduler<set_value_t>,
        get_env(child),
        query-with-default(get_scheduler, env, not-a-scheduler()));

      if constexpr (same_as<decltype(orig_sch), not-a-scheduler>) {
        return not-a-sender{};
      } else {
        return write-env(
          continues_on(
            std::forward_like<OutSndr>(closure)(
              continues_on(
                write-env(std::forward_like<OutSndr>(child), SCHED-ENV(orig_sch)),
                sch)),
            orig_sch),
          SCHED-ENV(sch));
      }
    }
    ```
    * scheduler[link scheduler.md]
    * get_scheduler[link get_scheduler.md]
    * continues_on[link continues_on.md]
    * starts_on[link starts_on.md]
    * get_completion_scheduler[link get_completion_scheduler.md]
    * set_value_t[link set_value.md]
    * get_env[link get_env.md]
    * query-with-default[link query-with-default.md]
    * write-env[link write-env.md]
    * SCHED-ENV[link scheduler.md]
    * std::move[link /reference/utility/move.md]

説明専用のクラス`not-a-scheduler`を未規定な空のクラス型、`not-a-sender`を下記の通り定義する。

```cpp
struct not-a-sender {
  using sender_concept = sender_t;

  auto get_completion_signatures(auto&&) const {
    return see below;
  }
};
```
* sender_t[link sender.md]
* see below[italic]

メンバ関数`get_completion_signatures`は[`completion_signatures`](completion_signatures.md)クラステンプレートの特殊化とは異なる型のオブジェクトを返す。
処理系（標準ライブラリ実装者）は、この型を用いてユーザにエラー理由を通知することが推奨される。


## カスタマイゼーションポイント
Senderアルゴリズム構築時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。

- 呼び出し式`on(sch, sndr)` : [Scheduler](scheduler.md)`sch`に[関連付けられた実行ドメイン](query-or-default.md.nolink)
- 呼び出し式`on(sndr, sch, closure)` : [Sender](sender.md)`sndr`に[関連付けられた実行ドメイン](get-domain-early.md)

[Receiver](receiver.md)との[接続(connect)](connect.md)時に、[関連付けられた実行ドメイン](get-domain-late.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では`on.transform_sender(out_sndr, env)`が呼ばれ、前述仕様通りのSenderへと変換される。


### 呼び出し式 `on(sch, sndr)`
説明用の式`out_sndr`を`on(sch, sndr)`の戻り値[Sender](sender.md)とし、型`OutSndr`を`decltype((out_sndr))`とする。式`out_rcvr`を[`sender_in`](sender_in.md)`<OutSndr, Env> == true`となる[環境](../queryable.md)`Env`に関連付けられた[Receiver](receiver.md)とする。`out_sndr`と`out_rcvr`との[接続(connect)](connect.md)結果[Operation State](operation_state.md)への左辺値参照を`op`としたとき、[`start`](start.md)`(op)`呼び出しは下記を満たすべき。

- 現在のScheduler[`get_scheduler`](get_scheduler.md)`(`[`get_env`](get_env.md)`(rcvr))`を記憶する。
- [Scheduler](scheduler.md)`sch`に関連付けられた実行リソースに属する実行エージェント上で`sndr`を開始する。
- `sndr`の完了後に、手順1で記憶したSchedulerに関連付けられた実行リソースに実行制御を戻す。
- `sndr`の非同期操作の結果を`out_rcvr`へ転送する。

いずれかのスケジューリングが失敗した場合、未規定の実行エージェント上で`out_rcvr`の[エラー完了](set_error.md)が行われるべき。


### 呼び出し式 `on(sndr, sch, closure)`
説明用の式`out_sndr`を`on(sndr, sch, closure)`の戻り値[Sender](sender.md)とし、型`OutSndr`を`decltype((out_sndr))`とする。式`out_rcvr`を[`sender_in`](sender_in.md)`<OutSndr, Env> == true`となる[環境](../queryable.md)`Env`に関連付けられた[Receiver](receiver.md)とする。`out_sndr`と`out_rcvr`との[接続(connect)](connect.md)結果[Operation State](operation_state.md)への左辺値参照を`op`としたとき、[`start`](start.md)`(op)`呼び出しは下記を満たすべき。

- 下記のうち最初に適格となるものを、現在のSchedulerとして記憶する。
    - [`get_completion_scheduler`](get_completion_scheduler.md)`<`[`set_value_t`](set_value.md)`>(`[`get_env`](get_env.md)`(rcvr))`
    - [`get_scheduler`](get_scheduler.md)`(`[`get_env`](get_env.md)`(rcvr))`
- `sndr`を現在の実行エージェント上で開始する。
- `sndr`の完了後に、[Scheduler](scheduler.md)`sch`に関連付けられた実行リソースの実行エージェントに実行制御を移す。
- `sndr`の非同期操作の結果を、Sender`closure(S)`と接続して開始するかのように転送する。ここで`S`は`sndr`の非同期操作の結果と同期的に完了するSenderとする。
- 前手順で開始した非同期操作が完了したら、手順1で記憶したSchedulerに関連付けられた実行リソースに実行制御を戻し、非同期操作の結果を`out_rcvr`へ転送する。

いずれかのスケジューリングが失敗した場合、未規定の実行エージェント上で`out_rcvr`の[エラー完了](set_error.md)が行われるべき。


## 例

### 例1: on(sch, sndr)
```cpp
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

  ex::sender auto snd0 =
    ex::then(ex::just(), []() {
      std::println("on worker#{}", std::this_thread::get_id());
      return 6;
    });
  ex::sender auto snd1 = ex::on(sch, snd0);
  ex::sender auto snd2 =
    ex::then(snd1, [](int n) {
      std::println("on main#{}", std::this_thread::get_id());
      return n * 7;
    });

  auto [val] = std::this_thread::sync_wait(std::move(snd2)).value();
  std::println("val={}", val);

  loop.finish();
}
```
* ex::on[color ff0000]
* ex::run_loop[link run_loop.md]
* ex::sender[link sender.md]
* ex::scheduler[link scheduler.md]
* ex::just[link just.md]
* ex::then[link then.md]
* get_scheduler()[link run_loop/get_scheduler.md]
* run()[link run_loop/run.md]
* finish()[link run_loop/finish.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]
* std::move[link /reference/utility/move.md]
* std::this_thread::get_id()[link /reference/thread/this_thread/get_id.md]

#### 出力例
```
main#133519926773568
start worker#133519921645120
on worker#133519921645120
on main#133519926773568
val=42
```

### 例2: on(sndr, sch, closure)
```cpp
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
    ex::just()
    | ex::then([]() {
        std::println("on main#{}", std::this_thread::get_id());
        return 2;
      })
    | ex::on(sch, ex::then([](int n) {
        std::println("on worker#{}", std::this_thread::get_id());
        return n * 3;
      }))
    | ex::then([](int n) {
        std::println("on main#{}", std::this_thread::get_id());
        return n * 7;
      });

  auto [val] = std::this_thread::sync_wait(std::move(sndr)).value();
  std::println("val={}", val);

  loop.finish();
}
```
* ex::on[color ff0000]
* ex::run_loop[link run_loop.md]
* ex::sender[link sender.md]
* ex::scheduler[link scheduler.md]
* ex::just[link just.md]
* ex::then[link then.md]
* get_scheduler()[link run_loop/get_scheduler.md]
* run()[link run_loop/run.md]
* finish()[link run_loop/finish.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]
* std::move[link /reference/utility/move.md]
* std::this_thread::get_id()[link /reference/thread/this_thread/get_id.md]

#### 出力例
```
main#133519926773568
start worker#133519921645120
on main#133519926773568
on worker#133519921645120
on main#133519926773568
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
- [`execution::starts_on`](starts_on.md)
- [`execution::continues_on`](continues_on.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
