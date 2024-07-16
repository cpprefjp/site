# time_zone
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class time_zone;
}
```

## 概要
`time_zone`は、指定した地理領域の全てのタイムゾーン遷移を表すクラスである。

地域間には時差があるため、地球上の各地域に「タイムゾーン (時間帯)」が割り振られ、標準時であるUTCタイムゾーンからの時差が定義される。

このクラスは、UTCタイムゾーンから特定のタイムゾーン、およびその逆の時間変換を行う。

タイムゾーン付きの時間点として[`zoned_time`](zoned_time.md)クラスが定義されているため、基本的にはそちらを使うことを推奨する。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `time_zone(time_zone&&) = default;`<br/> `time_zone() = delete;`<br/> `time_zone(const time_zone&) = delete;` | コンストラクタ | C++20 |
| `time_zone& operator=(time_zone&&) = default;`<br/> `time_zone& operator=(const time_zone&) = delete;` | 代入演算子 | C++20 |

ここに記載されていない追加のコンストラクタは未規定である。ユーザーがこのクラスのオブジェクトを構築することはできず、タイムゾーンデータベース[`tzdb`](tzdb.md)が構築を行う。


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`name`](time_zone/name.md)         | タイムゾーン名を取得する | C++20 |
| [`get_info`](time_zone/get_info.md) | タイムゾーンの情報を取得する | C++20 |


### 変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`to_sys`](time_zone/to_sys.md)     | ローカル時間からシステム時間に変換する | C++20 |
| [`to_local`](time_zone/to_local.md) | システム時間からローカル時間に変換する | C++20 |


## 非メンバ関数
### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](time_zone/op_equal.md)         | 等値比較を行う | C++20 |
| `bool operator!=(const time_zone&, const time_zone&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++20 |
| [`operator<=>`](time_zone/op_compare_3way.md) | 三方比較を行う | C++20 |
| `bool operator<(const time_zone&, const time_zone&) noexcept;` | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator<=(const time_zone&, const time_zone&) noexcept;` | 左辺が右辺以下を判定する (`<=>`により使用可能) | C++20 |
| `bool operator>(const time_zone&, const time_zone&) noexcept;` | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator>=(const time_zone&, const time_zone&) noexcept;` | 左辺が右辺以上を判定する (`<=>`により使用可能) | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // システム時間 (UTCタイムゾーン) を日本のローカル時間 (UTC + 9時間) に変換する
  auto utc_now = chrono::system_clock::now();

  const chrono::time_zone* tz = chrono::locate_zone("Asia/Tokyo");
  chrono::local_time jst_now = tz->to_local(utc_now);

  std::cout << utc_now << std::endl;
  std::cout << jst_now << std::endl;
}
```
* tz->to_local[link time_zone/to_local.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* chrono::local_time[link /reference/chrono/local_time.md]
* chrono::locate_zone[link /reference/chrono/locate_zone.md]

### 出力例
```
2019-10-24 11:15:10
2019-10-24 20:15:10
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]

