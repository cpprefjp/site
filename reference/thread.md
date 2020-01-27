# thread
* thread[meta header]
* cpp11[meta cpp]

`<thread>`ヘッダはマルチスレッド制御に関するクラス・関数を定義する。  
スレッドサポートはC++11にて導入された。


| 名前 | 説明 | 対応バージョン |
|------------------------------------------|------------------------------|-------|
| [`thread`](thread/thread.md)           | スレッド クラス(class)       | C++11 |
| [`thread::id`](thread/thread/id.md)    | スレッド�別� クラス(class) | C++11 |
| [`this_thread`](thread/this_thread.md) | 現スレッドの制御機能を提供する名前空間 (namespace) | C++11 |


## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.3, 4.7.0
     GCC／pthread環境でスレッドサポートを有効化するには -pthread オプション指定が必要。（GCC 4.7.0で確認）
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015

## 参照
- [The cpp-threads Archives](https://www.decadent.org.uk/pipermail/cpp-threads/)
    - C++11の�定時に、C++標準の言語とライブラリに並行プ�グラミングの提案を行うため使用されていたメーリングリストのアーカイブです。

