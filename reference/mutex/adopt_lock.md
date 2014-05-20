#adopt_lock (C++11)
```cpp
namespace std {
  struct adopt_lock_t { };
  constexpr adopt_lock_t adopt_lock { };
}
```

##概要
`adopt_lock_t`型とその値`adopt_lock`は、ロック済みミューテックスを受け取るためのタグである。
`lock()/unlock()`の呼び出しをRAIIで自動化する[`unique_lock`](./unique_lock.md)クラスおよび[`lock_guard`](./lock_guard.md)クラスのコンストラクタで`lock()`を呼び出さず、ロックの所有権を移譲するために使用する。

[`defer_lock`](./defer_lock.md)との違いは、`unique_lock::`[`owns_lock()`](./unique_lock/owns_lock.md)` == true`になることである。


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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


