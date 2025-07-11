# formatter
* chrono[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Duration, class TimeZonePtr, class charT>
  struct formatter<chrono::zoned_time<Duration, TimeZonePtr>, charT>
    : formatter<chrono::local-time-format-t<Duration>, charT>;
}
```
* chrono::local-time-format-t[link /reference/chrono/local-time-format-t.md]

## 概要
`zoned_time`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`format`](formatter/format.md) | 文字列フォーマット | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main()
{
  // システム時間はUTCタイムゾーンをもつ
  auto now = chrono::system_clock::now();
  chrono::sys_seconds now_sec = chrono::floor<chrono::seconds>(now); // 秒単位

  chrono::zoned_time zt{"Asia/Tokyo", now};
  chrono::zoned_seconds zt_sec{"Asia/Tokyo", now_sec};

  // デフォルトフォーマット
  std::cout << std::format("1 : {}", zt) << std::endl;
  std::cout << std::format("2 : {}", zt_sec) << std::endl;

  // 「年月日 時分秒」のフォーマット
  std::cout << std::format("3 : {:%Y年%m月%d日 %H時%M分%S秒}", zt_sec) << std::endl;

  // 日付を / (スラッシュ) 区切り、時間を : (コロン) 区切り
  std::cout << std::format("4 : {0:%Y/%m/%d %H:%M:%S}", zt_sec) << std::endl;

  // 日付だけ出力
  std::cout << std::format("5 : %Y年%m月%d日", zt_sec) << std::endl;
  std::cout << std::format("6 : %F", zt_sec) << std::endl;

  // 時間だけ出力
  std::cout << std::format("7 : %H時%M分%S秒", zt_sec) << std::endl;
  std::cout << std::format("8 : %T", zt_sec) << std::endl;

  // 12時間時計で出力
  // (%pでロケール固有の「午前」「午後」を出力するには、日本のロケールを指定する必要がある)
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "9 : %Y年%m月%d日 %p %I時%M分%S秒", zt_sec) << std::endl;
}
```
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* chrono::sys_seconds[link /reference/chrono/sys_time.md]
* chrono::floor[link /reference/chrono/time_point/floor.md]
* std::format[link /reference/chrono/format.md]
* std::locale[link /reference/locale/locale.md]

### 出力例
```
1 : 2019-12-20 19:05:05.330140 JST
2 : 2019-12-20 19:05:05 JST
3 : 2019年12月20日 19時05分05秒
4 : 2019/12/20 19:05:05
5 : 2019年12月20日
6 : 2019-12-20
7 : 19時05分05秒
8 : 19:05:05
9 : 2019年12月20日 午後 07時05分05秒
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
