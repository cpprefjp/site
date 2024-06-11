# now
* chrono[meta header]
* std::chrono[meta namespace]
* gps_clock[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
static time_point now();
```
* time_point[link /reference/chrono/time_point.md]

## 概要
現在日時を取得する。


## 戻り値
[`from_utc`](from_utc.md)`(`[`utc_clock`](/reference/chrono/utc_clock.md)`::`[`now()`](/reference/chrono/utc_clock/now.md)`)`もしくはより精度が高いGPS時間としての現在日時を返す。


## 備考
このクラスの`now()`静的メンバ関数は、標準では`noexcept(false)`である。実装が`noexcept(true)`である保証をしない限り、このクラスはTrivialClock要件を満たさない。


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

### 出力例
```
2019-10-24 11:15:37 GPS
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
