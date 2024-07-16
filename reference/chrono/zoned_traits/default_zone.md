# default_zone
* chrono[meta header]
* std::chrono[meta namespace]
* zoned_traits[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
static const time_zone* default_zone(); // (1) C++20
```
* time_zone[link /reference/chrono/time_zone.md]

## 概要
デフォルトのタイムゾーンを取得する。


## 戻り値
```cpp
return std::chrono::locate_zone("UTC");
```
* std::chrono::locate_zone[link /reference/chrono/locate_zone.md]


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  const time_zone* tz = zoned_traits<const time_zone*>::default_zone();
  assert(tz == locate_zone("UTC"));
}
```
* default_zone()[color ff0000]
* time_zone[link /reference/chrono/time_zone.md]
* locate_zone[link /reference/chrono/locate_zone.md]


### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]

