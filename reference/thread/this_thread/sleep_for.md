# sleep_for
* thread[meta header]
* std::this_thread[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace this_thread {
  template <class Rep, class Period>
  void sleep_for(const chrono::duration<Rep, Period>& rel_time);
}}
```


## 概要
指定した相対時間だけ現スレッドをブ�ックする。


## 効果
引数 `rel_time`で指定した相対時間だけ現在のスレッド、すなわちこの関数を呼び出したスレッド自身をブ�ックする。

指定した相対時間 **以上** の時間が経過すると、現スレッドのブ�ックが解除されて後続処理の実行が開始される。なお、タイマーの精度は処理系依�。


## 同期
特に他操作と同期しない。


## 例外
- C++11 : [`chrono::duration<Rep, Period>`](/reference/chrono/duration.md)オブジェクトから例外送出しない限りは、この関数は例外送出しない。
- C++14 : 時計クラス、[`time_point`](/reference/chrono/time_point.md)クラス、[`duration`](/reference/chrono/duration.md)クラスの構築が例外を送出する場合、この関数はそれらの例外を送出する。


## 例
```cpp example
#include <thread>
#include <chrono>

int main()
{
  // 3分間 現スレッドをブ�ック(Sleep)
  std::this_thread::sleep_for(std::chrono::minutes(3));

  return 0;
}
```
* std::this_thread::sleep_for[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 4.6.3, 4.7.0
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照
- [N2661 A Foundation to Sleep On](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2661.htm)
- [LWG Issue 2093. Throws clause of `condition_variable::wait` with predicate](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2093)
