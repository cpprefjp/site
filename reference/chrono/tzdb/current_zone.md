# current_zone
* chrono[meta header]
* std::chrono[meta namespace]
* tzdb[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  const time_zone* current_zone() const;
}
```
* time_zone[link /reference/chrono/time_zone.md]

## 概要
現在のタイムゾーンを取得する。


## 戻り値
そのコンピュータに設定されているローカルタイムゾーンへのポインタを返す


## 備考
- WindowsおよびLinux系OSでは、環境変数`TZ`に設定されたタイムゾーンが返される
- 基本的には、この関数をラップした[`std::chrono::current_zone()`](/reference/chrono/current_zone.md)関数を使用すること


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  const chrono::time_zone* tz = chrono::get_tzdb().current_zone();
  std::cout << tz->name() << std::endl;
}
```
* current_zone()[color ff0000]
* chrono::get_tzdb()[link /reference/chrono/get_tzdb.md]
* chrono::time_zone[link ../time_zone.md]
* tz->name()[link ../time_zone/name.md]

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
