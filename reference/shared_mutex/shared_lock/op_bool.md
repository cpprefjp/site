#operator bool (C++14)
```cpp
explicit operator bool() const noexcept;
```

##概要
ロックを取得しているかを確認する


##戻り値
排他ロックか共有ロック、いずれかが取得済みであれば`true`、そうでなければ`false`を返す。


##例外
投げない


##例
```cpp
#include <iostream>
#include <cassert>
#include <shared_mutex>

int main()
{
  std::shared_timed_mutex mtx;
  {
    std::shared_lock<std::shared_timed_mutex> lock(mtx);

    // コンストラクタで共有ロックが取得されるので、
    // boolへの変換はtrueとなる
    if (lock) {
      std::cout << "locked" << std::endl;
    }
    else {
      assert(false);
    }
  }
  {
    std::shared_lock<std::shared_timed_mutex> lock(mtx, std::defer_lock);
    
    // 遅延ロックのため、コンストラクタで共有ロックが取得されないので、
    // boolへの変換はfalseとなる
    if (!lock) {
      std::cout << "unlocked" << std::endl;
    }
    else {
      assert(false);
    }

    lock.lock();

    // 排他ロック取得後なので、
    // boolへの変換はtrueとなる
    if (lock) {
      std::cout << "locked" << std::endl;
    }
    else {
      assert(false);
    }

    lock.unlock();
  }
}
```
* if (lock)[color ff0000]
* if (!lock)[color ff0000]
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]
* std::defer_lock[link /reference/mutex/defer_lock.md]
* lock()[link /reference/shared_mutex/shared_timed_mutex/lock.md]
* unlock()[link /reference/shared_mutex/shared_timed_mutex/unlock.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```cpp
locked
unlocked
locked
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.5
- [GCC, C++0x mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??



