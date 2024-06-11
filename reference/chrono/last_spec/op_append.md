# operator/
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr month_day_last
    operator/(last_spec, const month& m) noexcept; // (1) C++20
  constexpr month_day_last
    operator/(last_spec, int m) noexcept;          // (2) C++20
}
```
* month[link /reference/chrono/month.md]
* month_day_last[link /reference/chrono/month_day_last.md]

## 概要
カレンダー要素同士をつなぎ合わせる。

- (1) : `last_spec`型と[`month`](/reference/chrono/month.md)型をつなぎ、月と月の最終日の情報をもつ型にまとめる
- (2) : `last_spec`型と`int`型での月の値をつなぎ、月と月の最終日の情報をもつ型にまとめる


## 戻り値
- (2) : `return m /` `last;`
- (3) : `return` [`month`](/reference/chrono/month.md)`{m} / last;`


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
  // 2月の最終日 (年の情報をもたないため、2月かどうかに関わらず日を算出できない状態)
  chrono::month_day_last mdl1 = chrono::last/chrono::February;
  chrono::month_day_last mdl2 = chrono::last/2;
  assert(mdl1.month() == chrono::February);
  assert(mdl1 == mdl2);
}
```
* chrono::February[link /reference/chrono/month_constants.md]
* chrono::month_day_last[link /reference/chrono/month_day_last.md]
* mdl1.month()[link /reference/chrono/month_day_last/month.md]

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
