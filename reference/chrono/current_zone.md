# current_zone
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  const time_zone* current_zone();
}
```
* time_zone[link time_zone.md]

## 概要
現在のタイムゾーンを取得する。

この関数は、そのコンピュータに設定されているローカルタイムゾーンへのポインタを返す。


## 戻り値
```cpp
return get_tzdb().current_zone();
```
* get_tzdb()[link get_tzdb.md]
* current_zone()[link tzdb/current_zone.md]


## 備考
- WindowsおよびLinux系OSでは、環境変数`TZ`に設定されたタイムゾーンが返される


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  const chrono::time_zone* tz = chrono::current_zone();
  std::cout << tz->name() << std::endl;
}
```
* chrono::current_zone()[color ff0000]
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
