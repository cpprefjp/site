#nanoseconds
* chrono[meta header]
* std::chrono[meta namespace]
* typedef[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {

namespace chrono {
  typedef duration<最低でも64ビットを持つ符号付き整数型, nano> nanoseconds;
}}
```
* duration[link /reference/chrono/duration.md]
* nano[link /reference/ratio/si_prefix.md]

##概要
ナノ秒単位を表現する[`duration`](duration.md)の別名


##例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  std::chrono::nanoseconds ns1(30);
  std::chrono::nanoseconds ns2(20);

  // ナノ秒同士の演算
  // 30ナノ秒 + 20ナノ秒 = 50ナノ秒
  std::chrono::nanoseconds result = ns1 + ns2;
  std::cout << result.count() << std::endl;

  // ナノ秒からマイクロ秒に変換
  // 1005ナノ秒は1.005マイクロ秒だが、整数表現のマイクロに変換する際に5ナノ秒が
  // 切り捨てられるため、1マイクロ秒となる。
  // 切り捨てが発生する場合には、duration_cast()関数を使用する。
  std::chrono::nanoseconds ns3(1005);
  std::chrono::microseconds microsec = std::chrono::duration_cast<std::chrono::microseconds>(ns3);
  std::cout << microsec.count() << std::endl;

  // ナノ秒から秒に変換
  std::chrono::nanoseconds ns4(1000000005);
  std::chrono::seconds sec = std::chrono::duration_cast<std::chrono::seconds>(ns4);
  std::cout << sec.count() << std::endl;
}
```
* std::chrono::microseconds[link microseconds.md]
* std::chrono::seconds[link seconds.md]
* count()[link duration/count.md]
* std::chrono::duration_cast[link duration_cast.md]

###出力
```
50
1
1
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0


##関連項目
- [`sleep_for`](/reference/thread/this_thread/sleep_for.md)
- [`sleep_until`](/reference/thread/this_thread/sleep_until.md)

