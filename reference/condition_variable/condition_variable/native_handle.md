#native_handle(C++11)
```cpp
native_handle_type native_handle();
```

##概要
条件変数のハンドルを取得する


##効果
この関数は、実装依存の条件変数ハンドルを返す。
ハンドル型の意味は実装が決定し、libstdc++環境であればpthreadライブラリの条件変数型`pthread_cond_t*`を表す。
ハンドル型に対する操作は汎用的ではないため、環境依存のプログラミングが必要な場合に使用する。


##戻り値
実装依存の条件変数ハンドル


##例
```cpp
#include <condition_variable>
#include <pthread.h>

int main()
{
  std::condition_variable cond;

  // データの準備ができたことを通知する(notify_one()と同じ)
  pthread_cond_signal(cond.native_handle()); 
}
```
* native_handle[color ff0000]

###出力
```
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


