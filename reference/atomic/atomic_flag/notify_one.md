# notify_one
* atomic[meta header]
* std[meta namespace]
* atomic_flag[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void notify_one() volatile noexcept;
void notify_one() noexcept;
```

## 概要
待機しているスレッドをひとつ起床させる。

この関数は、[`wait()`](wait.md)関数によるブロッキング待機を解除する。


## 効果
起床待機している少なくともひとつのアトミックオブジェクトの待機を解除する


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

class my_mutex {
  std::atomic_flag state_ = ATOMIC_FLAG_INIT; // clear:unlock, set:lock
public:
  void lock() noexcept {
    while (state_.test_and_set()) {
      state_.wait(true);
    }
  }

  void unlock() noexcept {
    state_.clear();
    state_.notify_one();
  }
};

my_mutex mut;
void print(int x) {
  mut.lock();
  std::cout << x << std::endl;
  mut.unlock();
}

int main()
{
  std::thread t1 {[] {
    for (int i = 0; i < 5; ++i) {
      print(i);
    }
  }};
  std::thread t2 {[] {
    for (int i = 5; i < 10; ++i) {
      print(i);
    }
  }};

  t1.join();
  t2.join();
}
```
* notify_one()[color ff0000]
* test_and_set[link test_and_set.md]
* clear[link clear.md]
* wait[link wait.md]
* ATOMIC_FLAG_INIT[link /reference/atomic/atomic_flag_init.md]

### 出力例
```
0
5
1
6
2
7
3
8
4
9
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [P0514R4 Efficient concurrent waiting for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0514r4.pdf)
- [ogiroux/atomic_wait - Sample implementation of C++20 atomic_wait/notify](https://github.com/ogiroux/atomic_wait)
- [P1135R6 The C++20 Synchronization Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1135r6.html)
