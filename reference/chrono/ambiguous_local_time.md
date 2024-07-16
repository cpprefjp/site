# ambiguous_local_time
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class ambiguous_local_time : public runtime_error;
}
```
* runtime_error[link /reference/stdexcept.md]

## 概要
`ambiguous_local_time`は、ローカル時間からシステム時間 (UTCタイムゾーン) への変換において、[`choose`](choose.md)型の丸め方法を指定することなく、あいまいなローカル時間を指定した場合に発生する例外の型である。

あいまいなローカル時間は、サマータイムを採用しているタイムゾーンにおいて起こり得る。例として、タイムゾーン`"America/New_York"`のローカル時刻 2016-11-06 01:30:00 は、以下のいずれかとなり、一意に決まらない：

- 2016-11-06 05:30:00 UTC
- 2016-11-06 06:30:00 UTC


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `template<class Duration>`<br/> `ambiguous_local_time(const local_time<Duration>& tp, const local_info& i);` | デフォルトコンストラクタ | C++20 |
| `virtual const char* what() const noexcept;` | エラー理由となる文字列 | C++20 |

`what()`メンバ関数は、以下と等価な文字列を返す：

```cpp
ostringstream os;
os << tp << " is ambiguous. It could be\n"
   << tp << ' ' << i.first.abbrev << " == "
   << tp - i.first.offset << " UTC or\n"
   << tp << ' ' << i.second.abbrev << " == "
   << tp - i.second.offset << " UTC";

return os.str().c_str();
```


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::local_time lt = chrono::local_days{2016y/11/6} + 1h + 30min;

  try {
    // America/New_Yorkタイムゾーンのローカル時間を、
    // UTCタイムゾーンのシステム時間に変換して保持
    chrono::zoned_time zt{"America/New_York", lt};
  }
  catch (const chrono::ambiguous_local_time& e) {
    std::cout << e.what() << std::endl;
  }
}
```
* chrono::ambiguous_local_time[color ff0000]
* chrono::local_time[link local_time.md]
* chrono::local_days[link local_time.md]
* 2016y[link year/op_y.md]
* 1h[link duration/op_h.md]
* 30min[link duration/op_min.md]
* chrono::zoned_time[link zoned_time.md]

### 出力
```
2016-11-06 01:30:00 is ambiguous. It could be
2016-11-06 01:30:00 EDT == 2016-11-06 05:30:00 UTC or
2016-11-06 01:30:00 EST == 2016-11-06 06:30:00 UTC
```

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
