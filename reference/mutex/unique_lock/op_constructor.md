# コンストラクタ
* mutex[meta header]
* std[meta namespace]
* unique_lock[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
unique_lock() noexcept;                                           // (1)
explicit unique_lock(mutex_type& m);                              // (2)

unique_lock(mutex_type& m, defer_lock_t) noexcept;                // (3)
unique_lock(mutex_type& m, try_to_lock_t);                        // (4)
unique_lock(mutex_type& m, adopt_lock_t);                         // (5)

template <class Clock, class Duration>
unique_lock(mutex_type& m,
            const chrono::time_point<Clock, Duration>& abs_time); // (6)

template <class Rep, class Period>
unique_lock(mutex_type& m,
            const chrono::duration<Rep, Period>& rel_time);       // (7)

unique_lock(const unique_lock&) = delete;                         // (8)
unique_lock(unique_lock&& u) noexcept;                            // (9)
```
* defer_lock_t[link /reference/mutex/defer_lock.md]
* try_to_lock_t[link /reference/mutex/try_to_lock.md]
* adopt_lock_t[link /reference/mutex/adopt_lock.md]
* chrono::time_point[link /reference/chrono/time_point.md]


## 概要
- (1) : デフォルトコンストラクタ
- (2) : ミューテックスオブジェクトを受け取るコンストラクタ。�ックを取得する。
- (3) : ミューテックスオブジェクトを受け取り、その場では�ックを取得しない。
- (4) : ミューテックスオブジェクトを受け取り、�ックの取得を試みる。
- (5) : �ック取得済みのミューテックスを受け取る。
- (6) : ミューテックスオブジェクトを受け取り、指定された絶対時間をタイムアウト時間として、�ックの取得を試みる。
- (7) : ミューテックスオブジェクトを受け取り、指定された相対時間をタイムアウト時間として、�ックの取得を試みる。
- (8) : コピーコンストラクタ。コピー不可。
- (9) : ムーブコンストラクタ。ミューテックスの所有権を移動する。


## 効果
- (1) : 空の`unique_lock`オブジェクトを構築する。ミューテックスオブジェクトへのポインタを保持しない。
- (2) : ミューテックスオブジェクトへの参照を受け取り、`m.lock()`を呼び出す。ミューテックスオブジェクトへのポインタを保持する。
- (3) : ミューテックスオブジェクトへの参照を受け取り、�ック取得操作をここでは呼び出さない。ミューテックスオブジェクトへのポインタを保持する。
- (4) : ミューテックスオブジェクトへの参照を受け取り、`m.try_lock()`を呼び出す。ミューテックスオブジェクトへのポインタを保持する。
- (5) : �ック取得済みのミューテックスオブジェクトへの参照を受け取り、�ック取得操作を呼び出さない。ミューテックスオブジェクトへのポインタを保持する。
- (6) : ミューテックスオブジェクトへの参照を受け取り、`m.try_lock_until(abs_time)`を呼び出す。ミューテックスオブジェクトへのポインタを保持する。
- (7) : ミューテックスオブジェクトへの参照を受け取り、`m.try_lock_for(rel_time)`を呼び出す。ミューテックスオブジェクトへのポインタを保持する。
- (9) : ムーブコンストラクタ。`unique_lock`オブジェクト`u`が保持しているミューテックスの所有権を、自分のオブジェクトに移動する。ミューテックスオブジェクトへのポインタおよび[`owns_lock()`](owns_lock.md)の状態を`u`から移動する。


## 事後条件
- (1) : [`owns_lock()`](owns_lock.md) `== false`
- (2) : [`owns_lock()`](owns_lock.md) `== true`
- (3) : [`owns_lock()`](owns_lock.md) `== false`
- (4) : [`owns_lock()`](owns_lock.md) `== m.try_lock()`
- (5) : [`owns_lock()`](owns_lock.md) `== true`
- (6) : [`owns_lock()`](owns_lock.md) `== m.try_lock_until(abs_time)`
- (7) : [`owns_lock()`](owns_lock.md) `== m.try_lock_for(rel_time)`
- (9) : `u`はミューテックスオブジェクトへの有効なポインタを指さず、[`owns_lock()`](owns_lock.md) `== false`となる。


## 例
```cpp example
#include <iostream>
#include <mutex>
#include <chrono>
#include <utility>

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
    // コンストラクタ時点では�ック取得せず、あとから�ック取得する
    std::unique_lock<std::timed_mutex> lk(mtx, std::defer_lock);
    lk.lock();
  }
  {
    // コンストラクタ内でmtx.try_lock()を呼び出す
    std::unique_lock<std::timed_mutex> lk(mtx, std::try_to_lock);
  }
  {
    mtx.lock(); // 事前に�ックを取得する
    std::unique_lock<std::timed_mutex> lk(mtx, std::adopt_lock); // コンストラクタでは�ック取得しない
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
* std::timed_mutex[link /reference/mutex/timed_mutex.md]
* std::defer_lock[link /reference/mutex/defer_lock.md]
* std::try_to_lock[link /reference/mutex/try_to_lock.md]
* mtx.lock()[link /reference/mutex/timed_mutex/lock.md]
* std::adopt_lock[link /reference/mutex/adopt_lock.md]
* chrono::steady_clock[link /reference/chrono/steady_clock.md]
* now()[link /reference/chrono/steady_clock/now.md]
* std::move[link /reference/utility/move.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
    - 2012はコピーコンストラクタのdeleteに対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。

## 参照


