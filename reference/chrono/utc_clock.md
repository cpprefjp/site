# utc_clock
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class utc_clock;
}
```

## 概要
`utc_clock`は、UTC時間 (協定世界時、Coordinated Universal Time) を表現するためのク�ックである。

うるう秒を考慮しないシステム時間のク�ック[`system_clock`](system_clock.md)とその時間点[`sys_time`](sys_time.md)と違い、`utc_clock`とその時間点[`utc_time`](utc_time.md)は、エポック以降のうるう秒を含む時間をカウントする。

他のク�ッククラスとは違い、このクラスの[`now()`](utc_clock/now.md)静的メンバ関数は、標準では`noexcept(false)`である。実装が`noexcept(true)`である保証をしない限り、このクラスはTrivialClock要件を満たさない。


### エポック
ク�ックごとの初期時間 (内部的にカウンタがあれば値ゼ�) をエポックと呼ぶ。

`utc_clock`のエポックは、1970年1月1日0時0分0秒である。


## メンバ関数
### 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`now`](utc_clock/now.md)           | 現在日時を取得する                | C++20 |
| [`to_sys`](utc_clock/to_sys.md)     | UTC時間からシステム時間へ変換する | C++20 |
| [`from_sys`](utc_clock/from_sys.md) | システム時間からUTC時間へ変換する | C++20 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|--------------------------------|-------|
| `rep`        | 時間間隔の内部表現となる符号付き算術型                        | C++20 |
| `period`     | 時間の周期を表す`ratio`型 [`ratio`](/reference/ratio/ratio.md)`<unspecified, unspecified>` | C++20 |
| `duration`   | 時間間隔の型 [`duration`](duration.md)`<rep, period>`         | C++20 |
| `time_point` | 時間の一点を指す型 [`time_point`](time_point.md)`<utc_clock>` | C++20 |


## メンバ定数

| 名前 | 説明 | 対応バージョン |
|-------------|--------------------------------------------------------|-------|
| `static constexpr bool is_steady` | 逆行しないク�ックかどうかを表す`bool`値。値は未規定。 | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::utc_clock::time_point tp = chrono::utc_clock::now();
  std::cout << tp << std::endl;
}
```
* now()[link utc_clock/now.md]

### 出力例
```
2019-10-24 11:15:10
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)


## 参照
- [協定世界時 - Wikipedia](https://ja.wikipedia.org/wiki/協定世界時)
