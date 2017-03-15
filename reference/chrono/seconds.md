# seconds
* chrono[meta header]
* std::chrono[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  using seconds = duration<最低でも35ビットを持つ符号付き整数型>;
}}
```
* duration[link /reference/chrono/duration.md]

## 概要
秒単位を表現する[`duration`](duration.md)の別名


## 例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  std::chrono::seconds s1(30);
  std::chrono::seconds s2(20);

  // 秒同士の演算
  // 30秒 + 20秒 = 50秒
  std::chrono::seconds result = s1 + s2;
  std::cout << result.count() << std::endl;

  // 秒からミリ秒に変換
  // 50秒 = 50000ミリ秒
  std::chrono::milliseconds ms = result;
  std::cout << ms.count() << std::endl;

  // 秒から分に変換
  // 65秒は1分5秒だが、整数表現の分に変換する際に5秒が切り捨てられるため、
  // 1分となる。
  // 切り捨てが発生する場合には、duration_cast()関数を使用する。
  std::chrono::seconds s3(65);
  std::chrono::minutes m = std::chrono::duration_cast<std::chrono::minutes>(s3);
  std::cout << m.count() << std::endl;
}
```
* std::chrono::milliseconds[link milliseconds.md]
* std::chrono::minutes[link minutes.md]
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
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0


## 関連項目
- [`sleep_for`](/reference/thread/this_thread/sleep_for.md)
- [`sleep_until`](/reference/thread/this_thread/sleep_until.md)

