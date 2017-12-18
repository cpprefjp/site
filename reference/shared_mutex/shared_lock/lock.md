# lock
* shared_mutex[meta header]
* std[meta namespace]
* shared_lock[meta class]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
void lock();
```

## 概要
共有ロックを取得する


## 効果
```cpp
pm->lock_shared();
```

※`pm`はメンバ変数として保持している、ミューテックスオブジェクトへのポインタ


## 事後条件
[`owns_lock()`](owns_lock.md) `== true`


## 戻り値
なし


## 例外
この関数は、`pm->lock()` 関数内で投げられうるあらゆる例外を投げる可能性がある。

そのほかに、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`operation_not_permitted`](/reference/system_error/errc.md) ： `pm`が`NULL`
- [`resource_deadlock_would_occur`](/reference/system_error/errc.md) ： [`owns_lock()`](owns_lock.md) `== true`の状態でこの関数が呼び出された


## 例
```cpp example
#include <cassert>
#include <shared_mutex>

int main()
{
  std::shared_timed_mutex mtx;
  {
    // 遅延ロックする(ここではロックを取得しない)
    std::shared_lock<std::shared_timed_mutex> lock(mtx, std::defer_lock);

    // 共有ロックを取得する
    lock.lock();

    assert(lock.owns_lock() == true);
  }
}
```
* lock()[color ff0000]
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]
* std::defer_lock[link /reference/mutex/defer_lock.md]
* lock.owns_lock()[link owns_lock.md]

### 出力
```
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.5
- [GCC, C++11 mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015
