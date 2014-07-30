#native_handle (C++11)
```cpp
native_handle_type native_handle();
```

##概要
スレッドのハンドルを取得する


##効果
この関数は、実装依存のスレッドのハンドルを返す。

- Unix系環境におけるlibstdc++とlibc++では、`pthread_t`を表す。
- Visual C++では、Windowsのスレッドハンドル`HANDLE`を表す。

ハンドル型に対する操作は汎用的ではないため、環境依存のプログラミングが必要な場合に使用する。


##戻り値
実装依存のスレッドハンドル


##例
```cpp
#include <thread>
#include <iostream>
#include <windows.h>

void func() {
  std::cout << "func" << std::endl;
}

int main() {
  std::thread t(func);
  SetThreadPriority(t.native_handle(), THREAD_PRIORITY_IDLE);
  t.join();
}
```
* native_handle[color ff0000]

###出力
```
func
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md):
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0, 12.0

##参照


