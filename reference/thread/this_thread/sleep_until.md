# sleep_until
* thread[meta header]
* std::this_thread[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace this_thread {
  template <class Clock, class Duration>
  void sleep_until(const chrono::time_point<Clock, Duration>& abs_time);
}}
```
* time_point[link /reference/chrono/time_point.md]


## 概要
指定した絶対時刻を過ぎるまで現スレッドをブロックする。


## テンプレートパラメータ制約
- [`chrono::is_clock_v`](/reference/chrono/is_clock.md)`<Clock>`が`true`であること (C++20)


## 効果
引数 `abs_time`で指定した絶対時間を経過するまで現在のスレッド、すなわちこの関数を呼び出したスレッド自身をブロックする。指定した絶対時間 **以上** の時刻になると、現スレッドのブロックが解除されて後続処理の実行が開始される。なお、タイマーの精度は処理系依存。


## 同期操作
特に他操作と同期する規定はない。


## 例外
- C++11 : `Clock`がTrivialClock要件を満たしかつ`Duration`上の操作が例外送出しない限りは、この関数は例外送出しない。
- C++14 : 時計クラス、[`time_point`](/reference/chrono/time_point.md)クラス、[`duration`](/reference/chrono/duration.md)クラスの構築が例外を送出する場合、この関数はそれらの例外を送出する。


## 例
```cpp example
#include <thread>
#include <chrono>

int main()
{
  auto abs_time = std::chrono::system_clock::now() + std::chrono::seconds(15);
  //...
  std::this_thread::sleep_until(abs_time);

  return 0;
}
```
* std::this_thread::sleep_until[color ff0000]
* std::chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]

### 出力
```
```

## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 4.6.3 [mark verified], 4.7.0 [mark verified]
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [N2661 A Foundation to Sleep On](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2661.htm)
- [LWG Issue 2093. Throws clause of `condition_variable::wait` with predicate](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2093)
