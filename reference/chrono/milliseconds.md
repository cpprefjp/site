# milliseconds
* chrono[meta header]
* std::chrono[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  using milliseconds = duration<最低でも45ビットを持つ符号付き整数型, milli>;
}}
```
* duration[link /reference/chrono/duration.md]
* milli[link /reference/ratio/si_prefix.md]

## 概要
ミリ秒単位を表現する[`duration`](duration.md)の別名


## 例
```cpp example
#include <iostream>
#include <chrono>

int main()
{
  std::chrono::milliseconds ms1(30);
  std::chrono::milliseconds ms2(20);

  // ミリ秒同士の演算
  // 30ミリ秒 + 20ミリ秒 = 50ミリ秒
  std::chrono::milliseconds result = ms1 + ms2;
  std::cout << result.count() << std::endl;

  // ミリ秒をマイクロ秒に変換
  // 50ミリ秒 = 50000マイクロ秒
  std::chrono::microseconds microsec = result;
  std::cout << microsec.count() << std::endl;

  // ミリ秒を秒に変換
  // 1005ミリ秒は1.005秒だが、整数表現のミリ秒に変換する際に5ミリ秒が
  // 切り捨てられるため、1秒となる。
  // 切り捨てが発生する場合には、duration_cast()関数を使用する。
  std::chrono::milliseconds ms3(1005);
  std::chrono::seconds s = std::chrono::duration_cast<std::chrono::seconds>(ms3);
  std::cout << s.count() << std::endl;
}
```
* std::chrono::microseconds[link microseconds.md]
* std::chrono::seconds[link seconds.md]
* count()[link duration/count.md]
* std::chrono::duration_cast[link duration_cast.md]

### 出力
```
50
50000
1
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 関連項目
- [`sleep_for`](/reference/thread/this_thread/sleep_for.md)
- [`sleep_until`](/reference/thread/this_thread/sleep_until.md)

