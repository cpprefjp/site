#defer_lock
```cpp
namespace std {

  struct defer_lock_t { };
  constexpr defer_lock_t defer_lock { };
}
```

##概要

`defer_lock_t`型とその値`defer_lock`は、遅延ロックのためのタグである。
`lock()/unlock()`の呼び出しをRAIIで自動化する[`unique_lock`](/reference/mutex/unique_lock.md)クラスのコンストラクタで`lock()`を呼び出させないために使用する。


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

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


