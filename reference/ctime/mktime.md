# mktime
* ctime[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  time_t mktime(tm* timeptr);
}
```
* time_t[link time_t.md]
* tm[link tm.md]

## 概要
ローカル時間で表現されたカレンダー時間 (`tm`構造体) を、経過秒 ([`time_t`](time_t.md)) に変換する。

入力をUTCとして解釈する[`timegm`](timegm.md)に対し、この関数は入力をローカル時間として解釈する。


## 効果
`timeptr`が指す構造体のカレンダー時間 (ローカル時間として表現される) を、`time`関数が返す値と同じエンコーディングの経過秒に変換する。

`tm_wday`と`tm_yday`の元の値は無視され、それ以外のメンバは規定の範囲に制限されない。変換に成功した場合、`tm_wday`と`tm_yday`は適切に設定され、その他のメンバは規定の範囲に正規化される。


## 戻り値
指定されたカレンダー時間を[`time_t`](time_t.md)型の値として返す。

カレンダー時間が[`time_t`](time_t.md)で表現できない場合、`(time_t)(-1)`を返す。


## 例
```cpp example
#include <ctime>
#include <iostream>

int main()
{
  // 2026年1月1日 (曜日は未設定)
  std::tm t{};
  t.tm_year = 2026 - 1900;
  t.tm_mon = 0;
  t.tm_mday = 1;

  std::mktime(&t);

  // mktimeによってtm_wdayが設定される (0が日曜、4は木曜)
  std::cout << t.tm_wday << std::endl;
}
```
* std::mktime[color ff0000]
* std::tm[link tm.md]

### 出力
```
4
```


## バージョン
### 言語
- C++03


## 関連項目
- [`timegm`](timegm.md): UTCのカレンダー時間から経過秒を生成する
- [`localtime`](localtime.md): 経過秒からローカル時間のカレンダー時間を生成する
- [`difftime`](difftime.md): 2つの時間の差を計算する
