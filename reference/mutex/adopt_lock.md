# adopt_lock
* mutex[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct adopt_lock_t { };
  constexpr adopt_lock_t adopt_lock { };        // C++11
  inline constexpr adopt_lock_t adopt_lock { }; // C++17
}
```

## 概要
`adopt_lock_t`型とその値`adopt_lock`は、�ック済みミューテックスを受け取るためのタグである。

`lock()/unlock()`の呼び出しをRAIIで自動化する[`unique_lock`](unique_lock.md)クラスおよび[`lock_guard`](lock_guard.md)クラスのコンストラクタで`lock()`を呼び出さず、�ックの所有権を移�するために使用する。

[`defer_lock`](defer_lock.md)との違いは、`unique_lock::`[`owns_lock()`](unique_lock/owns_lock.md) `== true`になることである。


## 例
```cpp example
#include <iostream>
#include <mutex>

int main()
{
  std::mutex mtx;
  {
    mtx.lock(); // �ックを取得する
    std::unique_lock<std::mutex> lk(mtx, std::adopt_lock); // �ック済みミューテックスの管理を移�する

    // ...共有リソースにアクセスする...

  } // unique_lockの破棄時にunlock()される
}
```
* std::adopt_lock[color ff0000]
* mtx.lock()[link mutex/lock.md]
* std::unique_lock[link unique_lock.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
    - 2012, 2013は`constexpr`が実装されていないため、代わりに`adopt_lock`には`const`が修飾されている。


## 参照


