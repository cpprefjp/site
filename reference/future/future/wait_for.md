#wait_for(C++11)
```cpp
template <class Rep, class Period>
future_status wait_for(const chrono::duration<Rep, Period>& rel_time) const;
```
* future_status[link ../future_status.md]
* duration[link /reference/chrono/duration.md]

##概要
相対時間でタイムアウトを指定して、処理が完了するまで待機する


##効果
共有状態が遅延状態([`future_status::deferred`](../future_status.md))の場合、この関数は何もしない。そうでない場合、`rel_time`で指定された相対時間の期限まで、共有状態が準備状態([`future_status::ready`](../future_status.md))になるのを待機する。


##戻り値
- [`future_status::deferred`](../future_status.md) ： 共有状態が遅延関数を持っている
- [`future_status::ready`](../future_status.md) ： 共有状態が準備完了になった
- [`future_status::timeout`](../future_status.md) ： `rel_time`で指定された相対時間内に準備完了にならず、タイムアウトになった


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
  std::future<int> f = p.get_future();

  std::thread t(calc, std::move(p));

  // 結果が書き込まれるまで待機する
  // 3秒でタイムアウト
  std::future_status result = f.wait_for(std::chrono::seconds(3));
  if (result == std::future_status::ready) {
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

###出力例
```
3
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


