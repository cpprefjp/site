#defer_lock
* mutex[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct defer_lock_t { };
  constexpr defer_lock_t defer_lock { };
}
```

##概要
`defer_lock_t`型とその値`defer_lock`は、遅延ロックのためのタグである。

`lock()/unlock()`の呼び出しをRAIIで自動化する[`unique_lock`](unique_lock.md)クラスのコンストラクタで`lock()`を呼び出させないために使用する。


##例
```cpp
#include <iostream>
#include <mutex>

int main()
{
  std::mutex mtx;
  {
    std::unique_lock<std::mutex> lk(mtx, std::defer_lock); // ここではlock()されない
    lk.lock(); // あとからロックする

    // ...共有リソースにアクセスする...

  } // unique_lockの破棄時にunlock()される
}
```
* defer_lock[color ff0000]

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
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0
    - 11.0, 12.0は`constepxr`が実装されていないため、`代わりに`defer_lock`には`const`が修飾されている。


##参照


