# native_handle
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
[[nodiscard]]
native_handle_type native_handle(); // (1) C++20
native_handle_type native_handle(); // (1) C++26
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
  std::jthread jt{func};
  SetThreadPriority(jt.native_handle(), THREAD_PRIORITY_IDLE);
  jt.join();
}
```
* native_handle()[color ff0000]

### 出力
```
func
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
