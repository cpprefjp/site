# gmtime
* ctime[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  tm* gmtime(const time_t* timer);
}
```
* time_t[link time_t.md]
* tm[link tm.md]

## 概要
経過秒 ([`time_t`](time_t.md)) を、UTCで表現されたカレンダー時間 (`tm`構造体) に変換する。

ローカル時間に変換する[`localtime`](localtime.md)に対し、この関数はUTC (協定世界時) に変換する。


## 効果
`timer`が指すカレンダー時間を、UTCで表現された要素別の時間に変換する。


## 戻り値
変換した要素別の時間を指すポインタを返す。

指定された時間をUTCに変換できない場合、ヌルポインタを返す。


## 備考
戻り値は静的に確保された領域を指すため、`gmtime`や[`localtime`](localtime.md)の呼び出しのたびに上書きされる可能性がある。スレッドセーフに変換するには、C++26で追加された[`gmtime_r`](gmtime_r.md)を使用する。


## 例
```cpp example
#include <ctime>
#include <iostream>

int main()
{
  // エポック (1970年1月1日 00:00:00 UTC)
  std::time_t t = 0;

  std::tm* utc = std::gmtime(&t);
  std::cout << (utc->tm_year + 1900) << "年"
            << (utc->tm_mon + 1) << "月"
            << utc->tm_mday << "日" << std::endl;
}
```
* std::gmtime[color ff0000]
* std::tm[link tm.md]

### 出力
```
1970年1月1日
```


## バージョン
### 言語
- C++03


## 関連項目
- [`gmtime_r`](gmtime_r.md): 経過秒からUTCのカレンダー時間を生成する (バッファ指定)
- [`localtime`](localtime.md): 経過秒からローカル時間のカレンダー時間を生成する
- [`mktime`](mktime.md): カレンダー時間から経過秒を生成する
