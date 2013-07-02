#system_clock(C++11)
```cpp
namespace std {
namespace chrono {
  class system_clock;
}}
```

###概要
`system_clock`は、システム時間を表現するためのクロックである。
`time_t`との互換性がある。


###メンバ関数
| | |
|----------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
| [`now`](./system_clock/now.md) | 現在日時の取得 |
| [`to_time_t`](./system_clock/to_time_t.md) | `time_t`への変換 |
| [`from_time_t`](./system_clock/from_time_t.md) | `time_t`からの変換 |


###メンバ型
| | |
|--------------------------------------------------------|-----------------------------------------------|
| `rep` | 内部表現となる算術型 |
| period | 時間の間隔を表す`ratio`型 |
| duration | 経過時間の型 |
| `time_point` | 時間の一点を指す型 |


###メンバ定数
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
  system_clock::time_point p = system_clock::now();

  // time_tに変換して出力
  std::time_t t = system_clock::to_time_t(p);
  std::cout << std::ctime(&t) << std::endl;
}
```

###出力例
```
Tue Oct 16 15:00:08 2012
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1


