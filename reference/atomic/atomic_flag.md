#atomic_flag(C++11)
```cpp
namespace std {
  struct atomic_flag;
}
```

##概要
`atomic_flag`クラスは、フラグを表現するためのアトミッククラスである。このクラスは、シンプルなtest-and-set (TAS)機能を提供し、セットとクリアの2状態のみを持つ。このクラスに対する操作はロックフリーであることが保証される。（機能的には[`atomic<bool>`](./atomic.md)クラスよりも貧弱だが、`atomic_flag`クラスの操作は必ずロックフリーである点が異なる。）


###メンバ関数
| | |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------|
| [`(constructor)`](./atomic_flag/atomic_flag.md) | コンストラクタ |
| `~atomic_flag() = default` | デストラクタ |
| `operator=(const atomic_flag&) = delete operator=(const atomic_flag&) volatile = delete` | 代入演算子 |
| [`test_and_set`](./atomic_flag/test_and_set.md) | テストしてフラグを立てる |
| [`clear`](./atomic_flag/clear.md) | フラグをクリアする |


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
* ATOMIC_FLAG_INIT[color ff0000]
* test_and_set[color ff0000]
* clear[color ff0000]


###出力例
```
2
1
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


###参照

