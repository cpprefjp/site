#swap (C++14)
* shared_mutex[meta header]
* std[meta namespace]
* shared_lock[meta class]
* function[meta id-type]

```cpp
void swap(shared_lock& u) noexcept;
```

##概要
他の`shared_lock`オブジェクトと値を入れ替える


##効果
`shared_lock`オブジェクト`u`が保持しているミューテックスの所有権を、自分のオブジェクトが保持しているミューテックスの所有権と入れ替える。


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

    lock1.swap(lock2);

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
- [GCC, C++0x mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??



