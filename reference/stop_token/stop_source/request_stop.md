# request_stop
* stop_token[meta header]
* std[meta namespace]
* stop_source[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool request_stop() noexcept;
```

## 概要
自身が所有している停�状態に対して停�要求を作成する。

## 効果
自身が停�状態を所有していない場合は何もせず`false`を返す。

それ以外の場合は、自身の所有している停�状態が停�要求を受け取っているかどうかをアトミックに判定し、まだ停�要求を受け取っていない場合は停�要求を作成する。  
この判定処理と停�要求の作成処理は、`read-modify-write`操作によってアトミックに行われる。  
停�要求を受け取っていると判定した場合は何もせず`false`を返す。

停�要求が作成されたときは、この停�状態に対して登録されている[`stop_callback`](../stop_callback.md)のコールバックが同期的に呼び出される。このコールバックの呼び出しが例外によって終了した場合は、[`std::terminate()`](/reference/exception/terminate.md)関数が呼び出され、プ�グラムが異常終了する。

もし停�要求が作成されたときに、割り込み可能な待機関数（[`wait()`](/reference/condition_variable/condition_variable_any/wait.md)／[`wait_for()`](/reference/condition_variable/condition_variable_any/wait_for.md)／[`wait_until()`](/reference/condition_variable/condition_variable_any/wait_until.md)）で待機�の[`condition_variable_any`](/reference/condition_variable/condition_variable_any.md)が�在している場合は、そのような`condition_variable_any`全てに対して起床通知が送られ、待機関数から処理が戻る。

## 戻り値
この関数の呼び出しによって停�要求が作成された場合は`true`を返す。

停�状態を所有していない、あるいは停�要求がすでに作成されていた場合は`false`を返す。

## 例外
投げない。

## 例
```cpp example
#include <cassert>
#include <stop_token>
#include <condition_variable>
#include <mutex>
#include <thread>

int main()
{
  {
    std::stop_source ss1;
    std::stop_source ss2(std::nostopstate);

    assert(ss1.request_stop() == true);

    // 二度目以降の停�要求は効果を持たない
    assert(ss1.request_stop() == false);

    // 停�状態を所有していない stop_source に対しては
    // 停�要求を作成できない
    assert(ss2.request_stop() == false);
  }

  {
    std::stop_source ss;

    // コールバックを登録
    bool b1 = false;
    std::stop_callback cb1 { ss.get_token(), [&] { b1 = true; } };

    // コールバックを登録
    bool b2 = false;
    std::stop_callback cb2 { ss.get_token(), [&] { b2 = true; } };

    assert(b1 == false && b2 == false);

    // この�で、 ss が所有している停�状態に対して登録されている
    // すべてのコールバックが呼び出される
    ss.request_stop();

    assert(b1 == true && b2 == true);
  }

  {
    std::stop_source ss;
    std::mutex mtx;

    auto cv_wait_test_func = [&] {
      // 待機を終了するための条件を表す述語。
      // この述語は常に false を返すため、永久に待機し続けることを意味する。
      auto wait_forever = [] { return false; };

      std::condition_variable_any cv;
      std::unique_lock lock { mtx };

      // 割り込み可能な待機処理を行う。
      // 割り込み可能な待機関数は、停�要求によって起床通知が送られたときに、
      // 述語が返す値に関わらず待機関数から処理を戻す。
      cv.wait(lock, ss.get_token(), wait_forever);
    };

    std::thread th1(cv_wait_test_func);
    std::thread th2(cv_wait_test_func);

    std::this_thread::sleep_for(std::chrono::milliseconds(100));

    // 停�要求を作成すると、ss が所有する停�状態を利用して割り込み可能な待機処理を行っている
    // すべての condition_variable_any に対して、起床通知が送られる。
    ss.request_stop();

    th1.join();
    th2.join();
  }
}
```
* stop_source[link ../stop_source.md]
* nostopstate[link ../nostopstate.md]
* stop_callback[link ../stop_callback.md]
* get_token()[link get_token.md]
* request_stop()[link request_stop.md]
* stop_requested()[link stop_requested.md]
* condition_variable_any[link /reference/condition_variable/condition_variable_any.md]
* wait()[link /reference/condition_variable/condition_variable_any/wait.md]
* thread[link /reference/thread/thread.md]
* milliseconds()[link /reference/chrono/duration/milliseconds.md]
* join()[link /reference/thread/thread/join.md]
* std::this_thread::sleep_for[link /reference/thread/this_thread/sleep_for.md]
* mutex[link /reference/mutex/mutex.md]
* unique_lock[link /reference/mutex/unique_lock.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

