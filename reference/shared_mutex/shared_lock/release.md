#release
* shared_mutex[meta header]
* std[meta namespace]
* shared_lock[meta class]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
mutex_type* release() noexcept;
```

##概要
ミューテックスの所有権を放棄する。 

この関数を実行することで、`shared_lock`オブジェクトはミューテックスのアンロック責任を放棄する。この関数を実行したユーザーは、自分でミューテックスをアンロックする必要がある。


##事後条件
- 保持しているミューテックスオブジェクトへのポインタが`NULL`になること
- [`owns_lock()`](owns_lock.md) `== false`になること


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

    // lockが保持するミューテックスの所有権を放棄する
    // (lockオブジェクトのデストラクタでunlock_shared()が呼ばれなくなる)
    std::shared_timed_mutex* p = lock.release();

    // 所有権を持つユーザーが、自分でミューテックスのロックを手放す
    p->unlock_shared();
  }
}
```
* release()[color ff0000]
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]
* p->unlock_shared()[link /reference/shared_mutex/shared_timed_mutex/unlock_shared.md]

###出力
```
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.5
- [GCC, C++11 mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 14.0
