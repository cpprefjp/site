#try_lock_until
```cpp
template <class Clock, class Duration>
bool try_lock_until(const chrono::time_point<Clock, Duration>& abs_time);
```
* time_point[link /reference/chrono/time_point.md]

##概要

<b>タイムアウトする絶対時間を指定してロックの取得を試みる</b>



##要件

この関数を呼び出したスレッドが、ミューテックスの所有権を保持していないこと。



##効果

`abs_time`パラメータで指定された絶対時間に到達するまで、ミューテックスの所有権取得を試みる。

所有権が取得できるまで、もしくは`abs_time`時間に到達するまでこの関数はブロッキングする。

`abs_timeにすでに到達していた場合`、この関数は[`try_lock()`](/reference/mutex/timed_mutex/try_lock.md)と同じ効果をもち、ブロッキングせずにミューテックスの所有権取得を試みる。


##戻り値

所有権が取得できた場合は`true`を返す。
`abs_time`パラメータで指定された相対時間の間に所有権が取得できなかった場合はタイムアウトとなり、`false`を返す。



##例外

投げない


##備考

この関数の実装が、ミューテックスの所有権を保持しているスレッドがひとつもない場合でも、所有権の取得に失敗する可能性がある。



##例

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <chrono>
#include <vector>
#include <system_error>

class X {
  std::timed_mutex mtx_;
  int value_ = 0;
public:
  // メンバ変数value_への書き込みを排他的にする
  void add_value(int value)
  {
    namespace chrono = std::chrono;

    chrono::system_clock::time_point tp = chrono::system_clock::now();

    // ロックの取得を試みる(3秒後にタイムアウト)
    if (!mtx_.try_lock_until(tp + std::chrono::seconds(3))) {
      // ロックの取得に失敗
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }
    value_ = value;
    mtx_.unlock();
  }
};

int main()
{
  X x;

  std::thread t1([&x]{ x.add_value(1); });
  std::thread t2([&x]{ x.add_value(2); });

  t1.join();
  t2.join();
}
```
* try_lock_until[color ff0000]

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


