#sleep_until
```cpp
namespace std {
namespace this_thread {
  template <class Clock, class Duration>
  void sleep_until(const chrono::time_point<Clock, Duration>& abs_time);
}}
```
* time_point[link /reference/chrono/time_point.md]


##概要
指定した絶対時刻を過ぎるまで現スレッドをブロックする。


##効果
引数 `abs_time`で指定した絶対時間を経過するまで現在のスレッド、すなわちこの関数を呼び出したスレッド自身をブロックする。指定した絶対時間<i>以上</i>の時刻になると、現スレッドのブロックが解除されて後続処理の実行が開始される。なお、タイマーの精度は処理系依存。


##同期
特に他操作と同期しない。


##例外
`Clock`がTrivialClock要件を満たしかつ`Duration`上の操作が例外送出しない限りは、この関数は例外送出しない。


##例
```cpp
#include <thread>

int main()
{
  auto abs_time = std::chrono::system_clock::now() + std::chrono::seconds(15);
  //...
  std::this_thread::sleep_until(abs_time);

  return 0;
}
```
* std::chrono::system_clock::now[link /reference/chrono/system_clock/now.md]

###出力
```
```

##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation#clang.md):
- [GCC](/implementation#gcc.md):
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.3, 4.7.0
- [ICC](/implementation#icc.md):
- [Visual C++](/implementation#visual_cpp.md):


##参照
