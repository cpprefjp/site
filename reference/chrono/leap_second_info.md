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
  {
    chrono::utc_time now = chrono::utc_clock::now();
    chrono::leap_second_info info = chrono::get_leap_second_info(now);

    std::cout << info.is_leap_second << std::endl;
    std::cout << info.elapsed.count() << std::endl;
  }
  std::cout << std::endl;
  {
    // 2017年1月1日はうるう秒が挿入された日
    chrono::utc_time date = chrono::clock_cast<chrono::utc_clock>(chrono::sys_days{2017y/1/1});
    chrono::leap_second_info info = chrono::get_leap_second_info(date);

    std::cout << info.is_leap_second << std::endl;
    std::cout << info.elapsed.count() << std::endl;
  }
}
```
* chrono::get_leap_second_info[link get_leap_second_info.md]
* chrono::utc_time[link utc_time.md]
* chrono::utc_clock[link utc_clock.md]
* now()[link utc_clock/now.md]
* count()[link duration/count.md]
* 2017y[link year/op_y.md]
* chrono::sys_days[link sys_time.md]
* chrono::clock_cast[link clock_cast.md]

### 出力例
```
false
27

true
27
```

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [`leap_second`](leap_second.md)


## 参照
- [P1466R3 Miscellaneous minor fixes for chrono](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1466r3.html)
