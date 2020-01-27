# notify_all
* atomic[meta header]
* std[meta namespace]
* atomic_flag[meta class]
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
  std::atomic_flag x = ATOMIC_FLAG_INIT;

  auto f = [&x] {
    while (true) {
      x.wait(false);
      if (x.test()) {
        break;
      }
    }
  };

  std::thread t1 {f};
  std::thread t2 {f};

  x.clear();
  x.notify_all();

  t1.join();
  t2.join();
}
```
* notify_all()[color ff0000]
* test[link test.md]
* clear[link clear.md]
* wait[link wait.md]
* ATOMIC_FLAG_INIT[link /reference/atomic/atomic_flag_init.md]

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
- [P1135R6 The C++20 Synchronization Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1135r6.html)
