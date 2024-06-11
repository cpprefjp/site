# local_info
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  struct local_info {
    static constexpr int unique = 0;
    static constexpr int nonexistent = 1;
    static constexpr int ambiguous = 2;
    int result;
    sys_info first;
    sys_info second;
  };
}
```
* sys_info[link sys_info.md]

## 概要
`local_info`は、ローカル時間に関するタイムゾーン情報の低レベルインタフェースを提供するクラスである。

このクラスの情報は、[`local_time`](local_time.md)から[`sys_time`](sys_time.md)に変換する際に使用される。

- [`local_time`](local_time.md)から[`sys_time`](sys_time.md)への変換が一意に決まる場合、`result == unique`となり、`first`が正しい[`sys_info`](sys_info.md)で埋められ、`second`はゼロ初期化される
    - 存在しないローカル時間が生じる場合、`result == nonexistent`となり、`first`は直前のローカル時間の終端値の値で埋められ、`second`は直後のローカル時間の開始値で埋められる
    - あいまいなローカル時間が生じる場合、`result == ambiguous`となり、`first`は直後のローカル時間の終端値で埋められ、`second`は直前のローカル時間の開始値で埋められる

## 備考
- `nonexistent`および`ambiguous`は、サマータイムを採用しているタイムゾーンで生じる可能性がある
    - 存在しないローカル時間の例として、タイムゾーン`"America/New_York"`のローカル時刻 2016-03-13 02:30:00 は以下の隙間に位置するため存在しえない：
        - 2016-03-13 02:00:00 EST
        - 2016-03-13 03:00:00 EDT
        - 2016-03-13 07:00:00 UTC
    - あいまいなローカル時間の例として、タイムゾーン`"America/New_York"`のローカル時刻 2016-11-06 01:30:00 は、以下のいずれかとなり、一意に決まらない：
        - 2016-11-06 05:30:00 UTC
        - 2016-11-06 06:30:00 UTC


## メンバ変数

| 変数 | 説明 |
|------|------|
| `unique` | `result`がこの値である場合、[`local_time`](local_time.md)から[`sys_time`](sys_time.md)への変換が一意に決まる |
| `nonexistent` | `result`がこの値である場合、存在しないローカル時間である |
| `ambiguous`   | `result`がこの値である場合、重複するローカル時間があるため[`local_time`](local_time.md)から[`sys_time`](sys_time.md)への変換が一意に決まらない |
| `first`       | 変換に使用される第1候補のタイムゾーン情報 |
| `second`      | 変換に使用される第2候補のタイムゾーン情報 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](local_info/op_ostream.md) | 出力ストリームへの出力 | C++20 |


## 文字列フォーマット

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](local_info/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();
  chrono::local_time local_now{now.time_since_epoch()};

  // 日本のタイムゾーン
  const chrono::time_zone* tz = chrono::locate_zone("Asia/Tokyo");
  chrono::local_info li = tz->get_info(local_now);

  std::cout << li.result << std::endl;

  chrono::sys_info si = li.first;
  std::cout << chrono::floor<chrono::hours>(si.offset).count() << " hours" << std::endl; // UTCタイムゾーンからの差分時間
  std::cout << si.abbrev << std::endl; // タイムゾーンの略称
}
```
* chrono::local_info[color ff0000]
* chrono::sys_info[link sys_info.md]
* chrono::time_zone[link time_zone.md]
* tz->get_info[link time_zone/get_info.md]
* chrono::locate_zone[link locate_zone.md]
* chrono::system_clock[link system_clock.md]
* now()[link system_clock/now.md]
* chrono::local_time[link local_time.md]
* time_since_epoch()[link time_point/time_since_epoch.md]
* chrono::floor[link time_point/floor.md]
* count()[link /reference/chrono/duration/count.md]

### 出力
```
0
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


## 参照
- [C++標準ライブラリのタイムゾーン(Time Zone) - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20180326/p1)
