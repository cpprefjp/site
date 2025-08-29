# parallel_scheduler
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  class parallel_scheduler { unspecified };
}
```
* unspecified[italic]

## 概要
`parallel_scheduler`は、実行制御ライブラリ上でタスクの並列実行を可能とする並列[Scheduler](scheduler.md)である。

`parallel_scheduler`はシステムグローバルなスレッドプール（実行リソース）に関連付けられ、[`schedule`](schedule.md)操作により得られる[Sender](sender.md)はスレッドプールに属する任意のスレッド（実行エージェント）上で実行される。

下記のSenderアルゴリズムに対してカスタマイズ実装を提供することで、タスクの一括(bulk)実行をスレッドプールを利用したタスク並列(parallel)実行に変換する。

- [`execution::bulk`](bulk.md) : `bulk_chunked`に変換してタスク並列実行
- [`execution::bulk_chunked`](bulk_chunked.md) : インデクス範囲をチャンク単位でタスク並列実行
- [`execution::bulk_unchunked`](bulk_unchunked.md) : インデクス範囲を要素単位でタスク並列実行

[`execution::system_context_replaceability`](system_context_replaceability.md) 名前空間で定義されるインタフェースを介して、スレッドプール実装をユーザ定義の並列Schedulerバックエンドに置き換えることもできる。


## クラス仕様
`parallel_scheduler`は[`scheduler`](scheduler.md)のモデルである。

説明用の`sch`を`parallel_scheduler`型のオブジェクト、`sch`が`ptr`と関連付けられるとき`BACKEND-OF(sch)`を`*ptr`とする。

式[`get_forward_progress_guarantee`](get_forward_progress_guarantee.md)`(sch)`は[`forward_progress_guarantee::parallel`](forward_progress_guarantee.md)を返す。

説明用の`sch2`を`parallel_scheduler`型のオブジェクトとしたとき、`BACKEND-OF(sch)`と`BACKEND-OF(sch2)`が同一オブジェクトを指す場合に限って、2つのオブジェクト`sch`と`sch2`は等しい。

`rcvr`を[Receiver](receiver.md)としたとき、基底`B`を持つ`rcvr`のプロキシは下記を満たす`B`型の左辺値`r`となる。

- `r.set_value()`は、[`set_value`](set_value.md)`(std::move(rcvr))`と同じ効果。
- `r.set_error(e)`は、`e`を[`exception_ptr`](/reference/exception/exception_ptr.md)として、[`set_error`](set_error.md)`(std::move(rcvr), std::move(e))`と同じ効果。
- `r.set_stopped()`は、[`set_stopped`](set_stopped.md)`(std::move(rcvr))`と同じ効果。

プロキシ`r`に対する事前確保バックエンドストレージ(preallocated backend storage)は、[`span`](/reference/span/span.md)`<`[`byte`](/reference/cstddef/byte.md)`>`型のオブジェクト`s`であり、`r`に対して[`set_value`](set_value.md)／[`set_error`](set_error.md)／[`set_stopped`](set_stopped.md)いずれかが呼び出されるまで範囲`s`は有効かつ上書き可能である。

呼び出し可能オブジェクト`f`と引数`arg`を持つ`rcvr`のバルクチャンク化プロキシ(bulk chunked proxy)は、基底
[`system_context_replaceability::bulk_item_receiver_proxy`](system_context_replaceability/bulk_item_receiver_proxy.md)を持つ`rcvr`のプロキシ`r`であり、インデクス`i`, `j`に対する`r.execute(i, j)`は`f(i, j, args...)`と同じ効果を持つ。

呼び出し可能オブジェクト`f`と引数`arg`を持つ`rcvr`のバルク非チャンク化プロキシ(bulk unchunked proxy)は、基底
[`system_context_replaceability::bulk_item_receiver_proxy`](system_context_replaceability/bulk_item_receiver_proxy.md)を持つ`rcvr`のプロキシ`r`であり、インデクス`i`に対する`r.execute(i, i + 1)`は`f(i, args...)`と同じ効果を持つ。


### `schedule`アルゴリズム
説明用の`b`を`BACKEND-OF(sch)`、`sndr`を[`schedule`](schedule.md)`(sch)`が返すオブジェクト、`rcvr`を[Receiver](receiver.md)とする。`rcvr`が`sndr`に[接続(connect)](connect.md)され、結果の[Operation State](operation_state.md)が[開始(start)](start.md)されたとき、

- `sndr`が値完了するならば、[`b.schedule`](system_context_replaceability/parallel_scheduler_backend/schedule.md)`(r, s)`が呼ばれる。このとき、
    - `r`は基底[`system_context_replaceability::receiver_proxy`](system_context_replaceability/receiver_proxy.md)を持つ`rcvr`のプロキシであり、かつ
    - `s`は`r`に対する事前確保バックエンドストレージである。
- 他の全ての完了操作は、変更なしに転送される。


### `bulk_chunked`アルゴリズム
`parallel_scheduler`は[`bulk_chunked`](bulk_chunked.md)アルゴリズムのカスタマイズ実装を提供する。[Receiver](receiver.md)`rcvr`が`bulk_chunked(sndr, pol, shape, f)`が返す[Sender](sender.md)に[接続(connect)](connect.md)され、結果の[Operation State](operation_state.md)が[開始(start)](start.md)されたとき、

- `sndr`が値`vals`で値完了するならば、`args`を`vals`を指す左辺値式のパックとして、[`b.schedule_bulk_chunked`](system_context_replaceability/parallel_scheduler_backend/schedule_bulk_chunked.md)`(shape, r, s)`が呼ばれる。このとき、
    - `r`は呼び出し可能オブジェクト`f`と引数`arg`を持つ`rcvr`のバルクチャンク化プロキシであり、かつ
    - `s`は`r`に対する事前確保バックエンドストレージである。
- 他の全ての完了操作は、変更なしに転送される。


### `bulk_unchunked`アルゴリズム
`parallel_scheduler`は[`bulk_unchunked`](bulk_unchunked.md)アルゴリズムのカスタマイズ実装を提供する。[Receiver](receiver.md)`rcvr`が`bulk_unchunked(sndr, pol, shape, f)`が返す[Sender](sender.md)に[接続(connect)](connect.md)され、結果の[Operation State](operation_state.md)が[開始(start)](start.md)されたとき、

- `sndr`が値`vals`で値完了するならば、`args`を`vals`を指す左辺値式のパックとして、[`b.schedule_bulk_unchunked`](system_context_replaceability/parallel_scheduler_backend/schedule_bulk_unchunked.md)`(shape, r, s)`が呼ばれる。このとき、
    - `r`は呼び出し可能オブジェクト`f`と引数`arg`を持つ`rcvr`のバルク非チャンク化プロキシであり、かつ
    - `s`は`r`に対する事前確保バックエンドストレージである。
- 他の全ての完了操作は、変更なしに転送される。


## 例
```cpp example
#include <concepts>
#include <execution>
namespace ex = std::execution;

int main()
{
　ex::scheduler auto sch = ex::get_parallel_scheduler();
  static_assert(std::same_as<decltype(sch), ex::parallel_scheduler>);
}
```
* ex::parallel_scheduler[color ff0000]
* ex::scheduler[link scheduler.md]
* ex::get_parallel_scheduler()[link get_parallel_scheduler.md]

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
- [`execution::get_parallel_scheduler`](get_parallel_scheduler.md)
- [`execution::system_context_replaceability`](system_context_replaceability.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P2079R10 Parallel scheduler](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2079r10.html)
