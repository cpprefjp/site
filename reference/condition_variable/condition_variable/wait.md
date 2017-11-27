# wait
* condition_variable[meta header]
* std[meta namespace]
* condition_variable[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void wait(unique_lock<mutex>& lock);                 // (1)

template <class Predicate>
void wait(unique_lock<mutex>& lock, Predicate pred); // (2)
```
* unique_lock[link /reference/mutex/unique_lock.md]
* mutex[link /reference/mutex/mutex.md]


## 概要
起床されるまで待機する。

この関数は、処理をするための準備ができたことを`notify_one()`/`notify_all()`によって通知されるまでスレッドを待機するために使用する。

述語を指定しない場合、`notify_one()`/`notify_all()`が呼び出された時点でこの関数のブロッキングが解除される。

述語を指定する場合、述語呼び出しが`true`になるまで待機を続行する。


## 要件
- `lock.`[`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md) `== true`であること
- `lock`が参照しているミューテックスオブジェクトが、この関数を呼び出したスレッドでロック取得されていること
- `*this`の`condition_variable`オブジェクトが他スレッドで待機していないか、もしくは並行に待機している全てのスレッドで`lock`パラメータが同じミューテックスオブジェクトを参照していること


## 効果
- (1) :
    1. アトミックに`lock.`[`unlock()`](/reference/mutex/unique_lock/unlock.md)し、`*this`に対してブロッキングする
    2. [`notify_one()`](notify_one.md)/[`notify_all()`](notify_all.md)もしくはそれ以外の理由で通知があるまでブロッキングされる
    3. この関数を抜ける際に`lock.`[`lock()`](/reference/mutex/unique_lock/lock.md)する
    4. この関数が例外送出によって終了する場合、関数を抜ける前に`lock.`[`lock()`](/reference/mutex/unique_lock/lock.md)する


- (2) : 以下と同等の処理を行う

```cpp
while (!pred()) {
  wait(lock);
}
```


## 事後条件
- `lock.`[`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md) `== true`であること
- `lock`が参照しているミューテックスオブジェクトが、この関数を呼び出したスレッドでロック取得されていること


## 戻り値
なし


## 例外
- (1) :
    - C++11まで : この関数は、`lock.`[`lock()`](/reference/mutex/unique_lock/lock.md)および`lock.`[`unlock()`](/reference/mutex/unique_lock/unlock.md)によって送出されうる、あらゆる例外が送出される可能性がある。
    - C++14 : 投げない
- (2) : 
    - C++11まで : この関数は、`lock.`[`lock()`](/reference/mutex/unique_lock/lock.md)および`lock.`[`unlock()`](/reference/mutex/unique_lock/unlock.md)によって送出されうる、あらゆる例外が送出される可能性がある。
    - C++14 : 時計クラス、[`time_point`](/reference/chrono/time_point.md)クラス、[`duration`](/reference/chrono/duration.md)クラスの構築が例外を送出する場合、この関数はそれらの例外を送出する。


## 備考
- C++14 : 事後条件を満たさない場合、[`std::terminate()`](/reference/exception/terminate.md)関数を呼び出して、プログラムを異常終了させる。これは、ミューテックスの再ロック取得が例外を送出した場合に発生する。


## 例
```cpp example
#include <iostream>
#include <condition_variable>
#include <mutex>
#include <thread>

struct ProcessData {
  std::mutex mtx_;
  std::condition_variable cond_;

  bool data_ready_ = false;

public:
  // 処理に必要なデータの準備をする
  void prepare_data_for_processing()
  {
    // ...準備処理...

    {
      std::lock_guard<std::mutex> lk(mtx_);
      data_ready_ = true;
    }

    // 準備完了したので待機スレッドを全て起床させる
    cond_.notify_all();
  }

  void wait_for_data_to_process1()
  {
    std::unique_lock<std::mutex> lk(mtx_);

    // データの準備ができるまで待機してから処理する
    while (!data_ready_) {
      // 述語を指定しないバージョン
      cond_.wait(lk);
    }
    process_data();
  }

  void wait_for_data_to_process2()
  {
    std::unique_lock<std::mutex> lk(mtx_);

    // データの準備ができるまで待機してから処理する

    // 述語を指定するバージョン
    cond_.wait(lk, [this] { return data_ready_; });
    process_data();
  }

private:
  void process_data()
  {
    // ...データを処理する...
    std::cout << "process data" << std::endl;
  }
};

int main()
{
  ProcessData p;

  std::thread t1([&] { p.prepare_data_for_processing(); });
  std::thread t2([&] { p.wait_for_data_to_process1(); });
  std::thread t3([&] { p.wait_for_data_to_process2(); });

  t1.join();
  t2.join();
  t3.join();
}
```
* wait[color ff0000]
* cond_.notify_all()[link notify_all.md]
* std::unique_lock[link /reference/mutex/unique_lock.md]

### 出力
```
process data
process data
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


## 参照
- [LWG Issue 2093. Throws clause of `condition_variable::wait` with predicate](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2093)
- [LWG Issue 2135. Unclear requirement for exceptions thrown in `condition_variable::wait()`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2135)

