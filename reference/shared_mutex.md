# shared_mutex
* shared_mutex[meta header]
* cpp14[meta cpp]

`<shared_mutex>`ヘッダでは、[Readers–writer lock](https://en.wikipedia.org/wiki/Readers%E2%80%93writer_lock)と呼ばれる、「複数のユーザーによる読み込みと、単一ユーザーによる書き込み」の排他制御を効率的に行うミューテックスクラスを定義する。


| 名前                 | 説明                                   | 対応バージョン |
|----------------------|----------------------------------------|----------------|
| [`shared_mutex`](shared_mutex/shared_mutex.md)             | 共有ミューテックス(class) | C++17 |
| [`shared_timed_mutex`](shared_mutex/shared_timed_mutex.md) | タイムアウト指定可能な共有ミューテックス(class) | C++14 |
| [`shared_lock`](shared_mutex/shared_lock.md)               | 共有ロックを自動的に手放す(class template) | C++14 |


## バージョン
### 言語
- C++14

