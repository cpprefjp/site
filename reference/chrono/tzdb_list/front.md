# front
* chrono[meta header]
* std::chrono[meta namespace]
* tzdb_list[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
const tzdb& front() const noexcept;
```
* tzdb[link /reference/chrono/tzdb.md]

## 概要
先頭要素を取得する。

このクラスの先頭要素は、ローカルに保持しているうち最新のタイムゾーンデータベースを意味する。


## 戻り値
先頭要素への参照を返す。


## 備考
- この操作は[`reload_tzdb()`](/reference/chrono/reload_tzdb.md)内での呼び出しに対してスレッドセーフとなっている


## 例外
投げない

このクラスには1要素以上の要素が保持されることが定められているため、空にはならない。


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
* front()[color ff0000]
* chrono::tzdb[link /reference/chrono/tzdb.md]
* tzdb.locate_zone[link /reference/chrono/tzdb/locate_zone.md]
* chrono::time_zone[link /reference/chrono/time_zone.md]
* tz->name()[link /reference/chrono/time_zone/name.md]

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

