# operator-=
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_weekday_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr year_month_weekday_last& operator-=(const months& m) noexcept; // (1) C++20
constexpr year_month_weekday_last& operator-=(const years& y) noexcept;  // (2) C++20
```

## 概要
`year_month_weekday_last`の値に対して減算の複合代入を行う。

- (1) : 月の時間間隔を減算する
- (2) : 年の時間間隔を減算する

パラメータの型が、カレンダー時間の[`month`](/reference/chrono/month.md)、[`year`](/reference/chrono/year.md)ではなく、時間間隔を表す[`months`](/reference/chrono/duration_aliases.md)、[`years`](/reference/chrono/duration_aliases.md)であることに注意。


## テンプレートパラメータ制約
- (1) : [`months`](/reference/chrono/duration_aliases.md)パラメータに指定した引数が[`years`](/reference/chrono/duration_aliases.md)に変換可能である場合、[`years`](/reference/chrono/duration_aliases.md)への暗黙変換は、[`months`](/reference/chrono/duration_aliases.md)への暗黙変換よりも劣る


## 効果
- (1) : `*this = *this - m`
- (2) : `*this = *this - y`


## 戻り値
- (1), (2) : `*this`


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
  chrono::year_month_weekday_last date = 2021y/4/chrono::Sunday[chrono::last];

  date -= chrono::months{1}; // 1ヶ月戻す
  date -= chrono::years{1};  // 1年戻す

  assert(chrono::year_month_day{chrono::sys_days{date}} == 2020y/3/29);
}
```
* 2021y[link /reference/chrono/year/op_y.md]
* 2020y[link /reference/chrono/year/op_y.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::last[link /reference/chrono/last_spec.md]
* chrono::year_month_day[link /reference/chrono/year_month_day.md]
* chrono::sys_days[link /reference/chrono/sys_time.md]

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


## 参照
- [LWG Issue 3260. `year_month*` arithmetic rejects durations convertible to `years`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3260)
