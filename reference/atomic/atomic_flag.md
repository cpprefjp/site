# atomic_flag
* atomic[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct atomic_flag;
}
```

## 概要
`atomic_flag`クラスは、フラグを表現するためのアトミッククラスである。このクラスは、シンプルなtest-and-set (TAS) 機能を提供し、有効値の�定とクリアの2状態のみを持つ。このクラスに対する操作は�ックフリーであることが保証される。（機能的には[`atomic<bool>`](atomic.md)クラスよりも貧弱だが、`atomic_flag`クラスの操作は必ず�ックフリーである点が異なる。）


### メンバ関数
| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|--------------------------|-------|
| [`(constructor)`](atomic_flag/op_constructor.md) | コンストラクタ           | C++11 |
| `~atomic_flag() = default`                      | デストラクタ             | C++11 |
| `operator=(const atomic_flag&) = delete`<br/>`operator=(const atomic_flag&) volatile = delete` | 代入演算� | C++11 |
| [`test`](atomic_flag/test.md) | 現在の値をbool値として取得する | C++20 |
| [`test_and_set`](atomic_flag/test_and_set.md) | テストしてフラグを立てる | C++11 |
| [`clear`](atomic_flag/clear.md)               | フラグをクリアする       | C++11 |
| [`wait`](atomic_flag/wait.md)                 | 起床されるまで待機する | C++20 |
| [`notify_one`](atomic_flag/notify_one.md)     | 待機しているスレッドをひとつ起床させる | C++20 |
| [`notify_all`](atomic_flag/notify_all.md)     | 待機している全てのスレッドを起床させる | C++20 |


### 例
```cpp example
// スピン�ックの実装
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
    // 現在の状態を�ック状態にする
    while (state_.test_and_set(std::memory_order_acquire)) {
      // busy-wait...アン�ックされるまで待機
    }
  }

  void unlock()
  {
    // 値をアン�ック状態にする
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

### 出力例
```
2
1
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013
	- 2012はコピーコンストラクタと代入演算�のdelete宣言が�在しない。


### 参照

