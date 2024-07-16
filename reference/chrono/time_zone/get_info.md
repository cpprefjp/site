# get_info
* chrono[meta header]
* std::chrono[meta namespace]
* time_zone[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template <class Duration>
sys_info get_info(const sys_time<Duration>& st) const;     // (1) C++20

template <class Duration>
local_info get_info(const local_time<Duration>& tp) const; // (2) C++20
```
* sys_info[link /reference/chrono/sys_info.md]
* local_info[link /reference/chrono/local_info.md]
* sys_time[link /reference/chrono/sys_time.md]
* local_time[link /reference/chrono/local_time.md]

## 概要
タイムゾーンの情報を取得する。

- (1) : システム時間からローカル時間に変換する際に使用するタイムゾーンの情報を取得する
- (2) : ローカル時間からシステム時間に変換する際に使用するタイムゾーンの情報を取得する


## 戻り値
- (1) : システム時間の時間点`st`が`[i.begin, i.end)`の範囲内にある[`sys_info`](/reference/chrono/sys_info.md)型オブジェクト`i`を返す
- (2) : `tp`用の[`local_info`](/reference/chrono/local_info.md)型オブジェクトを返す


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

  // システム時間からローカル時間に変換する際に使用するタイムゾーンを取得
  chrono::sys_info si = tz->get_info(now);
  std::cout << chrono::floor<chrono::hours>(si.offset).count() << " hours" << std::endl; // UTCタイムゾーンからの差分時間
  std::cout << si.abbrev << std::endl; // タイムゾーンの略称

  // ローカル時間からシステム時間に変換する際に使用するタイムゾーンを取得
  chrono::local_info li = tz->get_info(local_now);
  if (li.result == chrono::local_info::unique) {
    chrono::sys_info si2 = li.first;
    std::cout << chrono::floor<chrono::hours>(si2.offset).count() << " hours" << std::endl;
  }
  else {
    // ローカル時間が存在しないか、あいまい
    std::cout << "local time doesn't exist or ambiguous." << std::endl;
  }
}
```
* get_info[color ff0000]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* chrono::local_time[link /reference/chrono/local_time.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* count()[link /reference/chrono/duration/count.md]
* chrono::sys_info[link /reference/chrono/sys_info.md]
* chrono::local_info[link /reference/chrono/local_info.md]
* chrono::floor[link /reference/chrono/duration/floor.md]

### 出力
```
9 hours
JST
9 hours
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
