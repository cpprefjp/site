# native_handle
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
native_handle_type native_handle();
```

## 概要
スレッドのハンドルを取得する


## 効果
この関数は、実装依存のスレッドのハンドルを返す。

- Unix系環境におけるlibstdc++とlibc++では、`pthread_t`を表す。
- Visual C++では、Windowsのスレッドハンドル`HANDLE`を表す。ただし、`native_handle_type`は`void*`型の別名である。`HANDLE`も`void*`型の別名であり、別途`<windows.h>`または`<wtypes.h>`をインクルードすると`HANDLE`型が使用できる。

ハンドル型に対する操作は汎用的ではないため、環境依存のプログラミングが必要な場合に使用する。


## 戻り値
実装依存のスレッドハンドル


## 例
```cpp example
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
* native_handle()[color ff0000]

### 出力
```
func
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015

## 参照


