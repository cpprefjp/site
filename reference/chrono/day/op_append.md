# operator/
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr month_day
    operator/(const day& d, const month& m) noexcept; // (1) C++20
  constexpr month_day
    operator/(const day& d, int m) noexcept;          // (2) C++20

}
```
* month[link /reference/chrono/month.md]
* month_day[link /reference/chrono/month_day.md]

## 概要
カレンダー要素同士をつなぎ合わせる。

- (1) : `day`型と[`month`](/reference/chrono/month.md)型をつなぎ、月と日の両方の情報をもつ型にまとめる
- (2) : `day`型と`int`型での月の値をつなぎ、月と日の両方の情報をもつ型にまとめる


## 戻り値
- (1) : `return m / d;`
- (2) : `return` [`month`](/reference/chrono/month.md)`{m} / d;`


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
  // 3月1日 (年の情報をもたない)
  chrono::month_day md1 = 1d/chrono::March;
  chrono::month_day md2 = 1d/3;
  assert(md1.month() == chrono::March);
  assert(md1.day() == 1d);
  assert(md1 == md2);
}
```
* chrono::March[link /reference/chrono/month_constants.md]
* 1d[link /reference/chrono/day/op_d.md]
* chrono::month_day[link /reference/chrono/month_day.md]
* md1.month()[link /reference/chrono/month_day/month.md]
* md1.day()[link /reference/chrono/month_day/day.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
