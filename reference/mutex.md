#mutex
`<mutex>`ヘッダは、排他制御（ミューテックス）、ロック、およびcall onceに関するクラス・関数を定義する。

<b>ミューテックス型</b>



| | |
|-------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| [`mutex`](./mutex/mutex.md) | ミューテックス (mutex)<br/> |
| [`recursive_mutex`](./mutex/recursive_mutex.md) | 再帰ロック可能なミューテックス (class)<br/> |
| [`timed_mutex`](./mutex/timed_mutex.md) | タイムアウト指定可能なミューテックス (class)<br/> |
| [`recursive_timed_mutex`](./mutex/recursive_timed_mutex.md) | 再帰ロック可能かつタイムアウト指定可能なミューテックス (class)<br/> |


<b>ロック管理</b>


| | |
|-----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| [`defer_lock`](./mutex/defer_lock.md)<br/> | 遅延ロックのためのタグ (class) |
| [`try_to_lock`](./mutex/try_to_lock.md) | try_lockのためのタグ (class) |
| [`adopt_lock`](./mutex/adopt_lock.md) | ロック済みミューテックスを受け取るためのタグ (class)<br/> |
| [`lock_guard`](./mutex/lock_guard.md) | スコープロック (class template)<br/> |
| [`unique_lock`](./mutex/unique_lock.md) | 単一ロック (class template)<br/> |
| [`try_lock`](./mutex/try_lock.md) | 複数mutexの汎用try_lock操作 (function template)<br/> |
| [`lock`](./mutex/lock.md) | 複数mutexの汎用lock操作 (function template)<br/> |


<b>一度だけの呼び出し</b>


| | |
|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| [`once_flag`](./mutex/once_flag.md)<br/> | call once処理用のフラグ型 (class)<br/> |
| [`call_once`](./mutex/call_once.md) | 指定された関数を一度だけ呼び出す (function template)<br/> |




##バージョン


###言語


- C++11

