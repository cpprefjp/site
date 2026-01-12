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
| [`forwarding_query`](forwarding_query.md) | 対象クエリオブジェクトの転送可否を取得するクエリオブジェクト (customization point object) | C++26 |
| [`get_allocator`](get_allocator.md) | アロケータ取得のクエリオブジェクト (customization point object) | C++26 |
| [`get_stop_token`](get_stop_token.md) | 停止トークン取得のクエリオブジェクト (customization point object) | C++26 |
| [`stop_token_of_t`](stop_token_of_t.md) | 指定型から停止トークン型を取得 (alias template) | C++26 |
| [`execution::get_domain`](execution/get_domain.md) | 実行ドメイン取得のクエリオブジェクト (customization point object) | C++26 |
| [`execution::get_scheduler`](execution/get_scheduler.md) | Scheduler取得のクエリオブジェクト (customization point object) | C++26 |
| [`execution::get_delegation_scheduler`](execution/get_delegation_scheduler.md) | 委任Scheduler取得のクエリオブジェクト (customization point object) | C++26 |
| [`execution::forward_progress_guarantee`](execution/forward_progress_guarantee.md) | 前方進行保証 (enum) | C++26 |
| [`execution::get_forward_progress_guarantee`](execution/get_forward_progress_guarantee.md) | 前方進行保証取得のクエリオブジェクト (customization point object) | C++26 |
| [`execution::get_completion_scheduler`](execution/get_completion_scheduler.md) | 完了Scheduler取得のクエリオブジェクト (customization point object) | C++26 |
| [`execution::get_await_completion_adaptor`](execution/get_await_completion_adaptor.md) | Awaitable完了アダプタ取得のクエリオブジェクト (customization point object) | C++26 |
| [`execution::get_env`](execution/get_env.md) | 環境取得のクエリオブジェクト (customization point object) | C++26 |
| [`execution::env_of_t`](execution/env_of_t.md) | 指定型から環境型を取得 (alias template) | C++26 |
| [`execution::prop`](execution/prop.md) | Key/Valueペアによる[クエリ可能オブジェクト](queryable.md) (class template) | C++26 |
| [`execution::env`](execution/env.md) | 複数Key/Valueからなる[クエリ可能オブジェクト](queryable.md) (class template) | C++26 |

クエリオブジェクトは名前空間 `std` および名前空間 `std::execution` で定義される。

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
| [`execution::start`](execution/start.md) | 非同期操作の開始 (customization point object) | C++26 |

### Sender

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::default_domain`](execution/default_domain.md) | デフォルト実行ドメイン (class) | C++26 |
| [`execution::sender`](execution/sender.md) | Sender型 (concept) | C++26 |
| [`execution::sender_in`](execution/sender_in.md) | 指定環境で有効なSender (concept) | C++26 |
| [`execution::dependent_sender`](execution/dependent_sender.md) | 依存Sender (concept) | C++26 |
| [`execution::sender_to`](execution/sender_to.md) | 指定Receiverに接続可能なSender (concept) | C++26 |
| [`execution::value_types_of_t`](execution/value_types_of_t.md) | Senderの値完了シグネチャ集合から指定操作で型を生成 (alias template) | C++26 |
| [`execution::error_types_of_t`](execution/error_types_of_t.md) | Senderのエラー完了シグネチャ集合から指定操作で型を生成 (alias template) | C++26 |
| [`execution::sends_stopped`](execution/sends_stopped.md) | Senderが停止完了を送信しうるか否か (variable template) | C++26 |
| [`execution::tag_of_t`](execution/tag_of_t.md) | Senderアルゴリズムタグ型を取得 (alias template) | C++26 |
| [`execution::transform_sender`](execution/transform_sender.md) | Senderを変換 (function template) | C++26 |
| [`execution::transform_env`](execution/transform_env.md) | 環境を変換 (function template) | C++26 |
| [`execution::apply_sender`](execution/apply_sender.md) | Senderアルゴリズムを適用 (function template) | C++26 |
| [`execution::connect`](execution/connect.md) | SenderとReceiverを接続 (customization point object) | C++26 |
| [`execution::connect_result_t`](execution/connect_result_t.md) | [`connect`](execution/connect.md)結果型を取得 (alias template) | C++26 |

### Senderファクトリ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::just`](execution/just.md) | 値を送信するSender (customization point object) | C++26 |
| [`execution::just_error`](execution/just_error.md) | エラーを送信するSender (customization point object) | C++26 |
| [`execution::just_stopped`](execution/just_stopped.md) | 停止を送信するSender (customization point object) | C++26 |
| [`execution::read_env`](execution/read_env.md) | Receiver環境からクエリオブジェクトで値を読み取るSender (customization point object) | C++26 |
| [`execution::schedule`](execution/schedule.md) | Scheduler上で実行されるSender (customization point object) | C++26 |
| [`execution::schedule_result_t`](execution/schedule_result_t.md) | [`schedule`](execution/schedule.md)結果型を取得 (alias template) | C++26 |

### Senderアダプタ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::sender_adaptor_closure`](execution/sender_adaptor_closure.md) | パイプライン記法をサポートするSenderアダプタ実装補助 (class template) | C++26 |
| [`execution::write_env`](execution/write_env.md) | Receiver環境を書き換える (customization point object) | C++26 |
| [`execution::unstoppable`](execution/unstoppable.md) | 停止要求を遮断する (customization point object) | C++26 |
| [`execution::starts_on`](execution/starts_on.md) | 指定Scheduler上で開始する (customization point object) | C++26 |
| [`execution::continues_on`](execution/continues_on.md) | 指定Scheduler上で継続する (customization point object) | C++26 |
| [`execution::on`](execution/on.md) | 指定Senderのみ別Scheduler上で実行する (customization point object) | C++26 |
| [`execution::schedule_from`](execution/schedule_from.md) | Sender完了に依存する作業をスケジュール (customization point object) | C++26 |
| [`execution::then`](execution/then.md) | 値完了時の継続処理をアタッチ (customization point object) | C++26 |
| [`execution::upon_error`](execution/upon_error.md) | エラー完了時の継続処理をアタッチ (customization point object) | C++26 |
| [`execution::upon_stopped`](execution/upon_stopped.md) | 停止完了時の継続処理をアタッチ (customization point object) | C++26 |
| [`execution::let_value`](execution/let_value.md) | 値完了結果から入れ子の非同期操作へ変換 (customization point object) | C++26 |
| [`execution::let_error`](execution/let_error.md) | エラー完了結果から入れ子の非同期操作へ変換 (customization point object) | C++26 |
| [`execution::let_stopped`](execution/let_stopped.md) | 停止完了を入れ子の非同期操作へ変換 (customization point object) | C++26 |
| [`execution::bulk`](execution/bulk.md) | インデクス空間上で指定関数を一括実行 (customization point object) | C++26 |
| [`execution::bulk_chunked`](execution/bulk_chunked.md) | インデクス空間を分割チャンク単位で指定関数を一括実行 (customization point object) | C++26 |
| [`execution::bulk_unchunked`](execution/bulk_unchunked.md) | インデクス空間の各インデクス単位で指定関数を一括実行 (customization point object) | C++26 |
| [`execution::when_all`](execution/when_all.md) | 全ての入力Sender完了を待機 (customization point object) | C++26 |
| [`execution::when_all_with_variant`](execution/when_all_with_variant.md) | 複数の値完了シグネチャをもつ全ての入力Sender完了を待機 (customization point object) | C++26 |
| [`execution::into_variant`](execution/into_variant.md) | 複数の値完了シグネチャを単一[`variant`](/reference/variant/variant.md)型の値完了シグネチャに変換 (customization point object) | C++26 |
| [`execution::stopped_as_optional`](execution/stopped_as_optional.md) | 入力Senderの停止完了を空の[`optional`](/reference/optional/optional.md)値完了に変換 (customization point object) | C++26 |
| [`execution::stopped_as_error`](execution/stopped_as_error.md) | 入力Senderの停止完了をエラー完了に変換 (customization point object) | C++26 |
| [`execution::associate`](execution/associate.md) | 非同期スコープへの関連付け (customization point object) | C++26 |
| [`execution::spawn_future`](execution/spawn_future.md) | 非同期操作を早期開始 (customization point object) | C++26 |

### Senderコンシューマ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`this_thread::sync_wait`](this_thread/sync_wait.md) | 現在のスレッド上でSender完了を待機 (customization point object) | C++26 |
| [`this_thread::sync_wait_with_variant`](this_thread/sync_wait_with_variant.md) | 現在のスレッド上でSender完了を待機 (customization point object) | C++26 |
| [`execution::spawn`](execution/spawn.md) | 非同期操作を早期開始 (customization point object) | C++26 |

Senderコンシューマは名前空間 `std::this_thread` および名前空間 `std::execution` で定義される。

### Sender/Receiverユーティリティ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::completion_signatures`](execution/completion_signatures.md) | 完了シグネチャ集合を表現する型 (class template) | C++26 |
| [`execution::dependent_sender_error`](execution/dependent_sender_error.md) | 依存Senderを表す例外クラス(class) | C++26 |
| [`execution::get_completion_signatures`](execution/get_completion_signatures.md) | Senderの完了シグネチャ集合を取得 (function template) | C++26 |
| [`execution::completion_signatures_of_t`](execution/completion_signatures_of_t.md) | Senderの完了シグネチャ集合を取得 (alias template) | C++26 |
| [`execution::run_loop`](execution/run_loop.md) | 単一スレッド上でのループ実行 (class) | C++26 |

### コルーチンユーティリティ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::as_awaitable`](execution/as_awaitable.md) | Senderを[Awaitable型](/lang/cpp20/coroutines.md)へ変換 (customization point object) | C++26 |
| [`execution::with_awaitable_senders`](execution/with_awaitable_senders.md) | [Promise型](/lang/cpp20/coroutines.md)の基底クラス (class template) | C++26 |
| [`execution::affine_on`](execution/affine_on.md.nolink) | (customization point object) | C++26 |
| [`execution::inline_scheduler`](execution/inline_scheduler.md) | インラインScheduler (class) | C++26 |
| [`execution::task_scheduler`](execution/task_scheduler.md) | 任意Scheduler型を保持するScheduler (class) | C++26 |
| [`execution::with_error`](execution/with_error.md.nolink) | コルーチンからのエラー完了 (class template) | C++26 |
| [`execution::change_coroutine_scheduler`](execution/change_coroutine_scheduler.md.nolink) | コルーチンのScheduler変更 (class template) | C++26 |
| [`execution::task`](execution/task.md) | タスクコルーチン戻り値型 (class template) | C++26 |

### 実行スコープユーティリティ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::scope_token`](execution/scope_token.md) | 非同期スコープトークン (concept) | C++26 |
| [`execution::simple_counting_scope`](execution/simple_counting_scope.md) | カウント式非同期スコープ (class) | C++26 |
| [`execution::counting_scope`](execution/counting_scope.md) | 停止要求可能なカウント式非同期スコープ (class) | C++26 |

### 並列Scheduler

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution::parallel_scheduler`](execution/parallel_scheduler.md) | 並列Scheduler (class) | C++26 |
| [`execution::get_parallel_scheduler`](execution/get_parallel_scheduler.md) | 並列Schedulerを取得 (function) | C++26 |
| [`execution::system_context_replaceability`](execution/system_context_replaceability.md) | `parallel_scheduler`動作カスタマイズ用の名前空間 (namespace) | C++26 |


## バージョン
### 言語
- C++17
- C++26 実行制御ライブラリ

## 参照
- [P0024R2 The Parallelism TS Should be Standardized](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0024r2.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
- [P3284R4 `write_env` and `unstoppable` Sender Adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3284r4.html)
- [P3481R5 `std::execution::bulk()` issues](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3481r5.html)
- [P3552R3 Add a Coroutine Task Type](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
- [P3570R2 optional variants in sender/receiver](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3570r2.html)
- [P3682R0 Remove `std::execution::split`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3682r0.pdf)
