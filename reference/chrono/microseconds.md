#microseconds
* chrono[meta header]
* std::chrono[meta namespace]
* typedef[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  typedef duration<最低でも55ビットを持つ符号付き整数型, micro> microseconds;
}}
```
* duration[link /reference/chrono/duration.md]
* micro[link /reference/ratio/si_prefix.md]

##概要
マイクロ秒単位を表現する`duration`の別名


##例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  std::chrono::microseconds microsec1(30);
  std::chrono::microseconds microsec2(20);

  // マイクロ秒同士の演算
  // 30マイクロ秒 + 20マイクロ秒 = 50マイクロ秒
  std::chrono::microseconds result = microsec1 + microsec2;
  std::cout << result.count() << std::endl;

  // マイクロ秒からナノ秒に変換
  // 50マイクロ秒 = 50000ナノ秒
  std::chrono::nanoseconds ns = result;
  std::cout << ns.count() << std::endl;

  // マイクロ秒からミリ秒に変換
  // 1005マイクロ秒は1.005ミリ秒だが、整数表現のマイクロ秒に変換する際に5マイクロ秒が
  // 切り捨てられるため、1ミリ秒となる。
  // 切り捨てが発生する場合には、duration_cast()関数を使用する。
  std::chrono::microseconds microsec3(1005);
  std::chrono::milliseconds ms = std::chrono::duration_cast<std::chrono::milliseconds>(microsec3);
  std::cout << ms.count() << std::endl;
}
```
* std::chrono::nanoseconds[link nanoseconds.md]
* std::chrono::milliseconds[link milliseconds.md]
* count()[link duration/count.md]
* std::chrono::duration_cast[link duration_cast.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
50
50000
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

