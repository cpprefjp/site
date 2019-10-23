# sys_time
* chrono[meta header]
* std::chrono[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
namespace chrono {
  template <class Duration>
  using sys_time = time_point<system_clock, Duration>; // (1) C++20

  using sys_seconds = sys_time<seconds>;               // (2) C++20
  using sys_days    = sys_time<days>;                  // (3) C++20

  template <class charT, class traits, class Duration>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os,
               const sys_time<Duration>& tp);          // (4) C++20

  template <class charT, class traits>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os,
               const sys_days& dp);                    // (5) C++20

  template <class charT, class traits, class Duration, class Alloc = allocator<charT>>
  std::basic_istream<charT, traits>&
    from_stream(std::basic_istream<charT, traits>& is,
                const charT* fmt,
                sys_time<Duration>& tp,
                std::basic_string<charT, traits, Alloc>* abbrev = nullptr,
                minutes* offset = nullptr);            // (6) C++20
}}
```
* time_point[link time_point.md]
* system_clock[link system_clock.md]

## 概要
システム時間の一点を指す[`time_point`](time_point.md)に対する別名。

- (1) : [`system_clock`](system_clock.md)の[`time_point`](time_point.md)に対する別名。経過時間を表す型はパラメータ化されている
- (2) : 秒単位でシステム時間の一点を指す[`time_point`](time_point.md)に対する別名
- (3) : 日単位でシステム時間の一点を指す[`time_point`](time_point.md)に対する別名
- (4) : 時間点に含まれる日付と時間を出力ストリームに出力する
- (5) : 時間点に含まれる日付を出力ストリームに出力する
- (6) : フォーマット指定して入力ストリームから日付・時間を時間点オブジェクトに入力する


## 備考
- (1) : このバージョンは、関数テンプレートで任意の経過時間単位の`time_point`を受け取るために使用できる。`system_clock::time_point`がもつ経過時間の単位は未規定 (実装定義) であるため、特定の単位に決めることができないため、経過時間の型のみをパラメータ化して関数テンプレートで受け取ると便利である


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // 未規定の経過時間単位をもつ時間点
  chrono::system_clock::time_point tp = chrono::system_clock::now();

  // 秒単位の時間点
  chrono::sys_seconds sec_p = chrono::time_point_cast<chrono::seconds>(tp);
  std::cout << sec_p << std::endl;

  // 日単位の時間点
  chrono::sys_days day_p = chrono::time_point_cast<chrono::days>(tp);
  std::cout << day_p << std::endl;
}
```
* chrono::sys_seconds[color ff0000]
* chrono::sys_days[color ff0000]
* chrono::system_clock[link system_clock.md]
* now()[link system_clock/now.md]
* chrono::time_point_cast[link time_point_cast.md]
* chrono::seconds[link seconds.md]
* chrono::days[link days.md.nolink]

### 出力例 (未検証)
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 (入出力ストリームなし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
