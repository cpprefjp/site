#コンストラクタ (C++11)
```cpp
recursive_mutex();                                // (1)
recursive_mutex(const recursive_mutex&) = delete; // (2)
```

##recursive_mutexオブジェクトの構築
- (1) : デフォルトコンストラクタ。`recursive_mutex`オブジェクトの初期化を行う。
- (2) : コピーコンストラクタ。コピー不可。


##例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：
- [`resource_unavailable_try_again`](/reference/system_error/errc.md) : native handle型の計算ができない
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない
- [`device_or_resource_busy`](/reference/system_error/errc.md) : native handle型の計算がロックされている
- [`invalid_argument`](/reference/system_error/errc.md) : ミューテックスを構築する一部のnative handle型計算が正しくない


##備考
非自明なコンストラクタが定義されるため、ムーブコンストラクタは定義されない。


##例
```cpp
#include <mutex>

int main()
{
  // デフォルト構築：ミューテックスの初期化
  std::recursive_mutex mtx;
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


