# notify_all
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void notify_all() volatile noexcept;
void notify_all() noexcept;
```

## 概要
待機している全てのスレッドを起床させる。

この関数は、[`wait()`](wait.md)関数によるブ�ッ�ング待機を解除する。


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
  bool x = false;

  auto f = [&x] {
    std::atomic_ref r{x};
    while (true) {
      r.wait(false);
      if (r.load() == true) {
        break;
      }
    }
  };

  std::thread t1 {f};
  std::thread t2 {f};

  std::atomic_ref{x}.store(true);
  std::atomic_ref{x}.notify_all();

  t1.join();
  t2.join();
}
```
* notify_all()[color ff0000]
* load[link load.md]
* store[link store.md]
* wait[link wait.md]

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
- [P1643R1 Add wait/notify to `atomic_ref`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1643r1.html)
