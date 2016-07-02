#mutex
* mutex[meta header]
* std[meta namespace]
* unique_lock[meta class]
* function[meta id-type]
* cpp11[meta cpp]

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
// libstdc++(pthread)
#include <iostream>
#include <mutex>

int main()
{
  std::mutex mtx;
  {
    std::unique_lock<std::mutex> lk(mtx);

    std::mutex* m = lk.mutex(); // ミューテックスを取得

    // ミューテックスの優先順位を取得する
    int prioceiling = 0;
    pthread_mutex_getprioceiling(m->native_handle(), &prioceiling);

    std::cout << prioceiling << std::endl;
  }
}
```
* mutex()[color ff0000]

###出力例
```
0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0


##参照


