# zoned_traits
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class T> struct zoned_traits {}; // (1) C++20

  template <>
  struct zoned_traits<const time_zone*>;     // (2) C++20
}
```
* time_zone[link time_zone.md]

## 概要
`zoned_traits`は、[`zoned_time`](zoned_time.md)`<Duration, TimeZonePtr>`クラスのデフォルトコンストラクタ、および[`string_view`](/reference/string_view/basic_string_view.md)をとるコンストラクタのための、タイムゾーン取得を動作をカスタマイズする中間インタフェースクラスである。

標準では[`time_zone`](time_zone.md)クラスに対する特殊化が定義されるが、ユーザーが任意のタイムゾーンクラスを定義する場合は、このクラスを特殊化することで、[`zoned_time`](zoned_time.md)`<Duration, TimeZonePtr>`クラスでそのタイムゾーンクラスを扱えるようになる。


## 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`default_zone`](zoned_traits/default_zone.md) | デフォルトのタイムゾーンを取得する | C++20 |
| [`locate_zone`](zoned_traits/locate_zone.md)   | タイムゾーン名を指定してタイムゾーンを取得する | C++20 |


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();

  // zoned_traits<const time_zone*>::default_zone()で取得したタイムゾーンが使用される
  chrono::zoned_time zt1{};
  assert(zt1.get_time_zone() == chrono::locate_zone("UTC"));

  // zoned_traits<const time_zone*>::locate_zone()で取得したタイムゾーンが使用される
  chrono::zoned_time zt2{"Asia/Tokyo", now};
  assert(zt2.get_time_zone() == chrono::locate_zone("Asia/Tokyo"));
}
```
* zoned_traits[color ff0000]
* time_zone[link time_zone.md]
* chrono::zoned_time[link zoned_time.md]
* chrono::system_clock[link system_clock.md]
* now()[link system_clock/now.md]
* chrono::locate_zone[link locate_zone.md]
* get_time_zone()[link zoned_time/get_time_zone.md]

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
