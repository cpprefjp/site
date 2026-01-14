# task::promise_type
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* task[meta class]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template <class T, class Environment>
  class task<T, Environment>::promise_type;
}
```
* task[link ../task.md]

## 概要
タスクコルーチン動作を制御する[Promise型](/lang/cpp20/coroutines.md)。
プログラマが本クラスを直接利用することは想定されていない。


## クラス仕様
説明用の`prom`を`promise_type`型のオブジェクト、`tsk`を`prom.`[`get_return_object()`](promise_type/get_return_object.md)で作成される[`task`](../task.md)型のオブジェクトとする。説明では[Receiver](../receiver.md)`Rcvr`に対して、`task::`[`state<Rcvr>::start`](state.md)の評価中に`tsk`と関連付けられる`STATE(prom)`, `RCVR(prom)`, `SCHED(prom)`を用いる。

`task::promise_type`クラスの動作説明のため、以下の説明専用メンバを用いる。

- `alloc` : [`allocator_type`](../task.md)型のアロケータオブジェクト
- `source` : [`stop_source_type`](../task.md)型の停止ソースオブジェクト
- `token` : [`stop_token_type`](../task.md)型の停止トークンオブジェクト
- `result` : [`optional`](/reference/optional/optional.md)`<T>`型の結果値（`is_void_v<T> == false`の時のみ存在する）
- `errors` : 下記`error-variant`型のエラー値

説明専用の`error-variant`型は、`E...`を[`error_types`](../task.md)で表現される[`execution::completion_signatures`](../completion_signatures.md)特殊化のテンプレート引数型としたとき、[`variant`](/reference/variant/variant.md)`<`[`monostate`](/reference/variant/monostate.md)`,` [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<E>...>`において重複削除した型となる。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](promise_type/op_constructor.md) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |

### コルーチン制御

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get_return_object`](promise_type/get_return_object.md) | [`task`](../task.md)戻り値の取得 | C++26 |
| [`initial_suspend`](promise_type/initial_suspend.md) | 初期サスペンドポイント動作の制御 | C++26 |
| [`final_suspend`](promise_type/final_suspend.md) | 最終サスペンドポイント動作の制御 | C++26 |
| [`unhandled_exception`](promise_type/unhandled_exception.md) | 未処理例外の制御 | C++26 |
| [`return_void`](promise_type/return_void.md) | co_return文動作の制御 | C++26 |
| [`return_value`](promise_type/return_value.md) | co_return文動作の制御 | C++26 |
| [`yield_value`](promise_type/yield_value.md) | co_yield式動作の制御 | C++26 |
| [`await_transform`](promise_type/await_transform.md) | co_await式動作の制御 | C++26 |
| [`operator new`](promise_type/op_new.md) | new演算子オーバーロード | C++26 |
| [`operator delete`](promise_type/op_delete.md) | delete演算子オーバーロード | C++26 |

### 実行制御ライブラリ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`unhandled_stopped`](promise_type/unhandled_stopped.md) | 停止完了の制御 | C++26 |
| [`get_env`](promise_type/get_env.md) | 環境取得 | C++26 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [LWG4415. `task::promise_type::uncaught_exception` seems to be misnamed](https://cplusplus.github.io/LWG/issue4415)
