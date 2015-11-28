#swap (非メンバ関数)
* shared_mutex[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class Mutex>
  void swap(shared_lock<Mutex>& x, shared_lock<Mutex>& y) noexcept;
}
```

##概要
2つの`shared_lock`オブジェクトを入れ替える


##効果
```cpp
x.swap(y);
```
* swap[link swap.md]


##戻り値
なし


##例外
投げない


##例
```cpp
#include <shared_mutex>

int main()
{
  std::shared_timed_mutex mtx;
  {
    std::shared_lock<std::shared_timed_mutex> lock1(mtx);
    std::shared_lock<std::shared_timed_mutex> lock2;

    std::swap(lock1, lock2);

  } // lock1はunlock_shared()せず、lock2がunlock_shared()する
}
```
* swap[color ff0000]
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]

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
