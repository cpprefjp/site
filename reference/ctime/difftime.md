# difftime
* ctime[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  double difftime(time_t time1, time_t time0);
}
```
* time_t[link time_t.md]

## 概要
2つの時間の差を、秒単位で計算する。


## 戻り値
`time1 - time0`を秒数として表した値 (`double`型) を返す。


## 備考
[`time_t`](time_t.md)は算術型であるが、その値のエンコーディングは処理系定義であり、必ずしも秒単位とは限らない。2つの[`time_t`](time_t.md)値の差を正しく秒数として求めるには、単純な減算ではなくこの関数を使用する。


## 例
```cpp example
#include <ctime>
#include <iostream>

int main()
{
  // 2026年1月1日
  std::tm a{};
  a.tm_year = 2026 - 1900;
  a.tm_mon = 0;
  a.tm_mday = 1;

  // 2026年1月2日
  std::tm b{};
  b.tm_year = 2026 - 1900;
  b.tm_mon = 0;
  b.tm_mday = 2;

  // 2つの時間の差を秒数で求める
  double sec = std::difftime(std::mktime(&b), std::mktime(&a));
  std::cout << sec << std::endl;
}
```
* std::difftime[color ff0000]
* std::tm[link tm.md]
* std::mktime[link mktime.md]

### 出力
```
86400
```


## バージョン
### 言語
- C++03


## 関連項目
- [`time`](time.md): 現在時間までの経過秒を取得する
- [`mktime`](mktime.md): カレンダー時間から経過秒を生成する
