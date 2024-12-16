# tai_clock
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class tai_clock;
}
```

## 概要
`tai_clock`は、TAI時間 (国際原子時、International Atomic Time) を表現するためのクロックである。

TAIではうるう秒 (leap second) 補正が行われないため、2017年1月1日以降～2024年現在ではUTC (世界協定時) よりも37秒進んだ時間をとる。
つまり 2024-01-01 00:00:37 TAI と 2024-01-01 00:00:00 UTC は等価である。


このクラスの[`now()`](tai_clock/now.md)静的メンバ関数は、標準では`noexcept(false)`である。実装が`noexcept(true)`である保証をしない限り、このクラスはTrivialClock要件を満たさない。


### エポック
クロックごとの初期時間 (内部的にカウンタがあれば値ゼロ) をエポックと呼ぶ。

`tai_clock`のエポックは、1958年1月1日0時0分0秒である。
これはUTC時間1957年12月31日23時59分50秒に対応する。


### うるう秒の扱い
`tai_clock`ではうるう秒は考慮されず、UTCに対してうるう秒数分だけ時間がシフトする。そのため、UTCに正のうるう秒が挿入されるたびに、UTC時間はTAI時間よりも1秒ずつ遅れていく。

例として、`tai_clock`エポック日 (1958年1月1日) 時点ではUTCには正のうるう秒が10回挿入されており、さらに2000年01月01日までに正のうるう秒が22回、負のうるう秒が0回挿入されたため、2000-01-01 00:00:00 UTCと2000-01-01 00:00:32 TAIは等価となる。


## メンバ関数
### 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`now`](tai_clock/now.md)           | 現在日時を取得する           | C++20 |
| [`to_utc`](tai_clock/to_utc.md)     | TAI時間からUTC時間へ変換する | C++20 |
| [`from_utc`](tai_clock/from_utc.md) | UTC時間からTAI時間へ変換する | C++20 |


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
### 例1: 現在TAI時間
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::tai_clock::time_point tp = chrono::tai_clock::now();
  std::cout << tp << std::endl;
}
```
* chrono::tai_clock[color ff0000]
* now()[link tai_clock/now.md]

#### 出力例
```
2019-10-24 11:15:47.519957239
```

### 例2: うるう秒の影響
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::literals::chrono_literals;

int main() {
  auto utc_tp = chrono::utc_clock::from_sys(chrono::sys_days{2024y/1/1});
  auto tai_tp = chrono::tai_clock::from_utc(utc_tp);
  std::cout << utc_tp << " UTC" << std::endl;
  std::cout << tai_tp << " TAI" << std::endl;
}
```
* chrono::tai_clock[color ff0000]
* from_sys[link utc_clock/from_sys.md]
* from_utc[link tai_clock/from_utc.md]

#### 出力
```
2024-01-01 00:00:00 UTC
2024-01-01 00:00:37 TAI
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 13.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [国際原子時 - Wikipedia](https://ja.wikipedia.org/wiki/国際原子時)
- [国立天文台 水沢, うるう秒について](https://www.miz.nao.ac.jp/vlbi/leapsec.html)
- [LWG Issue 3359. `<chrono>` leap second support should allow for negative leap seconds](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3359)
