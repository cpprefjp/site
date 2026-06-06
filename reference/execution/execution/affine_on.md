# affine_on
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct affine_on_t { unspecified };
  inline constexpr affine_on_t affine_on{};
}
```
* unspecified[italic]

## 概要
`affine_on`は、[Receiver](receiver.md)の[Scheduler](scheduler.md)上で完了させるSenderアダプタである。
アダプト対象Senderが正しいScheduler上で完了すると判断できるとき、アルゴリズムはスケジューリング操作を回避できる。

`affine_on`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。


## 効果
説明用の式`sndr`に対して、`decltype((sndr))`が[`sender`](sender.md)を満たさないとき、呼び出し式`affine_on(sndr)`は不適格となる。

そうでなければ、呼び出し式`affine_on(sndr)`は下記と等価。

```cpp
make-sender(affine_on, env<>(), sndr)
```
* make-sender[link make-sender.md]
* env<>[link env.md]


### Senderアルゴリズムタグ `affine_on`
型が[`scheduler`](scheduler.md)のモデルである部分式`sch`に対して、説明用の式`UNSTOPPABLE-SCHEDULER(sch)`を、その型が[`scheduler`](scheduler.md)のモデルである式`e`とする。

- 式[`schedule`](schedule.md)`(e)`は[`unstoppable`](unstoppable.md)`(`[`schedule`](schedule.md)`(sch))`と等価な式。
- 任意の[クエリオブジェクト](../queryable.md)`q`と部分式のパック`args...`に対して、式`e.query(q, args...)`は`sch.query(q, args...)`と等価な式。
- 式`e == UNSTOPPABLE-SCHEDULER(other)`は`sch == other`と等価な式。

説明用の式`sndr`と`ev`に対して、[`sender-for`](sender-for.md)`<decltype((sndr)), affine_on_t> == false`のとき、式`affine_on.transform_sender(sndr, ev)`は不適格となる。

そうでなければ、式`affine_on.transform_sender(sndr, ev)`は下記と等価。

```cpp
auto& [_, _, child] = sndr;
if constexpr (requires { std::forward_like<Sndr>(child).affine_on(); }) {
  return std::forward_like<Sndr>(child).affine_on();
} else {
  return continues_on(std::forward_like<Sndr>(child),
                      UNSTOPPABLE-SCHEDULER(get_start_scheduler(ev)));
}
```
* continues_on[link continues_on.md]
* get_start_scheduler[link get_start_scheduler.md]


## カスタマイゼーションポイント
[Receiver](receiver.md)接続時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。

説明用の式`out_sndr`を`affine_on(sndr)`の戻り値[Sender](sender.md)とし、型`OutSndr`を`decltype((out_sndr))`とする。式`out_rcvr`を[環境](../queryable.md)`Env`に関連付けられた[Receiver](receiver.md)とする。[`get_start_scheduler`](get_start_scheduler.md)`(`[`get_env`](get_env.md)`(out_rcvr))`が不適格もしくは[`infallible-scheduler](infallible-scheduler.md)`<Env>`を満たさないとき、式[`get_completion_signatures`](get_completion_signatures.md)`<OutSndr, Env>()`の評価は例外で終了する。`out_sndr`と`out_rcvr`との[接続(connect)](connect.md)結果[Operation State](operation_state.md)への左辺値参照を`op`としたとき、

- 呼び出し[`start`](start.md)`(op)`は、現在の実行エージェント上で入力[Sender](sender.md)`sndr`を開始し、[Scheduler](scheduler.md)`sch`に関連付けられた実行リソースに属する実行エージェント上で`out_rcvr`の完了操作が実行される。
- 現在の実行リソースが`sch`に関連付けられた実行リソースと同一のとき、[`start`](start.md)`(op)`の完了よりも前に`out_rcvr`の完了操作が呼ばれる可能性がある。


## 備考
`affine_on`は[タスクコルーチン](task.md)のScheduler Affinity実現に用いられる。
詳細仕様は[`task::promise::await_transform`](task/promise_type/await_transform.md)を参照のこと。

開始された[Scheduler](scheduler.md)上で再開(resume)されると分かっている[Sender](sender.md)に対して、処理系（標準ライブラリ実装）は`affine_on`メンバ関数を提供すべきである。そのようなSenderの例として、[`just`](just.md), [`just_error`](just_error.md), [`just_stopped`](just_stopped.md), [`read_env`](read_env.md), [`write_env`](write_env.md)等がある。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::task`](task.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
- [P3941R4 Scheduler Affinity](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3941r4.html)
