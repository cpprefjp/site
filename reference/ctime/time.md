# time
* ctime[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  time_t time(time_t* timer);
}
```
* time_t[link time_t.md]

## 概要
現在時間までの経過秒を取得する。

ここで得られる値は、エポック (多くの処理系では1970年1月1日00:00:00 UTC) からの経過時間である。


## 効果
`timer`がヌルポインタでない場合、取得した現在時間を`*timer`にも格納する。


## 戻り値
現在時間までの経過秒を[`time_t`](time_t.md)型の値として返す。

現在時間が取得できない場合、`(time_t)(-1)`を返す。


## 例
```cpp example
#include <ctime>
#include <iostream>

int main()
{
  // 現在日時を取得する
  std::time_t now = std::time(nullptr);

  // 現在日時を文字列に変換して出力する
  std::cout << std::ctime(&now);
}
```
* std::time[color ff0000]
* std::ctime[link ctime.md]

### 出力例
```
Wed Aug 19 12:34:56 2026
```


## バージョン
### 言語
- C++98


## 関連項目
- [`time_t`](time_t.md)
- [`difftime`](difftime.md): 2つの時間の差を計算する
- [`localtime`](localtime.md): 経過秒からローカル時間のカレンダー時間を生成する
- [`gmtime`](gmtime.md): 経過秒からUTCのカレンダー時間を生成する
