# try_lock_until
* mutex[meta header]
* std[meta namespace]
* recursive_timed_mutex[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class Clock, class Duration>
bool try_lock_until(const chrono::time_point<Clock, Duration>& abs_time);
```
* time_point[link /reference/chrono/time_point.md]

## 概要
タイムアウトする絶対時間を指定して�ックの取得を試みる

## 効果
`abs_time`パラメータで指定された絶対時間に到達するまで、ミューテックスの所有権取得を試みる。

所有権が取得できるまで、もしくは`abs_time`時間に到達するまでこの関数はブ�ッ�ングする。

`abs_timeにすでに到達していた場合`、この関数は[`try_lock()`](try_lock.md)と同じ効果をもち、ブ�ッ�ングせずにミューテックスの所有権取得を試みる。


## 戻り値
所有権が取得できた場合は`true`を返す。

`abs_time`パラメータで指定された相対時間の間に所有権が取得できなかった場合はタイムアウトとなり、`false`を返す。


## 例外
- C++11 : 投げない
- C++14 : 時計クラス、[`time_point`](/reference/chrono/time_point.md)クラス、[`duration`](/reference/chrono/duration.md)クラスの構築が例外を送出する場合、この関数はそれらの例外を送出する。


## 備考
この関数の実装が、ミューテックスの所有権を保持しているスレッドがひとつもない場合でも、所有権の取得に失敗する可能性がある。


## 例
```cpp example
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
    namespace chrono = std::chrono;

    chrono::system_clock::time_point tp = chrono::system_clock::now();

    // �ックの取得を試みる(3秒後にタイムアウト)
    if (!mtx_.try_lock_until(tp + std::chrono::seconds(3))) {
      // �ックの取得に失敗
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
* mtx_.unlock()[link unlock.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* std::error_code[link /reference/system_error/error_code.md]
* std::errc::device_or_resource_busy[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::system_error[link /reference/system_error/system_error.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照
- [LWG Issue 2093. Throws clause of `condition_variable::wait` with predicate](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2093)


