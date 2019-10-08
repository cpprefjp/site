# atomic_notify_all
* atomic[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  void atomic_notify_all(volatile atomic<T>* object);

  template <class T>
  void atomic_notify_all(atomic<T>* object);
}
```

## 概要
待機している全てのスレッドを起床させる。

この関数は、[`atomic_wait()`](atomic_wait.md)関数によるブロッキング待機を解除する。


## 効果
起床待機している全てのアトミックオブジェクトの待機を解除する


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

int main()
{
  std::atomic<bool> x {false};

  auto f = [&x] {
    while (true) {
      std::atomic_wait(&x, false);
      if (std::atomic_load(&x) == true) {
        break;
      }
    }
  };

  std::thread t1 {f};
  std::thread t2 {f};

  std::atomic_store(&x, true);
  std::atomic_notify_all(&x);

  t1.join();
  t2.join();
}
```
* std::atomic_notify_all[color ff0000]
* std::atomic_load[link atomic_load.md]
* std::atomic_store[link atomic_store.md]
* std::atomic_wait[link atomic_wait.md]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)


## 参照
- [P0514R4 Efficient concurrent waiting for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0514r4.pdf)
- [ogiroux/atomic_wait - Sample implementation of C++20 atomic_wait/notify](https://github.com/ogiroux/atomic_wait)
