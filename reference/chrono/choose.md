# choose
* chrono[meta header]
* std::chrono[meta namespace]
* enum[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  enum class choose {
    earliest,
    latest
  };
}
```

## 概要
`choose`は、タイムゾーン情報に従ってローカル時間からシステム時間に変換する際にあいまいになる場合、早い時間と遅い時間どちら側の候補に変換するかをユーザーが選択できるようにするための列挙型である。

各列挙値は、以下を意味する：

| 列挙値 | 説明 |
|--------|------|
| `earliest` | 早い時間側に変化する |
| `latest`   | 遅い時間側に変換する |

この列挙型は、サマータイムを採用しているタイムゾーンにおいて、重複するローカル時間があるため対応するシステム時間が一意に決まらない場合に、複数候補のどれに変換するかを決めるためのものである。


## 例
```cpp example
#include <chrono>
#include <iostream>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // ニューヨーク (EDTタイムゾーン) のローカル時間を、システム時間 (UTCタイムゾーン) に変換する。
  // ローカル時間2016-11-06 01:30:00 EDTに対応するシステム時間は、以下の2つがあり、一意に決まらない：
  //   2016-11-06 05:30:00 UTC
  //   2016-11-06 06:30:00 UTC
  // ここではlatestを指定することで、遅い時間 (06:30:00) を選択する
  chrono::local_time local_now = chrono::local_days{2016y/11/6} + 1h + 30min;

  chrono::zoned_time zt{"America/New_York", local_now, chrono::choose::latest};
  chrono::sys_time st = zt.get_sys_time();

  std::cout << st << std::endl;
}
```
* chrono::choose::latest[color ff0000]
* chrono::local_days[link local_time.md]
* chrono::local_time[link local_time.md]
* 2016y[link year/op_y.md]
* 1h[link duration/op_h.md]
* 30min[link duration/op_min.md]
* chrono::zoned_time[link zoned_time.md]
* zt.get_sys_time()[link zoned_time/get_sys_time.md]
* chrono::sys_time[link sys_time.md]

### 出力
```
2016-11-06 06:30:00 UTC
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [`local_info`](local_info.md)
- [`time_zone::to_sys()`](time_zone/to_sys.md)
