#コンストラクタ (C++11)
* mutex[meta header]
* std[meta namespace]
* timed_mutex[meta class]
* function[meta id-type]

```cpp
timed_mutex();                            // (1)
timed_mutex(const timed_mutex&) = delete; // (2)
```

##timed_mutexオブジェクトの構築
- (1) : デフォルトコンストラクタ。`timed_mutex`オブジェクトの初期化を行う。
- (2) : コピーコンストラクタ。コピー不可。


##例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](/reference/system_error/errc.md): native handle型の計算ができない
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない
- [`device_or_resource_busy`](/reference/system_error/errc.md) : native handle型の計算がロックされている
- [`invalid_argument`](/reference/system_error/errc.md) : ミューテックスを構築する一部のnative handle型計算が正しくない


##例
```cpp
#include <mutex>

int main()
{
  // デフォルト構築 ： ミューテックスの初期化
  std::timed_mutex mtx;
}
```

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
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


