# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_day_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
year_month_day_last() = delete;                            // (1) C++20

constexpr year_month_day_last(
  const chrono::year& y,
  const chrono::month_day_last& mdl) noexcept;             // (2) C++20

year_month_day_last(const year_month_day_last&) = default; // (3) C++20
year_month_day_last(year_month_day_last&&) = default;      // (4) C++20
```
* chrono::year[link /reference/chrono/year.md]
* chrono::month_day_last[link /reference/chrono/month_day_last.md]

## 概要
- (1) : デフォルトコンストラクタ。定義されない
- (2) : 年、月の最終日の値をそれぞれ指定して構築する
- (3) : コピーコンストラクタ
- (4) : ムーブコンストラクタ


## 効果
- (2) : `y`、`mdl`をメンバ変数として保持する


## 例外
投げない


### 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::year_month_day_last date1{2020y, chrono::February/chrono::last};
  chrono::year_month_day_last date2{chrono::year{2020}, chrono::last/chrono::month{2}};
  assert(chrono::year_month_day{date1} == 2020y/2/29);
  assert(chrono::year_month_day{date2} == 2020y/2/29);
}
```
* 2020y[link /reference/chrono/year/op_y.md]
* chrono::February[link /reference/chrono/month_constants.md]
* chrono::year[link /reference/chrono/year.md]
* chrono::month[link /reference/chrono/month.md]
* chrono::last[link /reference/chrono/last_spec.md]
* chrono::year_month_day[link /reference/chrono/year_month_day.md]

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
