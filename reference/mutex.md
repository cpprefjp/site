#mutex
* mutex[meta header]
* cpp11[meta cpp]

`<mutex>`ヘッダは、排他制御（ミューテックス）、ロック、およびcall onceに関するクラス・関数を定義する。


##ミューテックス型

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------------|----------------------------|-------|
| [`mutex`](mutex/mutex.md) | ミューテックス (mutex) | C++11 |
| [`recursive_mutex`](mutex/recursive_mutex.md) | 再帰ロック可能なミューテックス (class) | C++11 |
| [`timed_mutex`](mutex/timed_mutex.md) | タイムアウト指定可能なミューテックス (class) | C++11 |
| [`recursive_timed_mutex`](mutex/recursive_timed_mutex.md) | 再帰ロック可能かつタイムアウト指定可能なミューテックス (class) | C++11 |


##ロック管理

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|--------------------------------|-------|
| [`defer_lock`](mutex/defer_lock.md)   | 遅延ロックのためのタグ (class) | C++11 |
| [`try_to_lock`](mutex/try_to_lock.md) | `try_lock`のためのタグ (class) | C++11 |
| [`adopt_lock`](mutex/adopt_lock.md)   | ロック済みミューテックスを受け取るためのタグ (class) | C++11 |
| [`lock_guard`](mutex/lock_guard.md)   | スコープロック (class template) | C++11 |
| [`unique_lock`](mutex/unique_lock.md) | 単一ロック (class template) | C++11 |
| [`try_lock`](mutex/try_lock.md)       | 複数ミューテックスに対する`try_lock`操作 (function template) | C++11 |
| [`lock`](mutex/lock.md)               | 複数ミューテックスに対する`lock`操作 (function template) | C++11 |


##一度だけの呼び出し

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|-----------------------------------|-------|
| [`once_flag`](mutex/once_flag.md) | call once処理用のフラグ型 (class) | C++11 |
| [`call_once`](mutex/call_once.md) | 指定された関数を一度だけ呼び出す (function template) | C++11 |


##バージョン
###言語
- C++11

###処理系
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0
