#native_handle (C++11)
* condition_variable[meta header]
* std[meta namespace]
* condition_variable[meta class]
* function[meta id-type]

```cpp
native_handle_type native_handle();
```

##概要
条件変数のハンドルを取得する


##効果
この関数は、実装依存の条件変数ハンドルを返す。

- Unix系環境におけるlibstdc++とlibc++では、pthreadライブラリの条件変数型`pthread_cond_t*`を表す。
- Visual C++では、内部的なデータ構造への不透明なポインタ型（定義のない構造体へのポインタ型）を表す。

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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0

##参照


