# tzdb
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  struct tzdb;
}
```

## 概要
`tzdb`は、タイムゾーンデータベースの情報にアクセスするためのクラスである。

タイムゾーンデータベースは、RFC 6557においてIANA Time Zone databaseとして説明される。このクラスは、UTCタイムゾーンをもつシステム時間と、ユーザー指定のタイムゾーンをもつローカル時間の間の変換において使用される。

このクラス内の各リストオブジェクトは、高速に検索ができるようソートされる。

タイムゾーンデータベースは、[`std::chrono::get_tzdb()`](get_tzdb.md)関数を使用することでこのクラスのオブジェクトとして取得できる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`locate_zone`](tzdb/locate_zone.md)   | 指定した名前のタイムゾーンを取得する | C++20 |
| [`current_zone`](tzdb/current_zone.md) | 現在のタイムゾーンを取得する | C++20 |


## メンバ変数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`string`](/reference/string/basic_string.md) `version;` | タイムゾーンデータベースのバージョン文字列 | C++20 |
| [`vector`](/reference/vector/vector.md)`<`[`time_zone`](time_zone.md)`> zones;` | タイムゾーンデータベースが保持するタイムゾーンのリスト | C++20 |
| [`vector`](/reference/vector/vector.md)`<`[`time_zone_link`](time_zone_link.md)`> links;` | タイムゾーンデータベースが保持するタイムゾーンリンクのリスト | C++20 |
| [`vector`](/reference/vector/vector.md)`<`[`leap_second`](leap_second.md)`> leap_seconds;` | タイムゾーンデータベースが保持するうるう秒のリスト | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto utc_now = chrono::system_clock::now();

  // 日本のタイムゾーン (UTC + 9時間)
  const chrono::tzdb& tzdb = chrono::get_tzdb();
  const chrono::time_zone* tz = tzdb.locate_zone("Asia/Tokyo");

  // UTCから日本のタイムゾーンに変換
  chrono::local_time jst_now = tz->to_local(utc_now);

  std::cout << utc_now << std::endl;
  std::cout << jst_now << std::endl;
}
```
* chrono::tzdb[color ff0000]
* chrono::get_tzdb()[link get_tzdb.md]
* chrono::time_zone[link time_zone.md]
* tzdb.locate_zone[link tzdb/locate_zone.md]
* tz->to_local[link time_zone/to_local.md]
* chrono::local_time[link local_time.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]

### 出力例
```
2019-10-24 11:15:10
2019-10-24 20:15:10
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]

