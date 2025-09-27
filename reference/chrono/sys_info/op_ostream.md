# operator<<
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os, const sys_info& si); // (1) C++20
}
```

## 概要
`sys_info`オブジェクトを出力ストリームに出力する。


## 効果
`si`を未規定のフォーマットで`os`に出力する


## 戻り値
```cpp
return os;
```


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();

  // 日本のタイムゾーン
  const chrono::time_zone* tz = chrono::locate_zone("Asia/Tokyo");
  chrono::sys_info si = tz->get_info(now);

  std::cout << si << std::endl; // タイムゾーン情報全体を出力
}
```
* chrono::time_zone[link /reference/chrono/time_zone.md]
* tz->get_info[link /reference/chrono/time_zone/get_info.md]
* chrono::locate_zone[link /reference/chrono/locate_zone.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]

### 出力例
```
[1951-09-08 15:00:00,32767-12-31 00:00:00,09:00:00,0min,JST]
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
