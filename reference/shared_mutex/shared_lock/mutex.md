#mutex (C++14)
* shared_mutex[meta header]
* std[meta namespace]

```cpp
mutex_type* mutex() const noexcept;
```

##概要
所有しているミューテックスオブジェクトを取得する


##戻り値
保持しているミューテックスオブジェクトへのポインタを返す


##例外
投げない


##例
```cpp
#include <shared_mutex>

int main()
{
  std::shared_timed_mutex mtx;
  {
    std::shared_lock<std::shared_timed_mutex> lock(mtx);

    // ミューテックスを取得
    std::shared_timed_mutex* m = lock.mutex();
  }
}
```
* mutex()[color ff0000]
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]

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



