# adopt_lock
* mutex[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct adopt_lock_t { explicit adopt_lock_t() = default; };
  constexpr adopt_lock_t adopt_lock { };        // C++11
  inline constexpr adopt_lock_t adopt_lock { }; // C++17
}
```

## 概要
`adopt_lock_t`型とその値`adopt_lock`は、ロック済みミューテックスを受け取るためのタグである。

`lock()/unlock()`の呼び出しをRAIIで自動化する[`unique_lock`](unique_lock.md)クラスおよび[`lock_guard`](lock_guard.md)クラスのコンストラクタで`lock()`を呼び出さず、ロックの所有権を委譲するために使用する。

[`defer_lock`](defer_lock.md)との違いは、`unique_lock::`[`owns_lock()`](unique_lock/owns_lock.md) `== true`になることである。


## 例
```cpp example
#include <iostream>
#include <mutex>

int main()
{
  std::mutex mtx;
  {
    mtx.lock(); // ロックを取得する
    std::unique_lock<std::mutex> lk(mtx, std::adopt_lock); // ロック済みミューテックスの管理を委譲する

    // ...共有リソースにアクセスする...

  } // unique_lockの破棄時にunlock()される
}
```
* std::adopt_lock[color ff0000]
* mtx.lock()[link mutex/lock.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
    - 2012, 2013は`constexpr`が実装されていないため、代わりに`adopt_lock`には`const`が修飾されている。


## 参照
- [LWG Issue 2510. Tag types should not be `DefaultConstructible`](https://cplusplus.github.io/LWG/issue2510)
