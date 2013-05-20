#mutex
`<mutex>`ヘッダは、排他制御（ミューテックス）、ロック、およびcall onceに関するクラス・関数を定義する。


##ミューテックス型

| | |
|-------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| [`mutex`](./mutex/mutex.md) | ミューテックス (mutex) |
| [`recursive_mutex`](./mutex/recursive_mutex.md) | 再帰ロック可能なミューテックス (class) |
| [`timed_mutex`](./mutex/timed_mutex.md) | タイムアウト指定可能なミューテックス (class) |
| [`recursive_timed_mutex`](./mutex/recursive_timed_mutex.md) | 再帰ロック可能かつタイムアウト指定可能なミューテックス (class) |


##ロック管理

| | |
|-----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [`defer_lock`](./mutex/defer_lock.md) | 遅延ロックのためのタグ (class) |
| [`try_to_lock`](./mutex/try_to_lock.md) | try_lockのためのタグ (class) |
| [`adopt_lock`](./mutex/adopt_lock.md) | ロック済みミューテックスを受け取るためのタグ (class) |
| [`lock_guard`](./mutex/lock_guard.md) | スコープロック (class template) |
| [`unique_lock`](./mutex/unique_lock.md) | 単一ロック (class template) |
| [`try_lock`](./mutex/try_lock.md) | 複数mutexの汎用try_lock操作 (function template) |
| [`lock`](./mutex/lock.md) | 複数mutexの汎用lock操作 (function template) |


##一度だけの呼び出し

| | |
|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| [`once_flag`](./mutex/once_flag.md) | call once処理用のフラグ型 (class) |
| [`call_once`](./mutex/call_once.md) | 指定された関数を一度だけ呼び出す (function template)<br/> |


##バージョン
###言語
- C++11

