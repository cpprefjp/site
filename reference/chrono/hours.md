#hours
* chrono[meta header]
* std::chrono[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  using hours = duration<最低でも23ビットを持つ符号付き整数型, ratio<3600>>;
}}
```
* duration[link /reference/chrono/duration.md]
* ratio[link /reference/ratio.md]

##概要
時単位を表現する[`duration`](duration.md)の別名


##例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  std::chrono::hours h1(30);
  std::chrono::hours h2(20);

  // 30時間 + 20時間 = 50時間
  std::chrono::hours result = h1 + h2;
  std::cout << result.count() << std::endl;

  // 時を分に変換
  // 50時間 = 3000分
  std::chrono::minutes m = result;
  std::cout << m.count() << std::endl;

  // 時を秒に変換
  // 50時間 = 180000秒
  std::chrono::seconds sec = result;
  std::cout << sec.count() << std::endl;
}
```
* std::chrono::minutes[link minutes.md]
* std::chrono::seconds[link seconds.md]
* count()[link duration/count.md]

###出力
```
50
3000
180000
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

