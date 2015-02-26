#owns_lock (C++14)
* shared_mutex[meta header]

```cpp
bool owns_lock() const noexcept;
```

##概要
共有ロックを取得しているかを確認する。


##戻り値
共有ロックを取得済みであれば`true`、そうでなければ`false`を返す。


##例外
投げない


##例
```cpp
#include <cassert>
#include <shared_mutex>

int main()
{
  std::shared_timed_mutex mtx;
  {
    std::shared_lock<std::shared_timed_mutex> lock(mtx);

    // コンストラクタで共有ロックが取得されるので、
    // owns_lock() == true
    assert(lock.owns_lock());
  } // 共有ロックを手放す(shared_lockのデストラクタ)
  
  {
    std::shared_lock<std::shared_timed_mutex> lock(mtx, std::defer_lock);
    
    // 遅延ロックのため、コンストラクタで共有ロックが取得されないので、
    // owns_lock() == false
    assert(!lock.owns_lock());

    lock.lock();

    // 共有ロック取得後なので、
    // owns_lock() == true
    assert(lock.owns_lock());
  } // 共有ロックを手放す(shared_lockのデストラクタ)
}
```
* owns_lock[color ff0000]
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]
* std::defer_lock[link /reference/mutex/defer_lock.md]
* lock()[link /reference/shared_mutex/shared_timed_mutex/lock.md]
* unlock()[link /reference/shared_mutex/shared_timed_mutex/unlock.md]

###出力
```
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.5
- [GCC, C++0x mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??



