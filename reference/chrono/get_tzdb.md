# get_tzdb
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  const tzdb& get_tzdb();
}
```
* tzdb[link tzdb.md]

## 概要
タイムゾーンデータベースを取得する。

この関数は、保持しているタイムゾーンデータベースのリストのうち、最新のタイムゾーンデータベースを取得する。タイムゾーンリストはシングルトンオブジェクトになっており、それにアクセスすることでタイムゾーンデータベースが自動的に読み込まれ、タイムゾーンデータベースのオブジェクトが構築される。

[`std::chrono::reload_tzdb()`](reload_tzdb.md)関数を呼び出すことで[`tzdb_list`](tzdb_list.md)がスレッドセーフに更新され、最新のタイムゾーンデータベースが先頭要素として挿入され、古いタイムゾーンデータベースがうしろにずれるようになっている。

IANAのタイムゾーンデータベースは、毎月もしくは季節ごとに更新される。長期間動かすプログラムの場合は、タイムゾーンデータベースが更新されることを想定する必要がある。[`std::chrono::remote_version()`](remote_version.md)関数を呼び出すことでダウンロード先にあるタイムゾーンデータベースの最新バージョンがいくつなのかを取得できる。それとローカルのバージョンを比較してタイムゾーンデータベースを更新することになる。

```cpp
// 10日に一度などの周期で以下の処理を実行する
if (get_tzdb().version != remote_version()) {
  reload_tzdb(); // get_tzdb()で取得されるタイムゾーンデータベースを更新する
}
```
* remote_version()[link remote_version.md]
* reload_tzdb()[link reload_tzdb.md]


## 戻り値
```cpp
return get_tzdb_list().front();
```
* get_tzdb_list()[link get_tzdb_list.md]
* front()[link tzdb_list/front.md]


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  const chrono::tzdb& tzdb = chrono::get_tzdb();
  const chrono::time_zone* tz = tzdb.locate_zone("Asia/Tokyo");
  std::cout << tz->name() << std::endl;
}
```
* chrono::get_tzdb()[color ff0000]
* chrono::tzdb[link tzdb.md]
* tzdb.locate_zone[link tzdb/locate_zone.md]
* chrono::time_zone[link time_zone.md]
* tz->name()[link time_zone/name.md]

### 出力例
```
Asia/Tokyo
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
