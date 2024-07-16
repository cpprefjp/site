# name
* chrono[meta header]
* std::chrono[meta namespace]
* time_zone[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
std::string_view name() const noexcept; // (1) C++20
```

## 概要
タイムゾーン名を取得する。


## 戻り値
タイムゾーンの名前を返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  const chrono::time_zone* tz1 = chrono::locate_zone("Asia/Tokyo");
  std::string_view jst = tz1->name();
  assert(jst == "Asia/Tokyo");

  const chrono::time_zone* tz2 = chrono::locate_zone("UTC");
  std::string_view utc = tz2->name();
  assert(utc == "Etc/UTC");
}
```
* name()[color ff0000]
* chrono::locate_zone[link /reference/chrono/locate_zone.md]

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
