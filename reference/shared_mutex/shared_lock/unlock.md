# unlock
* shared_mutex[meta header]
* std[meta namespace]
* shared_lock[meta class]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
void unlock();
```

## 概要
共有�ックを手放す


## 効果
```cpp
pm->unlock_shared();
```

※`pm`はメンバ変数として保持している、ミューテックスオブジェクトへのポインタ


## 事後条件
[`owns_lock()`](owns_lock.md) `== false`


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`operation_not_permitted`](/reference/system_error/errc.md) ： [`owns_lock()`](owns_lock.md) `== false`の状態でこの関数が呼び出された


## 例
```cpp example
#include <cassert>
#include <shared_mutex>

int main()
{
  std::shared_timed_mutex mtx;
  {
    // 共有�ックを取得する
    std::shared_lock<std::shared_timed_mutex> lock(mtx);

    // 共有�ックを手放す
    lock.unlock();

    assert(lock.owns_lock() == false);
  } // すでに共有�ックを手放しているので、
    // デストラクタではunlock_sharedされない
}
```
* unlock()[color ff0000]
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]
* owns_lock()[link owns_lock.md]

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
