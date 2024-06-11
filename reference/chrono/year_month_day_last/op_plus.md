# operator+
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month_day_last
    operator+(const year_month_day_last& ymdl,
              const months& dm) noexcept;                // (1) C++20
  constexpr year_month_day_last
    operator+(const months& dm,
              const year_month_day_last& ymdl) noexcept; // (2) C++20

  constexpr year_month_day_last
    operator+(const year_month_day_last& ymdl,
              const years& dy) noexcept;                 // (3) C++20
  constexpr year_month_day_last
    operator+(const years& dy,
              const year_month_day_last& ymdl) noexcept; // (4) C++20
}
```

## 概要
`year_month_day_last`の加算を行う。

- (1) : `year_month_day_last`に月の時間間隔を加算する
- (2) : 月の時間間隔に`year_month_day_last`を加算する
- (3) : `year_month_day_last`に年の時間間隔を加算する
- (4) : 年の時間間隔に`year_month_day_last`を加算する


## テンプレートパラメータ制約
- (1), (2) : [`months`](/reference/chrono/duration_aliases.md)パラメータに指定した引数が[`years`](/reference/chrono/duration_aliases.md)に変換可能である場合、[`years`](/reference/chrono/duration_aliases.md)への暗黙変換は、[`months`](/reference/chrono/duration_aliases.md)への暗黙変換よりも劣る


## 戻り値
- (1) :

```cpp
return (ymdl.year() / ymdl.month() + dm) / last;
```
* ymdl.year()[link year.md]
* ymdl.month()[link month.md]
* last[link /reference/chrono/last_spec.md]


- (2) :

```cpp
return ymdl + dm;
```

- (3) :

```cpp
return (ymdl.year() + dy) / ymdl.month() / last;
```
* ymdl.year()[link year.md]
* ymdl.month()[link month.md]
* last[link /reference/chrono/last_spec.md]

- (4) :

```cpp
return ymdl + dy;
```


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
  assert(chrono::year_month_day{2020y/1/chrono::last + chrono::months{1}} == 2020y/2/29);
  assert(chrono::year_month_day{2019y/2/chrono::last + chrono::years{1}} == 2020y/2/29);
}
```
* 2019y[link /reference/chrono/year/op_y.md]
* 2020y[link /reference/chrono/year/op_y.md]
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


## 参照
- [LWG Issue 3260. `year_month*` arithmetic rejects durations convertible to `years`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3260)
