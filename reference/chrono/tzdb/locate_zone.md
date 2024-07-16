# locate_zone
* chrono[meta header]
* std::chrono[meta namespace]
* tzdb[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  const time_zone* locate_zone(std::string_view tz_name) const;
}
```
* time_zone[link /reference/chrono/time_zone.md]

## 概要
指定した名前のタイムゾーンを取得する。

この関数には、タイムゾーンデータベースに登録されているタイムゾーンを、「地域/地名」の形式で指定して取得する。


## 戻り値
- タイムゾーンリストの要素である[`time_zone`](/reference/chrono/time_zone.md)型オブジェクト`tz`に対して`tz.`[`name()`](/reference/chrono/time_zone/name.md) `== tz_name`が`true`である`tz`へのポインタを返す。
- そのようなオブジェクトが見つからない場合、タイムゾーンリンクの要素である[`time_zone_link`](/reference/chrono/time_zone_link.md)型オブジェクト`link`に対して`link.`[`name()`](/reference/chrono/time_zone_link/name.md) `== tz_name`が`true`である要素に対して、`tz.`[`name()`](/reference/chrono/time_zone/name.md) `== link.`[`target()`](/reference/chrono/time_zone_link/target.md)が`true`である`tz`へのポインタを返す


## 例外
該当する名前のタイムゾーンが見つからない場合、[`std::runtime_error`](/reference/stdexcept.md)例外を送出する


## 備考
- この関数は例外を送出する状況以外では、常に有効な[`time_zone`](/reference/chrono/time_zone.md)オブジェクトへのポインタを返す


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  const chrono::tzdb& tzdb = chrono::get_tzdb();
  // 日本のタイムゾーン (UTC + 9時間)
  const chrono::time_zone* tz = tzdb.locate_zone("Asia/Tokyo");
  std::cout << tz->name() << std::endl;

  // アメリカのタイムゾーン。
  // 地名内のスペースは、アンダースコアに変換されている
  std::cout << tzdb.locate_zone("America/New_York")->name() << std::endl;

  // 標準時のタイムゾーン。
  // 正式なタイムゾーン名は "Etc/UTC" と "Etc/GMT" だが、
  // より短い名前が (リンクとして) 定義されている
  std::cout << tzdb.locate_zone("UTC")->name() << std::endl;
  std::cout << tzdb.locate_zone("GMT")->name() << std::endl;

  // キプロス共和国の首都ニコシアはアジアに属するが、
  // 多くのユーザーはヨーロッパで見つかることを期待している。
  // ニコシアは、ヨーロッパとアジアどちらでも見つかるようリンクされており、
  // 現在の正式な地域だけでなく (Asia/Nicosia)、リンクされた地域も指定できる
  const chrono::time_zone* linked_tz = tzdb.locate_zone("Europe/Nicosia");
  std::cout << linked_tz->name() << std::endl;
}
```
* locate_zone[color ff0000]
* chrono::get_tzdb()[link /reference/chrono/get_tzdb.md]
* chrono::time_zone[link /reference/chrono/time_zone.md]
* name()[link /reference/chrono/time_zone/name.md]

### 出力
```
Asia/Tokyo
America/New_York
Etc/UTC
Etc/GMT
Asia/Nicosia
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [tz database - Wikipedia](https://ja.wikipedia.org/wiki/Tz_database)
- [Time Zone Database](https://www.iana.org/time-zones)
