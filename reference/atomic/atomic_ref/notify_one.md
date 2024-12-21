# notify_one
* atomic[meta header]
* std[meta namespace]
* atomic_ref[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void notify_one() const noexcept;
```

## 概要
待機しているスレッドをひとつ起床させる。

この関数は、[`wait()`](wait.md)関数によるブロッキング待機を解除する。


## テンプレートパラメータ制約
- C++26 : [`is_const_v`](/reference/type_traits/is_const.md)`<T>`が`false`であること


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
  bool state_ = false; // false:unlock, true:lock
public:
  void lock() noexcept {
    std::atomic_ref r{state_};
    while (r.exchange(true) == true) {
      r.wait(true);
    }
  }

  void unlock() noexcept {
    std::atomic_ref r{state_};
    r.store(false);
    r.notify_one();
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
* exchange[link exchange.md]
* store[link store.md]
* wait[link wait.md]

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
- [P1643R1 Add wait/notify to `atomic_ref`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1643r1.html)
- [P1960R0 NB Comment Changes Reviewed by SG1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1960r0.html)
    - 宣言に`const`を追加
- [P3323R1 cv-qualified types in `atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3323r1.html)
    - C++26でCV修飾されたテンプレート引数を受け取れるようになった
