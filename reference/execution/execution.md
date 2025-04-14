# execution
* execution[meta header]
* std[meta namespace]
* namespace[meta id-type]
* cpp17[meta cpp]

名前空間 `std::execution` では、アルゴリズムの並列実行を許可するための実行ポリシー、汎用的な非同期実行フレームワークとしての実行制御ライブラリを定義する。
（実行制御ライブラリの一部は名前空間 `std` および `std::this_thread` で定義されるが、本ページでまとめて取り扱う。）

```cpp
namespace std::execution {
  …
}
```

## 実行ポリシー(C++17)

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`sequenced_policy`](execution/execution_policy.md) | 逐次処理の実行ポリシー型 (class) | C++17 |
| [`parallel_policy`](execution/execution_policy.md) | マルチスレッド化の実行ポリシー型 (class) | C++17 |
| [`parallel_unsequenced_policy`](execution/execution_policy.md) | マルチスレッド化／ベクトル化の実行ポリシー型 (class) | C++17 |
| [`unsequenced_policy`](execution/execution_policy.md) | ベクトル化の実行ポリシー型 (class) | C++20 |
| [`seq`](execution/execution_policy.md) | 逐次処理の実行ポリシー値 (variable) | C++17 |
| [`par`](execution/execution_policy.md) | マルチスレッド化の実行ポリシー値 (variable) | C++17 |
| [`par_unseq`](execution/execution_policy.md) | マルチスレッド化／ベクトル化の実行ポリシー値 (variable) | C++17 |
| [`unseq`](execution/execution_policy.md) | ベクトル化の実行ポリシー値 (variable) | C++20 |

実行ポリシーは全て名前空間 `std::execution` で定義される。


## 実行制御ライブラリ(C++26)

### Queries

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`forwarding_query`](forwarding_query.md.nolink) | 進行保証の問い合わせオブジェクト (customization point object) | C++26 |
| [`get_allocator`](get_allocator.md.nolink) | アロケータ取得の問い合わせオブジェクト (customization point object) | C++26 |
| [`get_stop_token`](get_stop_token.md.nolink) | 停止トークン取得の問い合わせオブジェクト (customization point object) | C++26 |
| [`stop_token_of_t`](get_stop_token.md.nolink) | 指定型から停止トークン型を取得 (alias template) | C++26 |
| [`execution::get_domain`](execution/get_domain.md.nolink) | 実行ドメイン取得の問い合わせオブジェクト (customization point object) | C++26 |
| [`execution::get_scheduler`](execution/get_scheduler.md.nolink) | Scheduler取得の問い合わせオブジェクト (customization point object) | C++26 |
| [`execution::get_delegation_scheduler`](execution/get_delegation_scheduler.md.nolink) | 委譲Scheduler取得の問い合わせオブジェクト (customization point object) | C++26 |
| [`execution::forward_progress_guarantee`](execution/forward_progress_guarantee.md.nolink) | 前進保証 (enum) | C++26 |
| [`execution::get_forward_progress_guarantee`](execution/get_forward_progress_guarantee.md.nolink) | 前進保証取得の問い合わせオブジェクト (customization point object) | C++26 |
| [`execution::get_completion_scheduler`](execution/get_completion_scheduler.md.nolink) | 完了Scheduler取得の問い合わせオブジェクト (customization point object) | C++26 |
| [`execution::get_env`](execution/get_env.md.nolink) | 環境取得の問い合わせオブジェクト (customization point object) | C++26 |
| [`execution::env_of_t`](execution/env_of_t.md.nolink) | 指定型から環境型を取得 (alias template) | C++26 |
| [`execution::prop`](execution/prop.md.nolink) | プロパティ(class template) | C++26 |
| [`execution::env`](execution/env.md.nolink) | 環境 (class template) | C++26 |

問い合わせオブジェクトは名前空間 `std` および名前空間 `std::execution` で定義される。

### Scheduler

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::scheduler`](execution/scheduler.md) | Scheduler型 (concept) | C++26 |

### Receiver

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::receiver`](execution/receiver.md) | Receiver型 (concept) | C++26 |
| [`execution::receiver_of`](execution/receiver_of.md) | 指定完了シグネチャ集合に適合するReceiver (concept) | C++26 |
| [`execution::set_value`](execution/set_value.md) | 値完了関数 (customization point object) | C++26 |
| [`execution::set_error`](execution/set_error.md) | エラー完了関数 (customization point object) | C++26 |
| [`execution::set_stopped`](execution/set_stopped.md) | 停止完了関数 (customization point object) | C++26 |

### Operation State

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::operation_state`](execution/operation_state.md) | Operation State型 (concept) | C++26 |
| [`execution::start`](execution/start.md.nolink) | 非同期操作の開始 (customization point object) | C++26 |

### Sender

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::default_domain`](execution/default_domain.md.nolink) | デフォルト実行ドメイン (class) | C++26 |
| [`execution::sender`](execution/sender.md) | Sender型 (concept) | C++26 |
| [`execution::sender_in`](execution/sender_in.md) | 指定環境で有効なSender (concept) | C++26 |
| [`execution::sender_to`](execution/sender_to.md) | 指定Receiverに接続可能なSender (concept) | C++26 |
| [`execution::get_completion_signatures`](execution/get_completion_signatures.md.nolink) | 完了シグネチャ集合取得の問い合わせオブジェクト (customization point object) | C++26 |
| [`execution::completion_signatures_of_t`](execution/completion_signatures_of_t.md) | Senderから完了シグネチャ集合を取得 (alias template) | C++26 |
| [`execution::value_types_of_t`](execution/value_types_of_t.md.nolink) | Senderの値完了型を取得 (alias template) | C++26 |
| [`execution::error_types_of_t`](execution/error_types_of_t.md.nolink) | Senderのエラー完了型を取得 (alias template) | C++26 |
| [`execution::sends_stopped`](execution/value_types_of_t.md.nolink) | Senderが停止完了に対応するか否か (variable template) | C++26 |
| [`execution::tag_of_t`](execution/tag_of_t.md.nolink) | Senderのタグ型を取得 (alias template) | C++26 |
| [`execution::transform_sender`](execution/transform_sender.md.nolink) | Senderを変換 (function template) | C++26 |
| [`execution::transform_env`](execution/transform_env.md.nolink) | 問い合わせオブジェクトを変換 (function template) | C++26 |
| [`execution::apply_sender`](execution/apply_sender.md.nolink) | Senderにタグ型と引数を適用 (function template) | C++26 |
| [`execution::connect`](execution/connect.md.nolink) | SenderとReceiverを接続 (customization point object) | C++26 |
| [`execution::connect_result_t`](execution/connect_result_t.md.nolink) | `connect`結果型を取得 (alias template) | C++26 |

### Senderファクトリ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::just`](execution/just.md.nolink) | 値を送信するSender (customization point object) | C++26 |
| [`execution::just_error`](execution/just_error.md.nolink) | エラーを送信するSender (customization point object) | C++26 |
| [`execution::just_stopped`](execution/just_stopped.md.nolink) | 停止を送信するSender (customization point object) | C++26 |
| [`execution::read_env`](execution/read_env.md.nolink) | Receiver環境から構築されるSender (customization point object) | C++26 |
| [`execution::schedule`](execution/schedule.md.nolink) | Scheduler上で実行されるSender (customization point object) | C++26 |
| [`execution::schedule_result_t`](execution/schedule_result_t.md.nolink) | `schedule`結果型を取得 (alias template) | C++26 |

### Senderアダプタ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::sender_adaptor_closure`](execution/sender_adaptor_closure.md.nolink) | Senderアダプタ実装用クロージャ型(class template) | C++26 |
| [`execution::starts_on`](execution/starts_on.md.nolink) | 指定Scheduler上で開始する (customization point object) | C++26 |
| [`execution::continues_on`](execution/continues_on.md.nolink) | 指定Scheduler上で継続する (customization point object) | C++26 |
| [`execution::on`](execution/on.md.nolink) | 指定Scheduler上で実行する (customization point object) | C++26 |
| [`execution::schedule_from`](execution/schedule_from.md.nolink) | Sender完了に依存する作業をスケジュール (customization point object) | C++26 |
| [`execution::then`](execution/then.md.nolink) | 値完了時の継続処理をアタッチ (customization point object) | C++26 |
| [`execution::upon_error`](execution/upon_error.md.nolink) | エラー完了時の継続処理をアタッチ (customization point object) | C++26 |
| [`execution::upon_stopped`](execution/upon_stopped.md.nolink) | 停止完了時の継続処理をアタッチ (customization point object) | C++26 |
| [`execution::let_value`](execution/let_value.md.nolink) | 値完了の継続にユーザ定義処理を連結 (customization point object) | C++26 |
| [`execution::let_error`](execution/let_error.md.nolink) | エラー完了の継続にユーザ定義処理を連結 (customization point object) | C++26 |
| [`execution::let_stopped`](execution/let_stopped.md.nolink) | 停止完了の継続にユーザ定義処理を連結 (customization point object) | C++26 |
| [`execution::bulk`](execution/bulk.md.nolink) | インデクス空間上で指定関数を連続実行 (customization point object) | C++26 |
| [`execution::split`](execution/split.md.nolink) | 入力Senderの値を複製送信 (customization point object) | C++26 |
| [`execution::when_all`](execution/when_all.md.nolink) | 全ての入力Sender完了を待機 (customization point object) | C++26 |
| [`execution::when_all_with_variant`](execution/when_all_with_variant.md.nolink) | 複数の値完了シグネチャをもつ全ての入力Sender完了を待機 (customization point object) | C++26 |
| [`execution::into_variant`](execution/into_variant.md.nolink) | 複数の値完了シグネチャを単一[`variant`](/reference/variant/variant.md)型の値完了シグネチャに変換 (customization point object) | C++26 |
| [`execution::stopped_as_optional`](execution/stopped_as_optional.md.nolink) | 入力Senderの停止完了を[`optional`](/reference/optional/optional.md)型の値完了に変換 (customization point object) | C++26 |
| [`execution::stopped_as_error`](execution/stopped_as_error.md.nolink) | 入力Senderの停止完了をエラー完了に変換 (customization point object) | C++26 |

### Senderコンシューマ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`this_thread::sync_wait`](this_thread/sync_wait.md.nolink) | 現在のスレッド上でSender完了を待機 (customization point object) | C++26 |
| [`this_thread::sync_wait_with_variant`](this_thread/sync_wait_with_variant.md.nolink) | 現在のスレッド上でSender完了を待機 (customization point object) | C++26 |

Senderコンシューマは名前空間 `std::this_thread` で定義される。

### Sender/Receiverユーティリティ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::completion_signatures`](execution/completion_signatures.md) | 完了シグネチャ集合を表現する型 (class template) | C++26 |
| [`execution::transform_completion_signatures`](execution/transform_completion_signatures.md.nolink) | 完了シグネチャを変換 (alias template) | C++26 |
| [`execution::transform_completion_signatures_of`](execution/transform_completion_signatures_of.md.nolink) | 完了シグネチャを変換 (alias template) | C++26 |
| [`execution::run_loop`](execution/run_loop.md.nolink) | 実行ループ (class) | C++26 |

### コルーチンユーティリティ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::as_awaitable`](execution/as_awaitable.md.nolink) | Senderを[Awaitable型](/lang/cpp20/coroutines.md)へ変換 (customization point object) | C++26 |
| [`execution::with_awaitable_senders`](execution/with_awaitable_senders.md.nolink) | [Promise型](/lang/cpp20/coroutines.md)の基底クラス (class template) | C++26 |


## バージョン
### 言語
- C++17
- C++26 実行制御ライブラリ

## 参照
- [P0024R2 The Parallelism TS Should be Standardized](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0024r2.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
