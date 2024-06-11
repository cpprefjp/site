# to_duration
* chrono[meta header]
* std::chrono[meta namespace]
* hh_mm_ss[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr precision to_duration() const noexcept; // (1) C++20
```

## 概要
時:分:秒、秒未満をもつ[`duration`](/reference/chrono/duration.md)オブジェクトに変換する。


## 戻り値
[`is_negative()`](is_negative.md)が`true`であれば`-(`[`hours()`](hours.md) `+` [`minutes()`](minutes.md) `+` [`seconds()`](seconds.md) `+` [`subseconds()`](subseconds.md)`)`を返し、そうでなければ[`hours()`](hours.md) `+` [`minutes()`](minutes.md) `+` [`seconds()`](seconds.md) `+` [`subseconds()`](subseconds.md)を返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::hh_mm_ss time1{15h + 30min + 20s};
  assert(time1.to_duration() == 15h + 30min + 20s);

  chrono::hh_mm_ss time2{-(15h + 30min + 20s)};
  assert(time2.to_duration() == -(15h + 30min + 20s));

  chrono::hh_mm_ss time3{15h + 30min + 20s + 123ms};
  assert(time3.to_duration() == 15h + 30min + 20s + 123ms);
}
```
* to_duration()[color ff0000]
* 15h[link /reference/chrono/duration/op_h.md]
* 30min[link /reference/chrono/duration/op_min.md]
* 20s[link /reference/chrono/duration/op_s.md]
* 123ms[link /reference/chrono/duration/op_ms.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0 [mark verified]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
