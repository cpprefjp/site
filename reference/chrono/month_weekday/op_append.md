# operator/
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month_weekday
    operator/(const month_weekday& mwd, const year& y) noexcept; // (1) C++20

  constexpr year_month_weekday
    operator/(const month_weekday& mwd, int y) noexcept;         // (2) C++20
}
```
* year[link /reference/chrono/year.md]
* year_month_weekday[link /reference/chrono/year_month_weekday.md]

## 概要
カレンダー要素同士をつなぎ合わせる。

- (1) : `month_weekday`型と[`year`](/reference/chrono/year.md)型をつなぎ、年月の指定したN回目の曜日の情報をもつ型にまとめる
- (2) : `month_weekday`型と`int`型での年の値をつなぎ、年月の指定したN回目の曜日の情報をもつ型にまとめる


## 戻り値
- (1) : `return y / mwd;`
- (2) : `return` [`year`](/reference/chrono/year.md)`{y} / mwd;`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  assert((March/Sunday[1])/2020y == (year_month_weekday{2020y, March, Sunday[1]}));
  assert((March/Sunday[1])/2020 == (year_month_weekday{2020y, March, Sunday[1]}));
}
```
* March[link /reference/chrono/month_constants.md]
* Sunday[link /reference/chrono/weekday_constants.md]
* 2020y[link /reference/chrono/year/op_y.md]
* year_month_weekday[link /reference/chrono/year_month_weekday.md]

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
