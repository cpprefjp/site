# leap_second_info
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  struct leap_second_info {
    bool is_leap_second;
    seconds elapsed;
  };
}
```

## 概要
`leap_second_info`は、[`get_leap_second_info()`](get_leap_second_info.md)関数によって返される、うるう秒の情報を表すクラスである。

各メンバ変数は、以下を意味する：

| メンバ変数 | 説明 |
|------------|------|
| `is_leap_second` | [`get_leap_second_info()`](get_leap_second_info.md)関数に指定された日時自身がうるう秒であれば`true`、そうでなければ`false` |
| `elapsed`        | 1970年1月1日から[`get_leap_second_info()`](get_leap_second_info.md)関数に指定された日時までにうるう秒が挿入された回数 (秒数)。<br/> 回数には指定された日時を含む |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  std::cout << std::boolalpha;

  // 2016-12-31 23:59:59 UTC
  chrono::utc_time tp = chrono::clock_cast<chrono::utc_clock>(chrono::sys_days{2017y/1/1});
  tp -= 2s;
  {
    chrono::leap_second_info info = chrono::get_leap_second_info(tp);
    std::cout << tp << std::endl;
    std::cout << info.is_leap_second << " " << info.elapsed.count() << std::endl;
  }

  // 日本標準時(JST)2017年1月1日にうるう秒挿入が実施された
  // 2016-12-31 23:59:60 UTC
  tp += 1s;
  {
    chrono::leap_second_info info = chrono::get_leap_second_info(tp);
    std::cout << tp << std::endl;
    std::cout << info.is_leap_second << " " << info.elapsed.count() << std::endl;
  }

  // 2017-01-01 00:00:00 UTC
  tp += 1s;
  {
    chrono::leap_second_info info = chrono::get_leap_second_info(tp);
    std::cout << tp << std::endl;
    std::cout << info.is_leap_second << " " << info.elapsed.count() << std::endl;
  }
}
```
* chrono::get_leap_second_info[link get_leap_second_info.md]
* chrono::utc_time[link utc_time.md]
* chrono::utc_clock[link utc_clock.md]
* count()[link duration/count.md]
* 2017y[link year/op_y.md]
* chrono::sys_days[link sys_time.md]
* chrono::clock_cast[link clock_cast.md]

### 出力
```
2016-12-31 23:59:59
false 26
2016-12-31 23:59:60
true 27
2017-01-01 00:00:00
false 27
```

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 13.2 [mark impl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [`leap_second`](leap_second.md)


## 参照
- [日本標準時プロジェクト Information of Leap second](https://jjy.nict.go.jp/QandA/data/leapsec.html)
- [P1466R3 Miscellaneous minor fixes for chrono](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1466r3.html)
