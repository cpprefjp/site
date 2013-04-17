#future
`<future>`ヘッダでは、並行プログラミングのためのデザインパターンのひとつであるFutureパターンに関するクラス・関数を提供する。

[`future`](./future/future.md)はデータの準備ができるまで待機してからデータを読み取る。
[`promise`](./future/promise.md)はデータを書き込み、準備ができたことを[`future`](./future.md)に通知する。
[`packaged_task`](./future/packaged_task.md)は関数の戻り値をデータの書き込みと見なし、関数終了時に[`future`](./future/future.md)に通知する。さらにこのパターンを容易に扱うための[`async()`](./future/async.md)関数を提供する。

| | |
|------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| [`future_errc`](./future/future_errc.md) | `future`のエラー値(enum class) |
| [`launch`](./future/launch.md) | `async()`関数の実行ポリシー(enum class) |
| [`future_status`](./future/future_status.md) | `future`の状態値(enum class) |
| [`is_error_code_enum`](./future/is_error_code_enum.md) | `future_errc`をエラーコードとして扱うための特殊化(class template) |
| [`make_error_code`](./future/make_error_code.md) | `future_errc`から`error_code`を生成する(function) |
| [`make_error_condition`](./future/make_error_condition.md) | `future_errc`から`error_condition`を生成する(function) |
| [`future_category`](./future/future_category.md) | `future_errc`のためのエラーカテゴリを取得する(function) |
| [`future_error`](./future/future_error.md) | `future`のエラーに関する例外クラス(class) |
| [`promise`](./future/promise.md) | データを書き込み、データの準備ができたことを通知する(class template) |
| [`future`](./future/future.md) | データの準備ができるまで待機し、データを読み取る(class template) |
| [`shared_future`](./future/shared_future.md) | 共有方式の`future`(class template) |
| [`packaged_task`](./future/packaged_task.md) | 非同期タスクの管理(class template) |
| [`async`](./future/async.md) | 処理の非同期実行(function template) |



##バージョン

###言語

- C++11

