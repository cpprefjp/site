# formatter
* chrono[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Duration, class charT>
  struct formatter<chrono::local-time-format-t<Duration>, charT>;
}
```

## 概要
`local-time-format-t`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。


`formatter::format()`関数に渡される`local-time-format-t<Duration>`型の変数`f`があるとして、

- `%Z` (タイムゾーンの略称) が指定された場合、`f.abbrev`がヌルポインタでなければ`*f.abbrev`で置き換えられる。`%Z`が指定されて`f.abbrev`がヌルポインタだった場合、[`std::format_error`](/reference/format/format_error.md)例外が送出される
- `%z`もしくはその改良コマンドが指定された場合、`f.offset_sec`がヌルポインタでなければ`*f.offset_sec`がフォーマットされる。`%z`もしくはその改良コマンドが指定されて`f.offset_sec`がヌルポインタだった場合、[`std::format_error`](/reference/format/format_error.md)例外が送出される


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();
  chrono::sys_seconds now_sec = chrono::floor<chrono::seconds>(now); // 秒単位

  chrono::zoned_time zt{"Asia/Tokyo", now_sec};
  std::cout << std::format("{:%Y/%m/%d %H:%M:%S %Z}", zt) << std::endl;

  auto lt = zt.get_local_time();
  chrono::sys_info si = zt.get_info();
  {
    auto ltf = chrono::local_time_format(lt, &si.abbrev);
    std::cout << std::format("{:%Y/%m/%d %H:%M:%S %Z}", ltf) << std::endl;
  }
  {
    auto ltf = chrono::local_time_format(lt, &si.abbrev, &si.offset);
    std::cout << std::format("{:%Y/%m/%d %H:%M:%S %Z%z}", ltf) << std::endl;
  }
}
```
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* chrono::floor[link /reference/chrono/time_point/floor.md]
* chrono::sys_seconds[link /reference/chrono/sys_time.md]
* std::format[link /reference/chrono/format.md]
* chrono::zoned_time[link /reference/chrono/zoned_time.md]
* zt.get_local_time()[link /reference/chrono/zoned_time/get_local_time.md]
* zt.get_info()[link /reference/chrono/zoned_time/get_info.md]
* chrono::sys_info[link /reference/chrono/sys_info.md]
* chrono::local_time_format[link /reference/chrono/local_time_format.md]

### 出力例
```
2019/12/20 19:05:05 JST
2019/12/20 19:05:05 JST
2019/12/20 19:05:05 JST+0900
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
