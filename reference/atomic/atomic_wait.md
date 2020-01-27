# atomic_wait
* atomic[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  void atomic_wait(const volatile atomic<T>* object,
                   typename atomic<T>::value_type old); // (1) C++20

  template<class T>
  void atomic_wait(const atomic<T>* object,
                   typename atomic<T>::value_type old); // (2) C++20
}
```

## 概要
起床されるまで待機する。

この関数は、ブ�ッ�ング同期を行うための機能であり、ビジーループによるポーリングよりもエネルギー消費が低く効率的な待機を実現できる。アトミック操作版の[`std::condition_variable`](/reference/condition_variable/condition_variable.md)であると言える。

この関数によってブ�ッ�ング待機をしたら、対応する起床関数である[`atomic_notify_one()`](atomic_notify_one.md)、[`atomic_notify_all()`](atomic_notify_all.md)によってブ�ッ�ング待機を解除できる。


## 効果
- 以下のステップを順に繰り返し実行する：
    - [`atomic_load`](atomic_load.md)`(object)`によって現在の値を�み込み、`old`と値を比較する
    - 現在の値と`old`が�しくなければ、関数を`return`する
    - アトミック起床操作が呼ばれてアン�ックされるまで、この関数の実行をブ�ックする
        - ただし、起床操作が呼ばれていなくても、アン�ックされる場合がある (spuriously unblock)


## 戻り値
なし


## 例外
投げない


## 備考
- Windowsでは`WaitOnAddress()`関数、POSIXでは[`futex()`](https://linuxjm.osdn.jp/html/LDP_man-pages/man2/futex.2.html)関数が実装に使われる


## 例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

class my_mutex {
  std::atomic<bool> state_{false}; // false:unlock, true:lock
public:
  void lock() noexcept {
    while (std::atomic_exchange(&state_, true) == true) {
      std::atomic_wait(&state_, true);
    }
  }

  void unlock() noexcept {
    std::atomic_store(&state_, false);
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
* std::atomic_wait[color ff0000]
* std::atomic_exchange[link atomic_exchange.md]
* std::atomic_store[link atomic_store.md]
* std::atomic_notify_one[link atomic_notify_one.md]

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
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)


## 参照
- [P0514R4 Efficient concurrent waiting for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0514r4.pdf)
- [ogiroux/atomic_wait - Sample implementation of C++20 atomic_wait/notify](https://github.com/ogiroux/atomic_wait)
