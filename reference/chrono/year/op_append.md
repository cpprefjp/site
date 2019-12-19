# operator/
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month
    operator/(const year& y, const month& m) noexcept; // (1) C++20
  constexpr year_month
    operator/(const year& y, int m) noexcept;          // (2) C++20
}
```
* month[link /reference/chrono/month.md]
* year_month[link /reference/chrono/year_month.md.nolink]

## 概要
カレンダー要素同士をつなぎ合わせる。

- (1) : `year`型と[`month`](/reference/chrono/month.md)型をつなぎ、年と月の両方の情報をもつ型にまとめる
- (2) : `year`型と`int`型での月の値をつなぎ、年と月の両方の情報をもつ型にまとめる


## 戻り値
- (1) : `return {y, m};`
- (2) : `return y /` [`month`](/reference/chrono/month.md)`{m};`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::year_month ym1 = 2020y/chrono::March;
  chrono::year_month ym2 = 2020y/3;

  chrono::year y{2020};
  chrono::month m = chrono::March;
  chrono::year_month ym3 = y/m;

  assert(ym1.year() == chrono::year{2020});
  assert(ym1.month() == chrono::March);
  assert(ym2.year() == chrono::year{2020});
  assert(ym2.month() == chrono::March);
  assert(ym3.year() == chrono::year{2020});
  assert(ym3.month() == chrono::March);
}
```
* 2020y[link op_y.md]
* chrono::March[link /reference/chrono/month_constants.md]
* chrono::month[link /reference/chrono/month.md]
* chrono::year_month[link /reference/chrono/year_month.md.nolink]
* year()[link /reference/chrono/year_month/year.md.nolink]
* month()[link /reference/chrono/year_month/month.md.nolink]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
