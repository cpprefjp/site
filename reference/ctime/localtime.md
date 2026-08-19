# localtime
* ctime[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  tm* localtime(const time_t* timer);
}
```
* time_t[link time_t.md]
* tm[link tm.md]

## 概要
経過秒 ([`time_t`](time_t.md)) を、ローカル時間で表現されたカレンダー時間 (`tm`構造体) に変換する。

UTCに変換する[`gmtime`](gmtime.md)に対し、この関数は処理系のタイムゾーン設定に基づいたローカル時間に変換する。


## 効果
`timer`が指すカレンダー時間を、ローカル時間で表現された要素別の時間に変換する。


## 戻り値
変換した要素別の時間を指すポインタを返す。

指定された時間をローカル時間に変換できない場合、ヌルポインタを返す。


## 備考
戻り値は静的に確保された領域を指すため、`localtime`や[`gmtime`](gmtime.md)の呼び出しのたびに上書きされる可能性がある。スレッドセーフに変換するには、C++26で追加された[`localtime_r`](localtime_r.md)を使用する。


## 例
```cpp example
#include <ctime>
#include <iostream>

int main()
{
  // 現在日時を、ローカル時間のカレンダー時間に変換する
  std::time_t t = std::time(nullptr);
  std::tm* lt = std::localtime(&t);

  std::cout << (lt->tm_year + 1900) << "年"
            << (lt->tm_mon + 1) << "月"
            << lt->tm_mday << "日" << std::endl;
}
```
* std::localtime[color ff0000]
* std::time[link time.md]
* std::tm[link tm.md]

### 出力例
```
2026年8月19日
```


## バージョン
### 言語
- C++03


## 関連項目
- [`localtime_r`](localtime_r.md): 経過秒からローカル時間のカレンダー時間を生成する (バッファ指定)
- [`gmtime`](gmtime.md): 経過秒からUTCのカレンダー時間を生成する
- [`mktime`](mktime.md): カレンダー時間から経過秒を生成する
