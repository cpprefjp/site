#native_handle (C++11)
```cpp
native_handle_type native_handle();
```

##概要
ミューテックスのハンドルを取得する。


##効果
この関数は、実装依存のミューテックスハンドルを返す。 
ハンドル型の意味は実装が決定し、libstdc++/POSIX環境ではpthreadライブラリのミューテックス型`pthread_mutex_t*`を表す。
ハンドル型に対する操作は汎用的ではないため、環境依存のプログラミングが必要な場合に使用する。


##戻り値
実装依存のミューテックスハンドル


##例
```cpp
// libstdc++(pthread)環境での、ミューテックスの優先順位上限取得
#include <iostream>
#include <mutex>
#include <pthread.h>

int main()
{
  std::recursive_timed_mutex mtx;

  // ミューテックスの優先順位上限を取得する
  int prioceiling = 0;
  pthread_mutex_getprioceiling(mtx.native_handle(), &prioceiling);

  std::cout << prioceiling << std::endl;
}
```
* native_handle[color ff0000]


###出力
```
0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


