#try_lock_for
```cpp
template <class Rep, class Period>
bool try_lock_for(const chrono::duration<Rep, Period>& rel_time);
```
* duration[link /reference/chrono/duration.md]

##概要

<b>タイムアウトする相対時間を指定してロックの取得を試みる</b>



##要件

`Period`がその環境ネイティブのperiod値に正しく変換できない場合、[`duration`](/reference/chrono/duration.md)はネイティブのperiod値に切り上げなければならない。



##効果

`rel_time`パラメータで指定された相対時間の間、ミューテックスの所有権取得を試みる。
所有権が取得できるまで、もしくは`rel_time`時間が経過するまでこの関数はブロッキングする。

`rel_time`が`rel_time.[zero()](/reference/chrono/duration/zero.md)`より小さい場合、この関数は[`try_lock()`](/reference/mutex/timed_mutex/try_lock.md)と同じ効果をもち、ブロッキングせずにミューテックスの所有権取得を試みる。



##戻り値

所有権が取得できた場合は`true`を返す。
`rel_time`パラメータで指定された相対時間の間に所有権が取得できなかった場合はタイムアウトとなり、`false`を返す。



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
  std::recursive_timed_mutex mtx_;
  int value_ = 0;
public:
  // メンバ変数value_への書き込みを排他的にする
  void add_value(int value)
  {
    // ロックの取得を試みる(3秒でタイムアウト)
    if (!mtx_.try_lock_for(std::chrono::seconds(3))) {
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
* try_lock_for[color ff0000]

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


