# thread
* thread[meta header]
* cpp11[meta cpp]

`<thread>`ヘッダはマルチスレッド制御に関するクラス・関数を定義する。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<compare>`](compare.md) (C++20)


| 名前 | 説明 | 対応バージョン |
|------------------------------------------|------------------------------|-------|
| [`thread`](thread/thread.md)           | スレッド クラス(class)       | C++11 |
| [`thread::id`](thread/thread/id.md)    | スレッド識別子 クラス(class) | C++11 |
| [`this_thread`](thread/this_thread.md) | 現スレッドの制御機能を提供する名前空間 (namespace) | C++11 |
| [`jthread`](thread/jthread.md) | 停止要求を扱ったり、自動で[`join`](thread/jthread/join.md)する機能を持つスレッド クラス (class) | C++20 |


## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.3 [mark verified], 4.7.0 [mark verified]
     GCC／pthread環境でスレッドサポートを有効化するには -pthread オプション指定が必要。（GCC 4.7.0で確認）
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]

## 参照
- [The cpp-threads Archives](https://www.decadent.org.uk/pipermail/cpp-threads/)
    - C++11の策定時に、C++標準の言語とライブラリに並行プログラミングの提案を行うため使用されていたメーリングリストのアーカイブです。
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
