# コンストラクタ
* shared_mutex[meta header]
* std[meta namespace]
* shared_timed_mutex[meta class]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
shared_timed_mutex();                                   // (1)
shared_timed_mutex(const shared_timed_mutex&) = delete; // (2)
```

## timed_mutexオブジェクトの構築
- (1) : デフォルトコンストラクタ。`shared_timed_mutex`オブジェクトの初期化を行う。
- (2) : コピーコンストラクタ。コピー不可。


## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](/reference/system_error/errc.md): native handle型の計算ができない
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない
- [`device_or_resource_busy`](/reference/system_error/errc.md) : native handle型の計算が�ックされている
- [`invalid_argument`](/reference/system_error/errc.md) : ミューテックスを構築する一部のnative handle型計算が�しくない


## 例
```cpp example
#include <shared_mutex>

int main()
{
  // デフォルト構築 ： ミューテックスの初期化
  std::shared_timed_mutex mtx;
}
```

### 出力
```
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.5
- [GCC](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015
