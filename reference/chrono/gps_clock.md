# gps_clock
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class gps_clock;
}
```

## 概要
`gps_clock`は、GPS時間 (GPST) を表現するためのクロックである。この時刻系は、カーナビや携帯端末などで使用される。

このクラスの[`now()`](gps_clock/now.md)静的メンバ関数は、標準では`noexcept(false)`である。実装が`noexcept(true)`である保証をしない限り、このクラスはTrivialClock要件を満たさない。


### エポック
クロックごとの初期時間 (内部的にカウンタがあれば値ゼロ) をエポックと呼ぶ。

`gps_clock`のエポックは、1980年1月6日 (この年の最初の日曜日) 0時0分0秒である。


### うるう秒の扱い
このクロックではうるう秒は挿入されず、うるう秒の数だけ時間が進む。そのため、UTCにうるう秒が挿入されるたびに、UTCはGPSよりも1秒ずつずれていく。

GPS時間とTAI時間は19秒ずれていて、このずれは時間が経過しても変わらない。GPS時間のエポックが[`1958y`](year/op_y.md)`/`[`January`](month_constants.md)`/1`、TAI時間のエポックが[`1980y`](year/op_y.md)`/`[`January`](month_constants.md)`/`[`Sunday`](weekday_constants.md)`[1]`であるが、1958年から1970年までのオフセットが10秒と、1970年から1980年までに挿入されたうるう秒が9秒あるためだ。


## メンバ関数
### 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`now`](gps_clock/now.md)           | 現在日時を取得する           | C++20 |
| [`to_utc`](gps_clock/to_utc.md)     | GPS時間からUTC時間へ変換する | C++20 |
| [`from_utc`](gps_clock/from_utc.md) | UTC時間からGPS時間へ変換する | C++20 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|--------------------------------|-------|
| `rep`        | 時間間隔の内部表現となる符号付き算術型。具体的な型は未規定    | C++20 |
| `period`     | 時間の周期を表す`ratio`型 [`ratio`](/reference/ratio/ratio.md)`<unspecified, unspecified>` | C++20 |
| `duration`   | 時間間隔の型 [`duration`](duration.md)`<rep, period>`         | C++20 |
| `time_point` | 時間の一点を指す型 [`time_point`](time_point.md)`<utc_clock>` | C++20 |


## メンバ定数

| 名前 | 説明 | 対応バージョン |
|-------------|--------------------------------------------------------|-------|
| `static constexpr bool is_steady` | 逆行しないクロックかどうかを表す`bool`値。値は未規定。 | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::gps_clock::time_point tp = chrono::gps_clock::now();
  std::cout << tp << std::endl;
}
```
* now()[link gps_clock/now.md]

### 出力例
```
2019-10-24 11:15:37.493236171
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [全地球測位システム GPS - 暦Wiki](https://eco.mtk.nao.ac.jp/koyomi/wiki/GPS.html)
- [LWG Issue 3359. `<chrono>` leap second support should allow for negative leap seconds](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3359)
