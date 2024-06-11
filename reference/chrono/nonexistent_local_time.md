# nonexistent_local_time
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class nonexistent_local_time : public runtime_error;
}
```
* runtime_error[link /reference/stdexcept.md]

## 概要
`nonexistent_local_time`は、ローカル時間からシステム時間 (UTCタイムゾーン) への変換において、[`choose`](choose.md)型の丸め方法を指定することなく、存在しないローカル時間を指定した場合に発生する例外の型である。

存在しないローカル時間は、サマータイムを採用しているタイムゾーンにおいて起こり得る。例として、タイムゾーン`"America/New_York"`のローカル時刻 2016-03-13 02:30:00 は以下の隙間に位置するため存在しえない：

- 2016-03-13 02:00:00 EST
- 2016-03-13 03:00:00 EDT
- 2016-03-13 07:00:00 UTC


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `template<class Duration>`<br/> `nonexistent_local_time(const local_time<Duration>& tp, const local_info& i);` | デフォルトコンストラクタ | C++20 |
| `virtual const char* what() const noexcept;` | エラー理由となる文字列 | C++20 |

`what()`メンバ関数は、以下と等価な文字列を返す：

```cpp
ostringstream os;
os << tp << " is in a gap between\n"
   << local_seconds{i.first.end.time_since_epoch()} + i.first.offset << ' '
   << i.first.abbrev << " and\n"
   << local_seconds{i.second.begin.time_since_epoch()} + i.second.offset << ' '
   << i.second.abbrev
   << " which are both equivalent to\n"
   << i.first.end << " UTC";

return os.str().c_str();
```
* local_seconds[link local_time.md]
* time_since_epoch()[link time_point/time_since_epoch.md]


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::local_time lt = chrono::local_days{2016y/3/13} + 2h + 30min;

  try {
    // America/New_Yorkタイムゾーンのローカル時間を、
    // UTCタイムゾーンのシステム時間に変換して保持
    chrono::zoned_time zt{"America/New_York", lt};
  }
  catch (const chrono::nonexistent_local_time& e) {
    std::cout << e.what() << std::endl;
  }
}
```
* chrono::nonexistent_local_time[color ff0000]
* chrono::local_time[link local_time.md]
* chrono::local_days[link local_time.md]
* 2016y[link year/op_y.md]
* 2h[link duration/op_h.md]
* 30min[link duration/op_min.md]
* chrono::zoned_time[link zoned_time.md]

### 出力
```
2016-03-13 02:30:00 is in a gap between
2016-03-13 02:00:00 EST and
2016-03-13 03:00:00 EDT which are both equivalent to
2016-03-13 07:00:00 UTC
```

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
