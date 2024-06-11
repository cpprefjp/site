# operator+
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month_weekday
    operator+(const year_month_weekday& ymwd,
              const months& dm) noexcept;               // (1) C++20
  constexpr year_month_weekday
    operator+(const months& dm,
              const year_month_weekday& ymwd) noexcept; // (2) C++20

  constexpr year_month_weekday
    operator+(const year_month_weekday& ymwd,
              const years& dy) noexcept;                // (3) C++20
  constexpr year_month_weekday
    operator+(const years& dy,
              const year_month_weekday& ymwd) noexcept; // (4) C++20
}
```

## 概要
`year_month_weekday`の加算を行う。

- (1) : `year_month_weekday`に月の時間間隔を加算する
- (2) : 月の時間間隔に`year_month_weekday`を加算する
- (3) : `year_month_weekday`に年の時間間隔を加算する
- (4) : 年の時間間隔に`year_month_weekday`を加算する


## テンプレートパラメータ制約
- (1), (2) : [`months`](/reference/chrono/duration_aliases.md)パラメータに指定した引数が[`years`](/reference/chrono/duration_aliases.md)に変換可能である場合、[`years`](/reference/chrono/duration_aliases.md)への暗黙変換は、[`months`](/reference/chrono/duration_aliases.md)への暗黙変換よりも劣る


## 戻り値
- (1) :

```cpp
return (ymwd.year() / ymwd.month() + dm) / ymwd.weekday_indexed();
```
* ymwd.year()[link year.md]
* ymwd.month()[link month.md]
* ymwd.weekday_indexed()[link weekday_indexed.md]


- (2) :

```cpp
return ymwd + dm;
```

- (3) :

```cpp
return (ymwd.year() + dy) / ymwd.month() / ymwd.weekday_indexed();
```
* ymwd.year()[link year.md]
* ymwd.month()[link month.md]
* ymwd.weekday_indexed()[link weekday_indexed.md]

- (4) :

```cpp
return ymwd + dy;
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
  assert(2020y/2/chrono::Sunday[2] + chrono::months{1} == 2020y/3/chrono::Sunday[2]);
  assert(2019y/3/chrono::Sunday[2] + chrono::years{1} == 2020y/3/chrono::Sunday[2]);
}
```
* 2019y[link /reference/chrono/year/op_y.md]
* 2020y[link /reference/chrono/year/op_y.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]

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
