#wait_until (C++11)
* future[meta header]

```cpp
template <class Clock, class Duration>
future_status wait_until(const chrono::time_point<Clock, Duration>& abs_time) const;
```
* future_status[link /reference/future/future_status.md]
* time_point[link /reference/chrono/time_point.md]

##概要
絶対時間でタイムアウトを指定して、処理が完了するまで待機する


##効果
共有状態が遅延状態([`future_status::deferred`](../future_status.md))の場合、この関数は何もしない。そうでない場合、`abs_time`で指定された絶対時間の期限まで、共有状態が準備状態([`future_status::ready`](../future_status.md))になるのを待機する。


##戻り値
- [`future_status::deferred`](../future_status.md) ： 共有状態が遅延関数を持っている
- [`future_status::ready`](../future_status.md) ： 共有状態が準備完了になった
- [`future_status::timeout`](../future_status.md) ： `abs_time`で指定された絶対時間内に準備完了にならず、タイムアウトになった


##例外
- C++14 : 時計クラス、[`time_point`](/reference/chrono/time_point.md)クラス、[`duration`](/reference/chrono/duration.md)クラスの構築が例外を送出する場合、この関数はそれらの例外を送出する。


##例
```cpp
#include <iostream>
#include <future>
#include <thread>
#include <utility>

void calc(std::promise<int> p)
{
  p.set_value(3); // 結果を書き込む
}

int main()
{
  std::promise<int> p;
  std::shared_future<int> f = p.get_future().share();

  std::thread t(calc, std::move(p));

  // 結果が書き込まれるまで待機する
  // 3秒でタイムアウト
  namespace chrono = std::chrono;
  chrono::steady_clock::time_point tp = chrono::steady_clock::now();

  std::future_status result = f.wait_until(tp + chrono::seconds(3));
  if (result != std::future_status::timeout) {
    // 結果を取り出す(準備完了しているため、すぐに値を取り出せる)
    std::cout << f.get() << std::endl;
  }
  else {
    std::cout << "timeout" << std::endl;
  }

  t.join();
}
```
* wait_until[color ff0000]

###出力
```
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照
- [LWG Issue 2185. Missing throws clause for `future`/`shared_future::wait_for`/`wait_until`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2185)


