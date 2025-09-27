# local_time_format
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class Duration>
  local-time-format-t<Duration>
    local_time_format(local_time<Duration> time, const string* abbrev = nullptr,
                      const seconds* offset_sec = nullptr);
}
```
* local-time-format-t[link local-time-format-t.md]
* local_time[link local_time.md]
* string[link /reference/string/basic_string.md]

## 概要
ローカル時間の文字列フォーマット用オブジェクトを生成する。

この関数は、ローカル時間をタイムゾーン付きでフォーマット出力したい場合に使用する。


## 戻り値
```cpp
return {time, abbrev, offset_sec};
```


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();

  chrono::zoned_time zt{"Asia/Tokyo", now};
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
* chrono::local_time_format[color ff0000]
* chrono::system_clock[link system_clock.md]
* now()[link system_clock/now.md]
* std::format[link format.md]
* chrono::zoned_time[link zoned_time.md]
* zt.get_local_time()[link zoned_time/get_local_time.md]
* zt.get_info()[link zoned_time/get_info.md]
* chrono::sys_info[link sys_info.md]
* chrono::local_time_format[link local_time_format.md]

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
