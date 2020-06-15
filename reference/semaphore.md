# semaphore
* semaphore[meta header]
* cpp20[meta cpp]

`<semaphore>`ヘッダは、[セマフォ](https://ja.wikipedia.org/wiki/%E3%82%BB%E3%83%9E%E3%83%95%E3%82%A9)に関するクラスを定義する。

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`counting_semaphore`](semaphore/counting_semaphore.md) | カウンティングセマフォ (class template) | C++20 |
| [`binary_semaphore`](semaphore/counting_semaphore.md) | バイナリセマフォ `counting_semaphore<1>` | C++20 |


## バージョン
### 言語
- C++20


### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [P0514R4 Efficient concurrent waiting for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0514r4.pdf)
- [P1135R6 The C++20 Synchronization Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1135r6.html)
