# wait_for
* future[meta header]
* std[meta namespace]
* future[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class Rep, class Period>
future_status wait_for(const chrono::duration<Rep, Period>& rel_time) const;
```
* future_status[link ../future_status.md]
* duration[link /reference/chrono/duration.md]

## 概要
相対時間でタイムアウトを指定して、処理が完了するまで待機する


## 効果
共有状態が遅延状態([`future_status::deferred`](../future_status.md))の場合、この関数は何もしない。そうでない場合、`rel_time`で指定された相対時間の期限まで、共有状態が準備状態([`future_status::ready`](../future_status.md))になるのを待機する。


## 戻り値
- [`future_status::deferred`](../future_status.md) ： 共有状態が遅延関数を持っている
- [`future_status::ready`](../future_status.md) ： 共有状態が準備完了になった
- [`future_status::timeout`](../future_status.md) ： `rel_time`で指定された相対時間内に準備完了にならず、タイムアウトになった


## 例外
- C++14 : 時計クラス、[`time_point`](/reference/chrono/time_point.md)クラス、[`duration`](/reference/chrono/duration.md)クラスの構築が例外を送出する場合、この関数はそれらの例外を送出する。


## 例
```cpp example
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
  std::future<int> f = p.get_future();

  std::thread t(calc, std::move(p));

  // 結果が書き込まれるまで待機する
  // 3秒でタイムアウト
  std::future_status result = f.wait_for(std::chrono::seconds(3));
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
* wait_for[color ff0000]
* std::promise[link /reference/future/promise.md]
* p.set_value[link /reference/future/promise/set_value.md]
* p.get_future()[link /reference/future/promise/get_future.md]
* std::move[link /reference/utility/move.md]
* std::future_status[link /reference/future/future_status.md]
* std::chrono::seconds[link /reference/chrono/seconds.md]
* f.get()[link /reference/future/shared_future/get.md]

### 出力例
```
3
```

## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012
	- 2012段階の`std::thread`クラスは、コンストラクタに引数をムーブで渡すことができない。そのため、`promise`オブジェクトはスレッド間の共有オブジェクトにする必要がある。(所有権が曖昧になるため、スタイルとしてはよくない)
		[#737812 - std::thread does not accept std::move](https://connect.microsoft.com/VisualStudio/feedback/details/737812)


## 参照
- [LWG Issue 2185. Missing throws clause for `future`/`shared_future::wait_for`/`wait_until`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2185)

