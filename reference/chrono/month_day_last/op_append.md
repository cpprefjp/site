# operator/
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month_day_last
    operator/(const month_day_last& mdl, const year& y) noexcept; // (1) C++20
  constexpr year_month_day_last
    operator/(const month_day_last& mdl, int y) noexcept;         // (2) C++20
}
```
* year[link /reference/chrono/year.md]
* year_month_day_last[link /reference/chrono/year_month_day_last.md]

## 概要
カレンダー要素同士をつなぎ合わせる。

- (1) : `month_day_last`型と[`year`](/reference/chrono/year.md)型をつなぎ、年月の最終日の情報をもつ型にまとめる
- (2) : `month_day_last`型と`int`型での年の値をつなぎ、年月の最終日の情報をもつ型にまとめる


## 戻り値
- (1) : `return y / mdl;`
- (2) : `return` [`year`](/reference/chrono/year.md)`{y} / mdl;`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  assert((March/last)/2020y == (year_month_day_last{2020y, March/last}));
  assert((March/last)/2020 == (year_month_day_last{2020y, March/last}));
}
```
* March[link /reference/chrono/month_constants.md]
* last[link /reference/chrono/last_spec.md]
* 2020y[link /reference/chrono/year/op_y.md]
* year_month_day_last[link /reference/chrono/year_month_day_last.md]

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
