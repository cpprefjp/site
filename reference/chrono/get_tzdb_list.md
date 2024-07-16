# get_tzdb_list
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  const tzdb_list& get_tzdb_list();
}
```
* tzdb_list[link tzdb_list.md]

## 概要
タイムゾーンデータベースのリストを取得する。

この関数は、[`tzdb_list`](tzdb_list.md)クラスのシングルトンオブジェクトを生成・取得する。


## 効果
この関数に最初にアクセスした際に、タイムゾーンデータベースを初期化する。初期化時には、[`tzdb_list`](tzdb_list.md)クラスオブジェクトには要素として[`tzdb`](tzdb.md)オブジェクトがひとつだけ保持される。


## 戻り値
タイムゾーンデータベースリストへの参照を返す。


## 例外
なんらかの理由により[`tzdb_list`](tzdb_list.md)が妥当な[`tzdb`](tzdb.md)オブジェクトをひとつも保持できない場合、[`runtime_error`](/reference/stdexcept.md)例外が送出される。


## 備考
- この関数は複数スレッドからの呼び出しに対して安全であり、初期化は一度だけ行われる


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  const chrono::tzdb& tzdb = chrono::get_tzdb_list().front();
  const chrono::time_zone* tz = tzdb.locate_zone("Asia/Tokyo");
  std::cout << tz->name() << std::endl;
}
```
* chrono::get_tzdb_list()[color ff0000]
* front()[link tzdb_list/front.md]
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
