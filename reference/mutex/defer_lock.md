# defer_lock
* mutex[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct defer_lock_t { explicit defer_lock_t() = default; };
  constexpr defer_lock_t defer_lock { };        // C++11
  inline constexpr defer_lock_t defer_lock { }; // C++17
}
```

## 概要
`defer_lock_t`型とその値`defer_lock`は、遅延ロックのためのタグである。

`lock()/unlock()`の呼び出しをRAIIで自動化する[`unique_lock`](unique_lock.md)クラスのコンストラクタで`lock()`を呼び出させないために使用する。


## 例
```cpp example
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
* std::defer_lock[color ff0000]
* lk.lock()[link unique_lock/lock.md]

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
    - 2012, 2013は`constexpr`が実装されていないため、代わりに`defer_lock`には`const`が修飾されている。


## 参照
- [LWG Issue 2510. Tag types should not be `DefaultConstructible`](https://cplusplus.github.io/LWG/issue2510)
