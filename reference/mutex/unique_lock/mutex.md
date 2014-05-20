#mutex (C++11)
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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


