#wait_until (C++11)
* condition_variable[meta header]
* std[meta namespace]

```cpp
template <class Clock, class Duration>
cv_status wait_until(unique_lock<mutex>& lock,
                     const chrono::time_point<Clock, Duration>& abs_time); // (1)

template <class Clock, class Duration, class Predicate>
bool wait_until(unique_lock<mutex>& lock,
                const chrono::time_point<Clock, Duration>& abs_time,
                Predicate pred);                                           // (2)
```
* cv_status[link /reference/condition_variable/cv_status.md]
* unique_lock[link /reference/mutex/unique_lock.md]
* mutex[link /reference/mutex/mutex.md]
* time_point[link /reference/chrono/time_point.md]

##概要
絶対時間でタイムアウトを指定して、起床されるまで待機する。

この関数は、処理をするための準備ができたことを`notify_one()`/`notify_all()`によって通知されるまでスレッドを待機するために使用する。

述語を指定しない場合、`notify_one()`/`notify_all()`が呼び出された時点でこの関数のブロッキングが解除される。

述語を指定する場合、述語呼び出しが`true`になるまで待機を続行する。



##要件
- `lock.`[`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md)` == true`であること
- `lock`が参照しているミューテックスオブジェクトが、この関数を呼び出したスレッドでロック取得されていること
- `*this`の`condition_variable`オブジェクトが他スレッドで待機していないか、もしくは並行に待機している全てのスレッドで`lock`パラメータが同じミューテックスオブジェクトを参照していること


##効果
- (1) :
    1. アトミックに`lock.`[`unlock()`](/reference/mutex/unique_lock/unlock.md)する
    2. [`notify_one()`](./notify_one.md)/[`notify_all()`](./notify_all.md)による通知、`abs_time`によって指定された時間に到達したことによる期限切れ、もしくはなんらかの理由によって失敗するまでブロッキングする
    3. この関数を抜ける際に`lock.`[`lock()`](/reference/mutex/unique_lock/lock.md)する
    4. この関数が例外送出によって終了する場合、関数を抜ける前に`lock.`[`lock()`](/reference/mutex/unique_lock/lock.md)する


- (2) : 以下と同等の処理を行う

```cpp
while (!pred()) {
  if (wait_until(lock, abs_time) == cv_status::timeout) {
    return pred();
  }
}
return true;
```
* cv_status::timeout[link /reference/condition_variable/cv_status.md]


##戻り値
- (1) : `abs_time`で指定された絶対時間内に起床されない場合、タイムアウトとなり[`cv_status::timeout`](/reference/condition_variable/cv_status.md)が返る。そうでない場合は[`cv_status::no_timeout`](/reference/condition_variable/cv_status.md)が返る。 
- (2) : `pred()`の結果が返る


##事後条件
- `lock.`[`owns_lock()`](/reference/mutex/unique_lock/owns_lock.md)` == true`であること
- `lock`が参照しているミューテックスオブジェクトが、この関数を呼び出したスレッドでロック取得されていること


##例外
この関数は、`lock.`[`lock()`](/reference/mutex/unique_lock/lock.md)および`lock.`[`unlock()`](/reference/mutex/unique_lock/unlock.md)によって送出されうる、あらゆる例外が送出される可能性がある。

- C++14 : 上記に加え、時計クラス、[`time_point`](/reference/chrono/time_point.md)クラス、[`duration`](/reference/chrono/duration.md)クラスの構築が例外を送出する場合、この関数はそれらの例外を送出する。

##例
```cpp
#include <iostream>
#include <condition_variable>
#include <mutex>
#include <thread>
#include <chrono>

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

  void wait_until_data_to_process1()
  {
    std::unique_lock<std::mutex> lk(mtx_);

    // データの準備ができるまで待機してから処理する
    while (!data_ready_) {
      // 述語を指定しないバージョン
      // 3秒でタイムアウト
      using namespace std::chrono;
      steady_clock::time_point tp = steady_clock::now() + seconds(3);
      std::cv_status result = cond_.wait_until(lk, tp);
      if (result == std::cv_status::timeout) {
        std::cout << "wait_until_data_to_process1 : timeout" << std::endl;
        return;
      }
    }
    process_data();
  }

  void wait_until_data_to_process2()
  {
    std::unique_lock<std::mutex> lk(mtx_);

    // データの準備ができるまで待機してから処理する

    // 述語を指定するバージョン
    // 3秒でタイムアウト
    using namespace std::chrono;
    steady_clock::time_point tp = steady_clock::now() + seconds(3);
    if (!cond_.wait_until(lk, tp, [this] { return data_ready_; })) {
      // data_ready == false
      std::cout << "data is not ready" << std::endl;
      return;
    }
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
  std::thread t2([&] { p.wait_until_data_to_process1(); });
  std::thread t3([&] { p.wait_until_data_to_process2(); });

  t1.join();
  t2.join();
  t3.join();
}
```
* wait_until[color ff0000]

###出力例
```
process data
process data
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照
- [LWG Issue 2093. Throws clause of `condition_variable::wait` with predicate](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2093)


