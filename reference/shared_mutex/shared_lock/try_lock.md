#try_lock_shared (C++14)
* shared_mutex[meta header]

```cpp
bool try_lock_shared();
```

##概要
共有ロックの取得を試みる


##効果
```cpp
pm->try_lock_shared();
```

※`pm`はメンバ変数として保持している、ミューテックスオブジェクトへのポインタ


##事後条件
[`owns_lock()`](./owns_lock.md)の値が、`pm->try_lock_shared()`の戻り値になること


##戻り値
`pm->try_lock_shared()`の戻り値が返る


##例外
この関数は、`pm->try_lock_shared()` 関数内で投げられうるあらゆる例外を投げる可能性がある。 

そのほかに、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`operation_not_permitted`](/reference/system_error/errc.md) ： `pm`が`NULL`
- [`resource_deadlock_would_occur`](/reference/system_error/errc.md) ： [`owns_lock()`](./owns_lock.md)` == true`の状態でこの関数が呼び出された


##例
```cpp
#include <cassert>
#include <system_error>
#include <shared_mutex>

int main()
{
  std::shared_timed_mutex mtx;
  {
    // 遅延ロックする(ここではロックを取得しない)
    std::shared_lock<std::shared_timed_mutex> lock(mtx, std::defer_lock);

    // 共有ロックの取得を試みる
    if (!lock.try_lock()) {
      // 共有ロックの取得に失敗
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }

    assert(lock.owns_lock() == true);
  }
}
```
* try_lock()[color ff0000]
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]
* std::defer_lock[link /reference/mutex/defer_lock.md]
* owns_lock()[link ./owns_lock.md]
* std::error_code[link /reference/system_error/error_code.md]
* std::errc::device_or_resource_busy[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::system_error[link /reference/system_error/system_error.md]

###出力
```
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.5
- [GCC, C++0x mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??



