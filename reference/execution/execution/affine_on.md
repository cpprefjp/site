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
`affine_on`は、指定[Scheduler](scheduler.md)上で完了させるSenderアダプタである。
アダプト対象Senderが正しいScheduler上で完了すると判断できるとき、アルゴリズムはスケジューリング操作を回避できる。

`affine_on`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。


## 効果
説明用の式`sch`と`sndr`に対して、`decltype((sch))`が[`scheduler`](scheduler.md)を満たさない、もしくは`decltype((sndr))`が[`sender`](sender.md)を満たさないとき、呼び出し式`affine_on(sndr, sch)`は不適格となる。

そうでなければ、呼び出し式`affine_on(sndr, sch)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr), make-sender(affine_on, sch, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `affine_on`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<affine_on_t> : default-impls {
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


## カスタマイゼーションポイント
Senderアルゴリズム構築時および[Receiver](receiver.md)接続時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。

説明用の式`out_sndr`を`affine_on(sndr, sch)`の戻り値[Sender](sender.md)とし、型`OutSndr`を`decltype((out_sndr))`とする。式`out_rcvr`を[`sender_in`](sender_in.md)`<OutSndr, Env> == true`となる[環境](../queryable.md)`Env`に関連付けられた[Receiver](receiver.md)とする。`out_sndr`と`out_rcvr`との[接続(connect)](connect.md)結果[Operation State](operation_state.md)への左辺値参照を`op`としたとき、

- 呼び出し[`start`](start.md)`(op)`は、現在の実行エージェント上で入力[Sender](sender.md)`sndr`を開始し、[Scheduler](scheduler.md)`sch`に関連付けられた実行リソースに属する実行エージェント上で`out_rcvr`の完了操作が実行される。
- 現在の実行リソースが`sch`に関連付けられた実行リソースと同一のとき、[`start`](start.md)`(op)`の完了よりも前に`out_rcvr`の完了操作が呼ばれる可能性がある。
- `sch`上でのスケジューリングが失敗した場合、未規定の実行エージェント上で`out_rcvr`の[エラー完了](set_error.md)が行われるべき。


## 備考
`affine_on`アルゴリズムの動作は[`continues_on`](continues_on.md)と等価だが、処理系は不要なスケジューリング操作を省略（最適化）する可能性がある。

`affine_on`は[タスクコルーチン](task.md)のScheduler Affinity実現に用いられる。
詳細仕様は[`task::promise::await_transform`](task/promise_type/await_transform.md)を参照のこと。


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
