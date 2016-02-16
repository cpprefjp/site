#try_lock_until
* shared_mutex[meta header]
* std[meta namespace]
* shared_lock[meta class]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
template <class Clock, class Duration>
bool try_lock_until(const chrono::time_point<Clock, Duration>& abs_time);
```
* time_point[link /reference/chrono/time_point.md]

##概要
タイムアウトする絶対時間を指定して共有ロックの取得を試みる


##効果
```cpp
pm->try_lock_until_shared(abs_time);
```

※`pm`はメンバ変数として保持している、ミューテックスオブジェクトへのポインタ


##事後条件
[`owns_lock()`](owns_lock.md)の値が、`pm->try_lock_until_shared(abs_time)`の戻り値になること


##戻り値
`pm->try_lock_until_shared(abs_time)`の戻り値が返る


##例外
この関数は、`pm->try_lock_until_shared()` 関数内で投げられうるあらゆる例外を投げる可能性がある。 

そのほかに、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`operation_not_permitted`](/reference/system_error/errc.md) ： `pm`が`NULL`
- [`resource_deadlock_would_occur`](/reference/system_error/errc.md) ： [`owns_lock()`](owns_lock.md) `== true`の状態でこの関数が呼び出された


##例
```cpp
#include <cassert>
#include <system_error>
#include <chrono>
#include <shared_mutex>

int main()
{
  std::shared_timed_mutex mtx;
  {
    // 遅延ロックする(ここではロックを取得しない)
    std::shared_lock<std::shared_timed_mutex> lock(mtx, std::defer_lock);

    namespace chrono = std::chrono;
    chrono::steady_clock::time_point tp = chrono::steady_clock::now();

    // 共有ロックの取得を試みる(3秒でタイムアウト)
    if (!lock.try_lock_until(tp + std::chrono::seconds(3))) {
      // 共有ロックの取得に失敗
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }

    assert(lock.owns_lock() == true);
  }
}
```
* try_lock_until()[color ff0000]
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]
* std::defer_lock[link /reference/mutex/defer_lock.md]
* owns_lock()[link owns_lock.md]
* chrono::steady_clock[link /reference/chrono/steady_clock.md]
* now()[link /reference/chrono/steady_clock/now.md]
* std::chrono::seconds[link /reference/chrono/seconds.md]
* std::error_code[link /reference/system_error/error_code.md]
* std::errc::device_or_resource_busy[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::system_error[link /reference/system_error/system_error.md]
* assert[link /reference/cassert/assert.md]

###出力
```
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.5
- [GCC, C++11 mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 14.0
