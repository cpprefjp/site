# locate_zone
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  const time_zone* locate_zone(std::string_view tz_name);
}
```
* time_zone[time_zone.md.nolink]

## 概要
指定した名前のタイムゾーンを取得する。

この関数には、タイムゾーンデータベースに登録されているタイムゾーンを、「地域/地名」の形式で指定して取得する。


## 戻り値
```cpp
return get_tzdb().locate_zone(tz_name);
```
* get_tzdb()[link get_tzdb.md.nolink]
* locate_zone()[link tzdb/locate_zone.md.nolink]


## 例外
該当する名前のタイムゾーンが見つからない場合、[`std::runtime_error`](/reference/stdexcept.md)例外を送出する


## 備考
- この関数は例外を送出する状況以外では、常に有効な[`time_zone`](time_zone.md.nolink)オブジェクトへのポインタを返す


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // 日本のタイムゾーン (UTC + 9時間)
  const chrono::time_zone* tz = chrono::locate_zone("Asia/Tokyo");
  std::cout << tz->name() << std::endl;

  // アメリカのタイムゾーン。
  // 地名内のスペースは、アンダースコアに変換されている
  std::cout << chrono::locate_zone("America/New_York")->name() << std::endl;

  // 標準時のタイムゾーン。
  // �式なタイムゾーン名は "Etc/UTC" と "Etc/GMT" だが、
  // より�い名前が (リンクとして) 定義されている
  std::cout << chrono::locate_zone("UTC")->name() << std::endl;
  std::cout << chrono::locate_zone("GMT")->name() << std::endl;

  // �プ�ス共和国の首都ニコシアはアジアに属するが、
  // 多くのユーザーはヨー�ッパで見つかることを期待している。
  // ニコシアは、ヨー�ッパとアジアどちらでも見つかるようリンクされており、
  // 現在の�式な地域だけでなく (Asia/Nicosia)、リンクされた地域も指定できる
  const chrono::time_zone* linked_tz = chrono::locate_zone("Europe/Nicosia");
  std::cout << linked_tz->name() << std::endl;
}
```
* chrono::locate_zone[color ff0000]
* chrono::time_zone[link time_zone.md.nolink]
* name()[link time_zone/name.md.nolink]

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
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)


## 参照
- [tz database - Wikipedia](https://ja.wikipedia.org/wiki/Tz_database)
- [Time Zone Database](https://www.iana.org/time-zones)
