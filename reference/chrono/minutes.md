#minutes
* chrono[meta header]
* std::chrono[meta namespace]
* typedef[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  using minutes = duration<最低でも29ビットを持つ符号付き整数型, ratio<60>>;
}}
```
* duration[link /reference/chrono/duration.md]
* ratio[link /reference/ratio.md]

##概要
分単位を表現する[`duration`](duration.md)の別名

##例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  std::chrono::minutes m1(30);
  std::chrono::minutes m2(20);

  // 20分 + 30分 = 50分
  std::chrono::minutes sum_minutes = m1 + m2;
  std::cout << sum_minutes.count() << std::endl;

  // 秒に変換
  // 50分 * 60秒 = 3000秒
  std::chrono::seconds sec = sum_minutes;
  std::cout << sec.count() << std::endl;

  // 時に変換
  // 65分は1時間5分だが、整数表現の時に変換する際に5分が切り捨てられるため、
  // 1時間となる。
  // 切り捨てが発生する場合には、duration_cast()関数を使用する。
  std::chrono::minutes m3(65);
  std::chrono::hours h = std::chrono::duration_cast<std::chrono::hours>(m3);
  std::cout << h.count() << std::endl;
}
```
* std::chrono::seconds[link seconds.md]
* std::chrono::hours[link hours.md]
* count()[link duration/count.md]
* std::chrono::duration_cast[link duration_cast.md]

###出力
```
50
3000
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

