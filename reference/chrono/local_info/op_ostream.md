# operator<<
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os, const local_info& li); // (2) C++20
}
```

## 概要
`local_info`オブジェクトを出力ストリームに出力する。


## 効果
`li`を未規定のフォーマットで`os`に出力する


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
  chrono::local_time local_now{now.time_since_epoch()};

  // 日本のタイムゾーン
  const chrono::time_zone* tz = chrono::locate_zone("Asia/Tokyo");
  chrono::local_info li = tz->get_info(local_now);

  std::cout << li << std::endl; // タイムゾーン情報全体を出力
}
```
* chrono::time_zone[link /reference/chrono/time_zone.md]
* tz->get_info[link /reference/chrono/time_zone/get_info.md]
* chrono::locate_zone[link /reference/chrono/locate_zone.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* chrono::local_time[link /reference/chrono/local_time.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]

### 出力例
```
```

(未検証)

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
