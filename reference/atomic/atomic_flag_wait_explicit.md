# atomic_flag_wait_explicit
* atomic[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  void
    atomic_flag_wait_explicit(
      const volatile atomic_flag* object,
      bool old,
      memory_order order) noexcept;  // (1) C++20

  void
    atomic_flag_wait_explicit(
      const atomic_flag* object,
      bool old,
      memory_order order) noexcept;  // (2) C++20
  constexpr void
    atomic_flag_wait_explicit(
      const atomic_flag* object,
      bool old,
      memory_order order) noexcept;  // (2) C++26
}
```

## 概要
起床されるまで待機する。

この関数は、ブロッキング同期を行うための機能であり、ビジーループによるポーリングよりもエネルギー消費が低く効率的な待機を実現できる。アトミック操作版の[`std::condition_variable`](/reference/condition_variable/condition_variable.md)であると言える。

この関数によってブロッキング待機をしたら、対応する起床関数である[`atomic_flag_notify_one()`](atomic_flag_notify_one.md)、[`atomic_flag_notify_all()`](atomic_flag_notify_all.md)によってブロッキング待機を解除できる。


## 事前条件
`order`が以下のメモリオーダーではないこと：

- [`memory_order_release`](/reference/atomic/memory_order.md)
- [`memory_order_acq_rel`](/reference/atomic/memory_order.md)


## 効果
- 以下のステップを順に繰り返し実行する：
    - 式[`atomic_flag_test_explicit`](atomic_flag_test_explicit.md)`(object, order) != old`を評価する
    - 比較結果が`true`に評価された場合、関数を`return`する
    - アトミック起床操作が呼ばれてアンロックされるまで、この関数の実行をブロックする
        - ただし、起床操作が呼ばれていなくても、アンロックされる場合がある (spuriously unblock)


## 戻り値
なし


## 例外
投げない


## 備考
- Windowsでは`WaitOnAddress()`関数、POSIXでは[`futex()`](https://web.archive.org/web/20230605025744/https://linuxjm.osdn.jp/html/LDP_man-pages/man2/futex.2.html)関数が実装に使われる


## 例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

class my_mutex {
  std::atomic_flag state_ = ATOMIC_FLAG_INIT; // clear:unlock, set:lock
public:
  void lock() noexcept {
    while (std::atomic_flag_test_and_set_explicit(&state_, std::memory_order::acquire)) {
      std::atomic_flag_wait_explicit(&state_, true, std::memory_order::relaxed);
    }
  }

  void unlock() noexcept {
    std::atomic_flag_clear_explicit(&state_, std::memory_order::release);
    std::atomic_flag_notify_one(&state_);
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
* std::atomic_flag_wait_explicit[color ff0000]
* std::atomic_flag_test_and_set_explicit[link atomic_flag_test_and_set_explicit.md]
* std::atomic_flag_clear_explicit[link atomic_flag_clear_explicit.md]
* std::atomic_flag_notify_one[link /reference/atomic/atomic_flag_notify_one.md]
* ATOMIC_FLAG_INIT[link /reference/atomic/atomic_flag_init.md]
* std::memory_order[link /reference/atomic/memory_order.md]

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
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
