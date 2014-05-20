#wait_until (C++11)
```cpp
template <class Lock, class Clock, class Duration>
cv_status wait_until(Lock& lock, const chrono::time_point<Clock, Duration>& abs_time);

template <class Lock, class Clock, class Duration, class Predicate>
bool wait_until(Lock& lock, const chrono::time_point<Clock, Duration>& abs_time, Predicate pred);
```
* cv_status[link /reference/condition_variable/cv_status.md]
* time_point[link /reference/chrono/time_point.md]

##概要
絶対時間でタイムアウトを指定して、起床されるまで待機する。

この関数は、処理をするための準備ができたことを`notify_one()`/`notify_all()`によって通知されるまでスレッドを待機するために使用する。
述語を指定しない場合、`notify_one()`/`notify_all()`が呼び出された時点でこの関数のブロッキングが解除される。
述語を指定する場合、述語呼び出しが`true`になるまで待機を続行する。


##効果
述語を指定しないバージョン：
- アトミックに`lock.[unlock()](/reference/mutex/unique_lock/unlock.md)`する
- [`notify_one()`](./notify_one.md)/[`notify_all()`](./notify_all.md)による通知、`abs_time`によって指定された時間に到達したことによる期限切れ、もしくはなんらかの理由によって失敗するまでブロッキングする
- この関数を抜ける際に`lock.`[`lock()`](/reference/mutex/unique_lock/lock.md)する
- この関数が例外送出によって終了する場合、関数を抜ける前に`lock.`[`lock()`](/reference/mutex/unique_lock/lock.md)する
- 戻り値：`abs_time`で指定された絶対時間内に起床されない場合、タイムアウトとなり[`cv_status::timeout`](/reference/condition_variable/cv_status.md)が返る。そうでない場合は[`cv_status::no_timeout`](/reference/condition_variable/cv_status.md)が返る。 


述語を指定するバージョン：
`while (!pred()) {`
`  if (wait_until(lock, abs_time) == `[`cv_status::timeout`](/reference/condition_variable/cv_status.md)`) {`
`    return pred();`
`  }`
`}`
`return true;`
戻り値：`pred()`の結果が返る


##事後条件
`lock`が参照しているミューテックスオブジェクトが、この関数を呼び出したスレッドでロック取得されていること


##例外
この関数は、`lock.`[`lock()`](/reference/mutex/unique_lock/lock.md)および`lock.`[`unlock()`](/reference/mutex/unique_lock/unlock.md)によって送出されうる、あらゆる例外が送出される可能性がある。


##例
```cpp
#include <iostream>
#include <condition_variable>
#include <mutex>
#include <thread>
#include <chrono>

struct ProcessData {
  std::recursive_mutex mtx_;
  std::condition_variable_any cond_;

  bool data_ready_ = false;

public:
  // 処理に必要なデータの準備をする
  void prepare_data_for_processing()
  {
    // ...準備処理...

    {
      std::lock_guard<std::recursive_mutex> lk(mtx_);
      data_ready_ = true;
    }

    // 準備完了したので待機スレッドを全て起床させる
    cond_.notify_all();
  }

  void wait_until_data_to_process1()
  {
    std::unique_lock<std::recursive_mutex> lk(mtx_);

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
    std::unique_lock<std::recursive_mutex> lk(mtx_);

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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


