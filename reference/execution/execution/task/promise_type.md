# promise_type
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
- [LWG4339. `task`'s coroutine frame may be released late](https://cplusplus.github.io/LWG/issue4339)
- [LWG4347. `task`'s stop source is always created](https://cplusplus.github.io/LWG/issue4347)
