#コンストラクタ
* shared_mutex[meta header]
* std[meta namespace]
* shared_lock[meta class]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
shared_lock() noexcept;                                           // (1)
explicit shared_lock(mutex_type& m);                              // (2)

shared_lock(mutex_type& m, defer_lock_t) noexcept;                // (3)
shared_lock(mutex_type& m, try_to_lock_t);                        // (4)
shared_lock(mutex_type& m, adopt_lock_t);                         // (5)

template <class Clock, class Duration>
shared_lock(mutex_type& m,
            const chrono::time_point<Clock, Duration>& abs_time); // (6)

template <class Rep, class Period>
shared_lock(mutex_type& m,
            const chrono::duration<Rep, Period>& rel_time);       // (7)

shared_lock(const shared_lock&) = delete;                         // (8)
shared_lock(shared_lock&& u) noexcept;                            // (9)
```
* defer_lock_t[link /reference/mutex/defer_lock.md]
* try_to_lock_t[link /reference/mutex/try_to_lock.md]
* adopt_lock_t[link /reference/mutex/adopt_lock.md]
* time_point[link /reference/chrono/time_point.md]
* duration[link /reference/chrono/duration.md]


##概要
- (1) : デフォルトコンストラクタ
- (2) : 共有ミューテックスオブジェクトを受け取るコンストラクタ。共有ロックを取得する。
- (3) : 共有ミューテックスオブジェクトを受け取り、その場では共有ロックを取得しない。
- (4) : 共有ミューテックスオブジェクトを受け取り、共有ロックの取得を試みる。
- (5) : 共有ロック取得済みの共有ミューテックスを受け取る。
- (6) : 共有ミューテックスオブジェクトを受け取り、指定された絶対時間をタイムアウト時間として、共有ロックの取得を試みる。
- (7) : 共有ミューテックスオブジェクトを受け取り、指定された相対時間をタイムアウト時間として、共有ロックの取得を試みる。
- (8) : コピーコンストラクタ。コピー不可。
- (9) : ムーブコンストラクタ。共有ミューテックスの所有権を移動する。


##効果
- (1) : 空の`shared_lock`オブジェクトを構築する。共有ミューテックスオブジェクトへのポインタを保持しない。
- (2) : 共有ミューテックスオブジェクトへの参照を受け取り、`m.lock_shared()`を呼び出す。共有ミューテックスオブジェクトへのポインタを保持する。
- (3) : 共有ミューテックスオブジェクトへの参照を受け取り、共有ロックの取得操作をここでは呼び出さない。共有ミューテックスオブジェクトへのポインタを保持する。
- (4) : 共有ミューテックスオブジェクトへの参照を受け取り、`m.try_lock_shared()`を呼び出す。共有ミューテックスオブジェクトへのポインタを保持する。
- (5) : 共有ロック取得済みの共有ミューテックスオブジェクトへの参照を受け取り、共有ロックの取得操作を呼び出さない。共有ミューテックスオブジェクトへのポインタを保持する。
- (6) : 共有ミューテックスオブジェクトへの参照を受け取り、`m.try_lock_until_shared(abs_time)`を呼び出す。共有ミューテックスオブジェクトへのポインタを保持する。
- (7) : 共有ミューテックスオブジェクトへの参照を受け取り、`m.try_lock_for_shared(rel_time)`を呼び出す。共有ミューテックスオブジェクトへのポインタを保持する。
- (9) : ムーブコンストラクタ。`shared_lock`オブジェクト`u`が保持している共有ミューテックスの所有権を、自分のオブジェクトに移動する。共有ミューテックスオブジェクトへのポインタおよび[`owns_lock()`](owns_lock.md)の状態を`u`から移動する。


##事後条件
- (1) : [`owns_lock()`](owns_lock.md) `== false`
- (2) : [`owns_lock()`](owns_lock.md) `== true`
- (3) : [`owns_lock()`](owns_lock.md) `== false`
- (4) : [`owns_lock()`](owns_lock.md) `== m.try_lock()`
- (5) : [`owns_lock()`](owns_lock.md) `== true`
- (6) : [`owns_lock()`](owns_lock.md) `== m.try_lock_until(abs_time)`
- (7) : [`owns_lock()`](owns_lock.md) `== m.try_lock_for(rel_time)`
- (9) : `u`は共有ミューテックスオブジェクトへの有効なポインタを指さず、[`owns_lock()`](owns_lock.md) `== false`となる。


##例
```cpp
#include <shared_mutex>
#include <chrono>
#include <utility> // move

int main()
{
  std::shared_timed_mutex mtx;
  {
    // (1) : デフォルト構築
    // ミューテックスを参照しない
    std::shared_lock<std::shared_timed_mutex> lk;
  }
  {
    // (2)
    // ミューテックスへの参照を受け取る
    // 内部でmtx.lock()を呼び出す
    std::shared_lock<std::shared_timed_mutex> lk(mtx);
  }
  {
    // (3)
    // コンストラクタ時点では共有ロック取得せず、あとから取得する
    std::shared_lock<std::shared_timed_mutex> lk(mtx, std::defer_lock);
    lk.lock();
  }
  {
    // (4)
    // コンストラクタ内でmtx.try_lock_shared()を呼び出す
    std::shared_lock<std::shared_timed_mutex> lk(mtx, std::try_to_lock);
  }
  {
    // (5)
    // 共有ロックを取得済みのミューテックスを受け取り、
    // コンストラクタでは共有ロックを取得しない
    mtx.lock_shared(); // 事前に共有ロックを取得する
    std::shared_lock<std::shared_timed_mutex> lk(mtx, std::adopt_lock);
  }
  {
    namespace chrono = std::chrono;

    chrono::steady_clock::time_point tp = chrono::steady_clock::now() + chrono::seconds(3);

    // (6)
    // コンストラクタ内でmtx.try_lock_until_shared(tp)を呼び出す
    std::shared_lock<std::shared_timed_mutex> lk(mtx, tp);
  }
  {
    std::chrono::seconds d(3);

    // (7)
    // コンストラクタ内でmtx.try_lock_for_shared(d)を呼び出す
    std::shared_lock<std::shared_timed_mutex> lk(mtx, d);
  }
  {
    std::shared_lock<std::shared_timed_mutex> lk1(mtx);

    // (9)
    // lk1からミューテックスの所有権を移動する
    std::shared_lock<std::shared_timed_mutex> lk2 = std::move(lk1);
  }
}
```
* std::shared_timed_mutex[link /reference/shared_mutex/shared_timed_mutex.md]
* std::defer_lock[link /reference/mutex/defer_lock.md]
* lk.lock()[link lock.md]
* std::try_to_lock[link /reference/mutex/try_to_lock.md]
* mtx.lock_shared()[link /reference/shared_mutex/shared_timed_mutex/lock_shared.md]
* std::adopt_lock[link /reference/mutex/adopt_lock.md]
* std::move[link /reference/utility/move.md]
* chrono::seconds[link /reference/chrono/seconds.md]
* chrono::steady_clock[link /reference/chrono/steady_clock.md]
* now()[link /reference/chrono/steady_clock/now.md]
* std::chrono::seconds[link /reference/chrono/seconds.md]

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
