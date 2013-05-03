#コンストラクタ
```cpp
timed_mutex();

timed_mutex(const timed_mutex&) = delete;
```

##timed_mutexオブジェクトの構築

<li>`timed_mutex()`デフォルトコンストラクタ。`timed_mutex`オブジェクトの初期化を行う。
</li>
- `timed_mutex(const timed_mutex&) = delete`コピーコンストラクタ。コピー不可。


##例外

この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- <u>resource_unavailable_try_again</u> : native handle型の計算ができない
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない
- [`device_or_resource_busy`](/reference/system_error/errc.md) : native handle型の計算がロックされている
- [`invalid_argument`](/reference/system_error/errc.md) : ミューテックスを構築する一部のnative handle型計算が正しくない



##備考



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

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


