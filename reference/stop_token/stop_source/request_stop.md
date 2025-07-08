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
自身が所有している停止状態に対して停止要求を作成する。

## 効果
停止状態を所有している場合は、[停止要求操作](../stoppable-source.md)を実行する（備考欄を参照）。
そうでなければ、何もせず`false`を返す。

## 戻り値
この関数の呼び出しによって停止要求が作成された場合は`true`を返す。

停止状態を所有していない、あるいは停止要求がすでに作成されていた場合は`false`を返す。

## 例外
投げない。

## 備考
停止要求操作では、停止状態が停止要求を受け取っているかどうかをアトミックに判定し、まだ停止要求を受け取っていない場合は停止要求を作成する。  
この判定処理と停止要求の作成処理は、`read-modify-write`操作と同様にアトミックに行われる。  
停止要求を受け取っていると判定した場合は何もせず`false`を返す。

停止要求が作成されたときは、この停止状態に対して登録されている[`stop_callback`](../stop_callback.md)のコールバックが同期的に呼び出される。このコールバックの呼び出しが例外によって終了した場合は、[`std::terminate()`](/reference/exception/terminate.md)関数が呼び出され、プログラムが異常終了する。

もし停止要求が作成されたときに、割り込み可能な待機関数（[`wait()`](/reference/condition_variable/condition_variable_any/wait.md)／[`wait_for()`](/reference/condition_variable/condition_variable_any/wait_for.md)／[`wait_until()`](/reference/condition_variable/condition_variable_any/wait_until.md)）で待機中の[`condition_variable_any`](/reference/condition_variable/condition_variable_any.md)が存在している場合は、そのような`condition_variable_any`全てに対して起床通知が送られ、待機関数から処理が戻る。


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

    // 二度目以降の停止要求は効果を持たない
    assert(ss1.request_stop() == false);

    // 停止状態を所有していない stop_source に対しては
    // 停止要求を作成できない
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

    // この中で、 ss が所有している停止状態に対して登録されている
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
      // 割り込み可能な待機関数は、停止要求によって起床通知が送られたときに、
      // 述語が返す値に関わらず待機関数から処理を戻す。
      cv.wait(lock, ss.get_token(), wait_forever);
    };

    std::thread t1(cv_wait_test_func);
    std::thread t2(cv_wait_test_func);

    std::this_thread::sleep_for(std::chrono::milliseconds(100));

    // 停止要求を作成すると、ss が所有する停止状態を利用して割り込み可能な待機処理を行っている
    // すべての condition_variable_any に対して、起床通知が送られる。
    ss.request_stop();

    t1.join();
    t2.join();
  }
}
```
* request_stop()[color ff0000]
* stop_source[link ../stop_source.md]
* nostopstate[link ../nostopstate.md]
* stop_callback[link ../stop_callback.md]
* get_token()[link get_token.md]
* condition_variable_any[link /reference/condition_variable/condition_variable_any.md]
* cv.wait[link /reference/condition_variable/condition_variable_any/wait.md]

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


## 参照
- [P0660R10 Stop token and joining thread](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0660r10.pdf)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
