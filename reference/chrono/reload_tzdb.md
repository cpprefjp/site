# reload_tzdb
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  const tzdb& reload_tzdb();
}
```
* tzdb[link tzdb.md]

## 概要
リモートタイムゾーンデータベースを再読込する。

この関数は、IANAのタイムゾーンデータベースをダウンロードし、[`get_tzdb()`](get_tzdb.md)関数で取得できるローカルのタイムゾーンデータベースを、スレッドセーフに最新バージョンへと更新する。

IANAのタイムゾーンデータベースは、毎月もしくは季節ごとに更新される。長期間動かすプログラムの場合は、タイムゾーンデータベースが更新されることを想定する必要がある。[`std::chrono::remote_version()`](remote_version.md)関数を呼び出すことでダウンロード先にあるタイムゾーンデータベースの最新バージョンがいくつなのかを取得できる。それとローカルのバージョンを比較してタイムゾーンデータベースを更新することになる。

```cpp
// 10日に一度などの周期で以下の処理を実行する
if (get_tzdb().version != remote_version()) {
  reload_tzdb(); // get_tzdb()で取得されるタイムゾーンデータベースを更新する
}
```
* get_tzdb()[link get_tzdb.md]
* remote_version()[link remote_version.md]


## 効果
- リモートタイムゾーンデータベースのバージョンを確認する。ローカルで保持しているタイムゾーンデータベースとバージョンが同じである場合、なにもしない
- そうでない場合、リモートタイムゾーンデータベースをダウンロードし、[`get_tzdb_list()`](get_tzdb_list.md)関数で取得できるタイムゾーンデータベースリストの先頭要素の前に、リモートタイムゾーンデータベースを挿入する


## 戻り値
```cpp
return get_tzdb_list().front();
```
* get_tzdb_list()[ink get_tzdb_list.md]
* front()[link tzdb_list/front.md]


## 例外
なんからの理由で有効なタイムゾーンデータベースを参照できない場合、この関数は[`runtime_error`](/reference/stdexcept.md)例外を送出する。


## 備考
- この関数による[`get_tzdb_list()`](get_tzdb_list.md)`.`[`front()`](tzdb_list/front.md)と[`get_tzdb_list()`](get_tzdb_list.md)`.`[`erase_after()`](tzdb_list/erase_after.md)の呼び出しはスレッドセーフに行われる
- IANAのタイムゾーンデータベースは、以下からダウンロードできる：
    - [Time Zone Database - IANA](https://www.iana.org/time-zones)


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // ローカルのタイムゾーンデータベースが古かったら更新する
  if (chrono::get_tzdb().version != chrono::remote_version()) {
    chrono::reload_tzdb();
  }
  std::cout << chrono::get_tzdb().version << std::endl;
}
```
* chrono::reload_tzdb()[color ff0000]
* chrono::get_tzdb()[link get_tzdb.md]
* chrono::remote_version()[link remote_version.md]

### 出力例
```
2019c
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
