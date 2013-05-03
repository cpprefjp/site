#コンストラクタ
```cpp
unique_lock() noexcept;
explicit unique_lock(mutex_type& m);

unique_lock(mutex_type& m, defer_lock_t) noexcept;
unique_lock(mutex_type& m, try_to_lock_t);
unique_lock(mutex_type& m, adopt_lock_t);

template <class Clock, class Duration>
unique_lock(mutex_type& m, const chrono::time_point<Clock, Duration>& abs_time);

template <class Rep, class Period>
unique_lock(mutex_type& m, const chrono::duration<Rep, Period>& rel_time);
```
* defer_lock_t[link /reference/mutex/defer_lock.md]
* try_to_lock_t[link /reference/mutex/try_to_lock.md]
* adopt_lock_t[link /reference/mutex/adopt_lock.md]
* time_point[link /reference/chrono/time_point.md]
* duration[link /reference/chrono/duration.md]

unique_lock(const unique_lock&) = delete;
unique_lock(unique_lock&& u) noexcept;





##unique_lockオブジェクトの構築

<li>`unique_lock() noexcept`空の`unique_lock`オブジェクトを構築する。ミューテックスオブジェクトへのポインタを保持せず、`[owns_lock()](/reference/mutex/unique_lock/owns_lock.md) == false`となる。
</li><li>`explicit unique_lock(mutex_type& m)`ミューテックスオブジェクトへの参照を受け取り、`m.lock()`を呼び出す。ミューテックスオブジェクトへのポインタを保持し、`[owns_lock()](/reference/mutex/unique_lock/owns_lock.md) == true`となる。
</li><li>`unique_lock(mutex_type& m, [defer_lock_t](/reference/mutex/defer_lock.md)) noexcept`ミューテックスオブジェクトへの参照を受け取り、ロック取得操作をここでは呼び出さない。ミューテックスオブジェクトへのポインタを保持し、
`[owns_lock()](/reference/mutex/unique_lock/owns_lock.md) == true`となる。 
</li><li>`unique_lock(mutex_type& m, [try_to_lock_t](/reference/mutex/try_to_lock.md))`ミューテックスオブジェクトへの参照を受け取り、`m.try_lock()`を呼び出す。ミューテックスオブジェクトへのポインタを保持し、[`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md) == m.try_lock()となる。
</li><li>`unique_lock(mutex_type& m, [adopt_lock_t](/reference/mutex/adopt_lock.md))`ロック取得済みのミューテックスオブジェクトへの参照を受け取り、ロック取得操作を呼び出さない。ミューテックスオブジェクトへのポインタを保持し、`[owns_lock()](/reference/mutex/unique_lock/owns_lock.md) == true`となる。
</li><li>`template <class Clock, class Duration>``unique_lock(mutex_type& m, const chrono::[time_point](/reference/chrono/time_point.md)<Clock, Duration>& abs_time)`ミューテックスオブジェクトへの参照を受け取り、`m.try_lock_until(abs_time)`を呼び出す。ミューテックスオブジェクトへのポインタを保持し、

[`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md) == ``m.try_lock_until(abs_time)となる。</li><li>`template <class Rep, class Period>``unique_lock(mutex_type& m, const chrono::[duration](/reference/chrono/duration.md)<Rep, Period>& rel_time)`ミューテックスオブジェクトへの参照を受け取り、

`m.try_lock_for(rel_time)`を呼び出す。ミューテックスオブジェクトへのポインタを保持し、

 [`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md) == ``m.try_lock_for(rel_time)となる。</li>
- `unique_lock(unique_lock const&) = delete`コピーコンストラクタ。コピー不可。
- `unique_lock(unique_lock&& u) noexcept`ムーブコンストラクタ。`unique_lock`オブジェクト`u`が保持しているミューテックスの所有権を自分のオブジェクトに移動する。ミューテックスオブジェクトへのポインタおよび[`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md)の状態を`u`から移動し、その後`u`はミューテックスオブジェクトへの有効なポインタを指さず、`[owns_lock()](/reference/mutex/unique_lock/owns_lock.md) == false`となる。



##例

```cpp
#include <iostream>
#include <mutex>
#include <chrono>
#include <utility> // move

int main()
{
  std::timed_mutex mtx;
  {
    // デフォルト構築 : ミューテックスを参照しない
    std::unique_lock<std::timed_mutex> lk;
  }
  {
    // ミューテックスへの参照を受け取る
    // 内部でmtx.lock()を呼び出す
    std::unique_lock<std::timed_mutex> lk(mtx);
  }
  {
    // コンストラクタ時点ではロック取得せず、あとからロック取得する
    std::unique_lock<std::timed_mutex> lk(mtx, std::defer_lock);
    lk.lock();
  }
  {
    // コンストラクタ内でmtx.try_lock()を呼び出す
    std::unique_lock<std::timed_mutex> lk(mtx, std::try_to_lock);
  }
  {
    mtx.lock(); // 事前にロックを取得する
    std::unique_lock<std::timed_mutex> lk(mtx, std::adopt_lock); // コンストラクタではロック取得しない
  }
  {
    namespace chrono = std::chrono;

    chrono::steady_clock::time_point tp = chrono::steady_clock::now() + chrono::seconds(3);

    // コンストラクタ内でmtx.try_lock_until(tp)を呼び出す
    std::unique_lock<std::timed_mutex> lk(mtx, tp);
  }
  {
    std::chrono::seconds d(3);

    // コンストラクタ内でmtx.try_lock_for(d)を呼び出す
    std::unique_lock<std::timed_mutex> lk(mtx, d);
  }
  {
    std::unique_lock<std::timed_mutex> lk1(mtx);

    // lk1からミューテックスの所有権を移動する
    std::unique_lock<std::timed_mutex> lk2 = std::move(lk1);
  }
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


