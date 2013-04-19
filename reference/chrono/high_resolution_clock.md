#high_resolution_clock
```cpp
namespace std {
namespace chrono {
  class high_resolution_clock;
}}
```

###概要
`high_resolution_clock`は、そのプラットフォームでの最も短い間隔のクロックである。

このクラスは、[`system_clock`](/reference/chrono/system_clock.md)か[`steady_clock`](/reference/chrono/steady_clock.md)の別名として定義される場合がある。


###メンバ関数

| | |
|---------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| [now](./high_resolution_clock/now.md) | 現在日時の取得 |


<b>メンバ型</b>


| | |
|--------------------------------------------------------|-----------------------------------------------|
| `rep` | 内部表現となる算術型 |
| period | 時間の間隔を表す`ratio`型 |
| duration | 経過時間の型 |
| `time_point` | 時間の一点を指す型 |



<b>メンバ定数</b>


| | |
|--------------------------------------|----------------------------------------------------------------------|
| `is_steady = unspecified` | 逆行しないクロックかどうかを表す`bool`値 |



###例

```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  // 現在日時を取得
  high_resolution_clock::time_point p = high_resolution_clock::now();

  // エポックからの経過時間を取得
  auto d = p.time_since_epoch();
  std::time_t time = duration_cast<seconds>(d).count();
  std::tm* st = std::localtime(&time);

  // 現在日時を出力(小数点以下の秒まで)
  std::cout
        << st->tm_year + 1900 << "/"
        << st->tm_mon + 1 << "/"
        << st->tm_mday << " "
        << st->tm_hour << ":"
        << st->tm_min << ":"
        << st->tm_sec << "."
        << d.count() % decltype(d)::period::den
  << std::endl;
}
```

###出力例
```cpp
2012/10/16 15:51:29.380248
```

##



##

##バージョン

###言語

- C++11

###処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1

