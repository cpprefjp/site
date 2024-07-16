# atomic_wait_explicit
* atomic[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  void atomic_wait(const volatile atomic<T>* object,
                   typename atomic<T>::value_type old,
                   memory_order order);                 // (1) C++20

  template<class T>
  void atomic_wait(const atomic<T>* object,
                   typename atomic<T>::value_type old,
                   memory_order order);                 // (2) C++20
}
```

## 概要
起床されるまで待機する。

この関数は、ブロッキング同期を行うための機能であり、ビジーループによるポーリングよりもエネルギー消費が低く効率的な待機を実現できる。アトミック操作版の[`std::condition_variable`](/reference/condition_variable/condition_variable.md)であると言える。

この関数によってブロッキング待機をしたら、対応する起床関数である[`atomic_notify_one()`](atomic_notify_one.md)、[`atomic_notify_all()`](atomic_notify_all.md)によってブロッキング待機を解除できる。


## テンプレートパラメータ制約
- (1) : `atomic<T>::is_always_lock_free`が`true`であること


## 効果
- 以下のステップを順に繰り返し実行する：
    - [`atomic_load_explicit`](atomic_load_explicit.md)`(object, order)`によって現在の値を読み込み、`old`と値を比較する
    - 現在の値と`old`が等しくなければ、関数を`return`する
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
  std::atomic<bool> state_{false}; // false:unlock, true:lock
public:
  void lock() noexcept {
    while (std::atomic_exchange_explicit(&state_, true, std::memory_order::acquire) == true) {
      std::atomic_wait_explicit(&state_, true, std::memory_order::relaxed);
    }
  }

  void unlock() noexcept {
    std::atomic_store_explicit(&state_, false, std::memory_order::release);
    std::atomic_notify_one(&state_);
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
* std::atomic_wait_explicit[color ff0000]
* std::atomic_exchange_explicit[link atomic_exchange_explicit.md]
* std::atomic_store_explicit[link atomic_store_explicit.md]
* std::atomic_notify_one[link atomic_notify_one.md]
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


## 関連項目
- [C++20 ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md)


## 参照
- [P0514R4 Efficient concurrent waiting for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0514r4.pdf)
- [ogiroux/atomic_wait - Sample implementation of C++20 atomic_wait/notify](https://github.com/ogiroux/atomic_wait)
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
