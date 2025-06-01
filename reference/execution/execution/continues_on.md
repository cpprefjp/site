# continues_on
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct continues_on_t { unspecified };
  inline constexpr continues_on_t continues_on{};
}
```
* unspecified[italic]

## 概要
`continues_on`は、指定[Scheduler](scheduler.md)上で完了させるSenderアダプタである。

`continues_on`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。


## 効果
説明用の式`sch`と`sndr`に対して、`decltype((sch))`が[`scheduler`](scheduler.md)を満たさない、もしくは`decltype((sndr))`が[`sender`](sender.md)を満たさないとき、呼び出し式`continues_on(sndr, sch)`は不適格となる。

そうでなければ、呼び出し式`continues_on(sndr, sch)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr), make-sender(continues_on, sch, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `continues_on`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<continues_on_t> : default-impls {
    static constexpr auto get-attrs =
      [](const auto& data, const auto& child) noexcept -> decltype(auto) {
        return JOIN-ENV(SCHED-ATTRS(data), FWD-ENV(get_env(child)));
      };
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* JOIN-ENV[link ../queryable.md]
* SCHED-ATTRS[link scheduler.md]
* FWD-ENV[link ../forwarding_query.md]
* get_env[link get_env.md]

説明用の式`sndr`と`env`に対して、型`Sndr`を`decltype((sndr))`とする。[`sender-for`](sender-for.md)`<Sndr, continues_on_t> == false`のとき、式`continues_on.transform_sender(sndr, env)`は不適格となる。

そうでなければ、式`continues_on.transform_sender(sndr, env)`は下記と等価。

```cpp
auto [_, data, child] = sndr;
return schedule_from(std::move(data), std::move(child));
```
* schedule_from[link schedule_from.md]
* std::move[link /reference/utility/move.md]


## カスタマイゼーションポイント
Senderアルゴリズム構築時に、[Sender](sender.md)`sndr`に[関連付けられた実行ドメイン](get-domain-early.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。

[Receiver](receiver.md)との[接続(connect)](connect.md)時に、[Scheduler](scheduler.md)`sch`に[関連付けられた実行ドメイン](get-domain-late.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では`continues_on.transform_sender(out_sndr, env)`が呼ばれ、[`schedule_from`](schedule_from.md)Senderへと変換される。

説明用の式`out_sndr`を`continues_on(sndr, sch)`の戻り値[Sender](sender.md)とし、型`OutSndr`を`decltype((out_sndr))`とする。式`out_rcvr`を[`sender_in`](sender_in.md)`<OutSndr, Env> == true`となる[環境](../queryable.md)`Env`に関連付けられた[Receiver](receiver.md)とする。`out_sndr`と`out_rcvr`との[接続(connect)](connect.md)結果[Operation State](operation_state.md)への左辺値参照を`op`としたとき、

- 呼び出し[`start`](start.md)`(op)`は、現在の実行エージェント上で入力[Sender](sender.md)`sndr`を開始し、[Scheduler](scheduler.md)`sch`に関連付けられた実行リソースに属する実行エージェント上で`out_rcvr`の完了操作を実行すべき。
- `sch`上でのスケジューリングが失敗した場合、未規定の実行エージェント上で`out_rcvr`の[エラー完了](set_error.md)が行われるべき。


## 備考
`continues_on`Senderアルゴリズムの動作は、[Receiver](receiver.md)[接続(connect)](connect.md)時の[`schedule_from`](schedule_from.md)Senderアルゴリズムへの変換、および説明専用の[`get-domain-late`](get-domain-late.md)関数テンプレートでの特別扱いによって実現される。


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
    ex::just(2)
    | ex::then([](int n) {
        std::println("on main#{}", std::this_thread::get_id());
        return n * 3;
      })
    | ex::continues_on(sch)
    | ex::then([](int n) {
        std::println("on worker#{}", std::this_thread::get_id());
        return n * 7;
      });

  auto [val] = std::this_thread::sync_wait(std::move(sndr)).value();
  std::println("val={}", val);

  loop.finish();
}
```
* ex::continues_on[color ff0000]
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

### 出力例
```
main#137071308048192
on main#137071308048192
start worker#137071301756480
on worker#137071301756480
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
- [`execution::on`](on.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
