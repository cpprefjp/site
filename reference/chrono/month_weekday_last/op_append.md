# operator/
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month_weekday_last
    operator/(const month_weekday_last& mwdl, const year& y) noexcept; // (1) C++20

  constexpr year_month_weekday_last
    operator/(const month_weekday_last& mwdl, int y) noexcept;         // (2) C++20
}
```
* year[link /reference/chrono/year.md]
* year_month_weekday_last[link /reference/chrono/year_month_weekday_last.md]

## 概要
カレンダー要素同士をつなぎ合わせる。

- (1) : `month_weekday_last`型と[`year`](/reference/chrono/year.md)型をつなぎ、年月の指定した最終回目の曜日の情報をもつ型にまとめる
- (2) : `month_weekday_last`型と`int`型での年の値をつなぎ、年月の指定した最終回目の曜日の情報をもつ型にまとめる


## 戻り値
- (1) : `return y / mwdl;`
- (2) : `return` [`year`](/reference/chrono/year.md)`{y} / mwdl;`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  assert((March/Sunday[last])/2020y == (year_month_weekday_last{2020y, March, Sunday[last]}));
  assert((March/Sunday[last])/2020 == (year_month_weekday_last{2020y, March, Sunday[last]}));
}
```
* March[link /reference/chrono/month_constants.md]
* Sunday[link /reference/chrono/weekday_constants.md]
* 2020y[link /reference/chrono/year/op_y.md]
* last[link /reference/chrono/last_spec.md]
* year_month_weekday_last[link /reference/chrono/year_month_weekday_last.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
