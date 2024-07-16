# sys_info
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  struct sys_info {
    sys_seconds begin;
    sys_seconds end;
    seconds offset;
    minutes save;
    string abbrev;
  };
}
```
* sys_seconds[link sys_time.md]
* string[link /reference/string/basic_string.md]

## 概要
`sys_info`は、システム時間に関するタイムゾーン情報の低レベルインタフェースを提供するクラスである。

このクラスの情報は、[`sys_time`](sys_time.md)から[`local_time`](local_time.md)に変換する際に使用される。


## メンバ変数

| 変数 | 説明 |
|------|------|
| `begin`, `end` | 関連する[`time_zone`](time_zone.md)、[`time_point`](time_point.md)、`offset`、`abbrev`が`[begin, end)`の範囲内で有効であることを意味する。<br/> この情報を利用することで、タイムゾーン遷移を効率的にイテレートできる |
| `offset` | 関連する[`time_zone`](time_zone.md)、[`time_point`](time_point.md)に対して有効な、UTCタイムゾーンに対する差分時間を意味する。<br/> `offset = local_time - sys_time`の関係が成り立つ |
| `save` | このメンバ変数は、[`local_time`](local_time.md)と[`sys_time`](sys_time.md)の間の変換では通常、必要にならない情報である。<br/> `save != 0min`の場合、その`sys_info`は「サマータイム ("daylight saving" time)」にあると言われ、その[`time_zone`](time_zone.md)がサマータイムから外れている場合に使用するオフセットとして`offset - save`を使用することを推奨する。<br/> ただし、この情報は信頼すべきものと見なすことは推奨しない。そのような情報を取得する唯一の確実な方法は、`save == 0min`である`sys_info`を返す[`time_point`](time_point.md)で[`time_zone`](time_zone.md)を照会することである。<br/> [`time_point`](time_point.md)がそのような`sys_info`を返す保証はないが、`save != 0min`の`sys_info`は、`[begin, end)`の範囲内にないことが保証される |
| `abbrev` | 関連する[`time_zone`](time_zone.md)および[`time_point`](time_point.md)に使用される現在の「略称 (abbreviation)」を意味する。略称はタイムゾーンごとに一意に定まるわけではないため、略称からタイムゾーンおよびUTCタイムゾーンからのオフセット時間を確実にマッピングすることはできない |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](sys_info/op_ostream.md) | 出力ストリームへの出力 | C++20 |


## 文字列フォーマット

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](sys_info/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();

  // 日本のタイムゾーン
  const chrono::time_zone* tz = chrono::locate_zone("Asia/Tokyo");
  chrono::sys_info si = tz->get_info(now);
  std::cout << chrono::floor<chrono::hours>(si.offset).count() << " hours" << std::endl; // UTCタイムゾーンからの差分時間
  std::cout << si.abbrev << std::endl; // タイムゾーンの略称
}
```
* chrono::sys_info[color ff0000]
* chrono::time_zone[link time_zone.md]
* tz->get_info[link time_zone/get_info.md]
* chrono::locate_zone[link locate_zone.md]
* chrono::system_clock[link system_clock.md]
* now()[link system_clock/now.md]
* chrono::floor[link time_point/floor.md]
* count()[link /reference/chrono/duration/count.md]

### 出力
```
9 hours
JST
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]

