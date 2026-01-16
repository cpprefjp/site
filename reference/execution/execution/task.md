# task
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template <class T = void, class Environment = env<>>
  class task;
}
```
* env<>[link env.md]

## 概要
`task`クラステンプレートは、[コルーチン](/lang/cpp20/coroutines.md)の戻り値型として使用できる[Sender](sender.md)を表す。

- 第1テンプレートパラメータ`T`が`void`ではないとき、[値完了](set_value.md)のデータ型を定義する。そうでなければ、値完了はデータを持たない。`task<T, E>`を返すコルーチン内部では、（もしあれば）`co_return`のオペランドは[`set_value`](set_value.md)の引数となる。
- 第2テンプレートパラメータ`Environment`は、`task`の動作カスタマイズに用いられる。


## クラス仕様
`task`クラステンプレートは、下記の説明専用メンバ変数を持つ。

- `handle` : [`coroutine_handle`](/reference/coroutine/coroutine_handle.md)`<`[`promise_type`](task/promise_type.md)`>`

`T`が`void`、参照型、cv修飾された非配列オブジェクト型のいずれかであり、かつ`E`がクラス型であるとき、`task<T, E>`は[`sender`](sender.md)のモデルである。そうでなければ、`task<T, E>`の定義をインスタンス化するプログラムは不適格となる。

`task`テンプレート特殊化のネストした型は、`Environment`パラメータに基づいて決定される :

- `allocator_type` : `Environment::allocator_type`が有効な型ならばその型、そうでなければ[`allocator`](/reference/memory/allocator.md)`<byte>`
- `scheduler_type` : `Environment::scheduler_type`が有効な型ならばその型、そうでなければ[`task_scheduler`](task_scheduler.md)
- `stop_source_type` : `Environment::stop_source_type`が有効な型ならばその型、そうでなければ[`inplace_stop_source`](/reference/stop_token/inplace_stop_source.md)
- `stop_token_type` : `decltype(`[`declval`](/reference/utility/declval.md)`<stop_source_type>().`[`get_token()`](/reference/stop_token/stoppable-source.md)`)`
- `error_types` : `Environment::error_types`が有効な型ならばその型、そうでなければ[`completion_signatures`](completion_signatures.md)`<`[`set_error_t`](set_error.md)`(`[`exception_ptr`](/reference/exception/exception_ptr.md)`)>`

`error_types`が[`completion_signatures`](completion_signatures.md)`<ErrorSigs...>`の特殊化ではない、もしくは`ErrorSigs`が[`set_error_t`](set_error.md)`(E)`が適格でない要素型`E`を含むとき、プログラムは不適格となる。

型エイリアス`completion_signatures`は、（未規定の順序で）次のテンプレート実引数をもつ[`execution::completion_signatures`](completion_signatures.md)の特殊化となる :

- `T`が`void`のとき[`set_value_t`](set_value.md)`()`、そうでなければ`set_value_t(T)`
- `error_types`で表される[`execution::completion_signatures`](completion_signatures.md)の特殊化のテンプレート実引数（エラー型`Err`を持つ[`set_error_t`](set_error.md)`(Err)`）
- [`set_stopped_t`](set_stopped.md)`()`


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](task/op_constructor.md) | コンストラクタ | C++26 |
| [`(destructor)`](task/op_destructor.md) | デストラクタ | C++26 |
| [`connect`](task/connect.md) | [Receiver](receiver.md)との接続操作 | C++26 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `sender_concept` | [`sender_t`](sender.md) | C++26 |
| `completion_signatures` | [完了シグネチャ集合](completion_signatures.md) | C++26 |
| `allocator_type` | コルーチンのアロケータ型 | C++26 |
| `scheduler_type` | コルーチンのScheduler型 | C++26 |
| `stop_source_type` | コルーチンの停止ソース型 | C++26 |
| `stop_token_type` | コルーチンの停止トークン型 | C++26 |
| `error_types` | コルーチンの[エラー完了](set_error.md)の結果型 | C++26 |
| [`state`](task/state.md) | タスクコルーチン動作の説明専用クラステンプレート | C++26 |
| [`promise_type`](task/promise_type.md) | タスクコルーチンの[Promise型](/lang/cpp20/coroutines.md) | C++26 |


## 例
```cpp example
#include <cassert>
#include <execution>
namespace ex = std::execution;

// int型を返すタスクコルーチンを定義
ex::task<int> work(int n)
{
  // 他Senderの結果値を取得する
  int m = co_await ex::just(3);
  // タスクコルーチンから値を返す
  co_return m * n * 7;
}

int main()
{
  // タスクコルーチン呼び出しによりSenderを生成
  ex::sender auto sndr = work(2);

  // Sender(タスクコルーチン)を開始して結果取得
  auto [n] = std::this_thread::sync_wait(std::move(sndr)).value();
  assert(n == 42);
}
```
* ex::task[color ff0000]
* ex::just[link just.md]
* ex::sender[link sender.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]
* std::move[link /reference/utility/move.md]

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
- [`execution::with_error`](with_error.md)
- [`execution::change_coroutine_scheduler`](change_coroutine_scheduler.md.nolink)
- [`execution::task_scheduler`](task_scheduler.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [LWG4343. Missing default template arguments for `task`](https://cplusplus.github.io/LWG/issue4343)
- C++now 2025, [Getting The Lazy Task Done](https://schedule.cppnow.org/wp-content/uploads/2025/03/Getting_The_Lazy_Task_Done.pdf)
