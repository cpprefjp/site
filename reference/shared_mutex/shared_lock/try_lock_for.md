# try_lock_for
* shared_mutex[meta header]
* std[meta namespace]
* shared_lock[meta class]
* function template[meta id-type]
* cpp14[meta cpp]

```cpp
template <class Rep, class Period>
bool try_lock_for(const chrono::duration<Rep, Period>& rel_time);
```

## 概要
タイムアウトする相対時間を指定して共有�ックの取得を試みる


## 効果
```cpp
pm->try_lock_for_shared(rel_time);
```

※`pm`はメンバ変数として保持している、ミューテックスオブジェクトへのポインタ


## 事後条件
[`owns_lock()`](owns_lock.md)の値が、`pm->try_lock_for_shared(rel_time)`の戻り値になること


## 戻り値
`pm->try_lock_for_shared(rel_time)`の戻り値が返る


## 例外
この関数は、`pm->try_lock_for_shared()` 関数内で投げられうるあらゆる例外を投げる可能性がある。 

そのほかに、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`operation_not_permitted`](/reference/system_error/errc.md) ： `pm`が`NULL`
- [`resource_deadlock_would_occur`](/reference/system_error/errc.md) ： [`owns_lock()`](owns_lock.md) `== true`の状態でこの関数が呼び出された


## 例
```cpp example
#include <cassert>
#include <system_error>
#include <chrono>
#include <shared_mutex>

int main()
{
  std::shared_timed_mutex mtx;
  {
    // 遅延�ックする(ここでは�ックを取得しない)
    std::shared_lock<std::shared_timed_mutex> lock(mtx, std::defer_lock);

    // 共有�ックの取得を試みる(3秒でタイムアウト)
    if (!lock.try_lock_for(std::chrono::seconds(3))) {
      // 共有�ックの取得に失敗
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }

    assert(lock.owns_lock() == true);
  }
}
```
* try_lock_for()[color ff0000]
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]
* std::defer_lock[link /reference/mutex/defer_lock.md]
* owns_lock()[link owns_lock.md]
* std::error_code[link /reference/system_error/error_code.md]
* std::errc::device_or_resource_busy[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::system_error[link /reference/system_error/system_error.md]

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
