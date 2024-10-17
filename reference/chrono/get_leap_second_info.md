# get_leap_second_info
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class Duration>
  leap_second_info get_leap_second_info(const utc_time<Duration>& ut);
}
```
* leap_second_info[link leap_second_info.md]
* utc_time[link utc_time.md]

## 概要
指定した日時までに挿入されたうるう秒の回数を取得する。


## 戻り値
戻り値型[`leap_second_info`](leap_second_info.md)の各メンバ変数は、以下の値が代入される：

| メンバ変数 | 説明 |
|------------|------|
| `is_leap_second` | `ut`自身がうるう秒であれば`true`、そうでなければ`false` |
| `elapsed`        | 1970年1月1日から`ut`までに正のうるう秒が挿入された合計 (秒数)。<br/> 合計には`ut`を含む |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  std::cout << std::boolalpha;
  // 日本標準時(JST)2017年1月1日にうるう秒挿入が実施され
  //   2016-12-31 23:59:60 UTC
  // が存在する
  chrono::utc_time tp = chrono::clock_cast<chrono::utc_clock>(chrono::sys_days{2017y/1/1}) - 1s;
  chrono::leap_second_info info = chrono::get_leap_second_info(tp);
  std::cout << tp << std::endl;
  std::cout << info.is_leap_second << " " << info.elapsed.count() << std::endl;
}
```
* chrono::leap_second_info[link leap_second_info.md]
* chrono::utc_time[link utc_time.md]
* chrono::utc_clock[link utc_clock.md]
* count()[link duration/count.md]
* 2017y[link year/op_y.md]
* chrono::sys_days[link sys_time.md]
* chrono::clock_cast[link clock_cast.md]

### 出力例
```
2016-12-31 23:59:60
true 27
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
- [LWG Issue 3359. `<chrono>` leap second support should allow for negative leap seconds](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3359)
