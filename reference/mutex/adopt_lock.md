#adopt_lock
* mutex[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct adopt_lock_t { };
  constexpr adopt_lock_t adopt_lock { };
}
```

##概要
`adopt_lock_t`型とその値`adopt_lock`は、ロック済みミューテックスを受け取るためのタグである。

`lock()/unlock()`の呼び出しをRAIIで自動化する[`unique_lock`](unique_lock.md)クラスおよび[`lock_guard`](lock_guard.md)クラスのコンストラクタで`lock()`を呼び出さず、ロックの所有権を移譲するために使用する。

[`defer_lock`](defer_lock.md)との違いは、`unique_lock::`[`owns_lock()`](unique_lock/owns_lock.md) `== true`になることである。


##例
```cpp
#include <iostream>
#include <mutex>

int main()
{
  std::mutex mtx;
  {
    mtx.lock(); // ロックを取得する
    std::unique_lock<std::mutex> lk(mtx, std::adopt_lock); // ロック済みミューテックスの管理を移譲する

    // ...共有リソースにアクセスする...

  } // unique_lockの破棄時にunlock()される
}
```
* adopt_lock[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


