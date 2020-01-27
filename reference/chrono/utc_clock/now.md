# now
* chrono[meta header]
* std::chrono[meta namespace]
* utc_clock[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
static time_point now();
```
* time_point[link /reference/chrono/time_point.md]

## 概要
現在日時を取得する


## 戻り値
[`from_sys`](from_sys.md)`(`[`system_clock`](/reference/chrono/system_clock.md)`::`[`now()`](/reference/chrono/system_clock/now.md)`)`、もしくはより精度が高いUTC時間としての現在日時を返す。


## 備考
他のク�ッククラスとは違い、このクラスの`now()`静的メンバ関数は、標準では`noexcept(false)`である。実装が`noexcept(true)`である保証をしない限り、このクラスはTrivialClock要件を満たさない。


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
