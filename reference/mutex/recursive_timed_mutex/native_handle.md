# native_handle
* mutex[meta header]
* std[meta namespace]
* recursive_timed_mutex[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
native_handle_type native_handle();
```

## 概要
ミューテックスのハンドルを取得する。


## 効果
この関数は、実装依存のミューテックスハンドルを返す。

- Unix系環境におけるlibstdc++とlibc++では、pthreadライブラリのミューテックス型`pthread_mutex_t*`を表す。
- Visual C++では、付属ライブラリの同時実行ランタイムの型`concurrency::critical_section*`を表す。ただし、`native_handle`の戻り値はそれを`void*`にキャストした値であり、`native_handle_type`は`void*`である。

ハンドル型に対する操作は汎用的ではないため、環境依存のプログラミングが必要な場合に使用する。


## 戻り値
実装依存のミューテックスハンドル


## 例
```cpp example
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
* native_handle()[color ff0000]


### 出力
```
0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
