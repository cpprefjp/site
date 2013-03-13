```cpp
namespace std {
  struct atomic_flag;
}
```

##概要

`atomic_flag`クラスは、フラグを表現するためのアトミッククラスである。このクラスは、シンプルなtest-and-set (TAS)機能を提供し、セットとクリアの2状態のみを持つ。このクラスに対する操作はロックフリーであることが保証される。（機能的には[`atomic<bool>`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic)クラスよりも貧弱だが、atomic_flagクラスの操作は必ずロックフリーである点が異なる。）

###メンバ関数

| | |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| [`(constructor)`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag/atomic_flag) | コンストラクタ |
| `~atomic_flag() = default` | デストラクタ |
| `operator=(const atomic_flag&) = delete operator=(const atomic_flag&) volatile = delete` | 代入演算子 |
| [`test_and_set`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag/test_and_set) | テストしてフラグを立てる |
| [`clear`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag/clear) | フラグをクリアする |

###例
```cpp
// スピンロックの実装
#include <iostream>
#include <atomic>
#include <thread>
#include <mutex>
 
class spinlock {
private:
  std::atomic_flag state_;

public:
  spinlock() : state_(ATOMIC_FLAG_INIT) {}
  
  void lock()
  {
    // 現在の状態をロック状態にする
    while (state_.test_and_set(std::memory_order_acquire)) {
      // busy-wait...アンロックされるまで待機
    }
  }

  void unlock()
  {
    // 値をアンロック状態にする
    state_.clear(std::memory_order_release);
  }
};

namespace {
  spinlock lock;
}

template <class T>
void print(const T& x)
{
  std::lock_guard<spinlock> lk(lock);
  std::cout << x << std::endl;
}

void f()
{
  print(1);
}

void g()
{
  print(2);
}

int main()
{
  std::thread t1(f);
  std::thread t2(g);

  t1.join();
  t2.join();
}
```
* ATOMIC_FLAG_INIT) {}[color ff0000]
* test_and_set[color ff0000]
* clear[color ff0000]

###出力例
```cpp
21
```

##

##バージョン

###言語

- C++11

###処理系

- [Clang](https://sites.google.com/site/cpprefjp/implementation#clang): ??
- [GCC](https://sites.google.com/site/cpprefjp/implementation#gcc): 
- [GCC, C++0x mode](https://sites.google.com/site/cpprefjp/implementation#gcc): 4.7.0
- [ICC](https://sites.google.com/site/cpprefjp/implementation#icc): ??
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) ??


###参照

