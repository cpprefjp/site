# fractional_width
* chrono[meta header]
* std::chrono[meta namespace]
* hh_mm_ss[meta class]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class Duration>
  class hh_mm_ss {
  public:
    static constexpr bool fractional_width = see below;
  };
}
```
* see below[italic]

## 概要
`precision`型によって表現される小数の小数桁数。

この値は、`Duration`のすべての値を正確に表せるように、`[0, 18]`の範囲内で最小の整数値をもつ。そのような`fractional_width`が存在しない場合、値は6となる ([`std::numeric_limits`](/reference/limits/numeric_limits.md)`<float>::`[`digits10`](/reference/limits/numeric_limits/digits10.md)の値)。

`Duration`に指定する型によって`fractional_width`の値がどのように変わるかの表は以下となる：

| `Duration` | `fractional_width`の値 | 小数点をもつ値のフォーマット出力 |
|------------|------------------------|------------------|
| [`hours`, `minutes`, `seconds`](/reference/chrono/duration_aliases.md) | 0 | |
| [`milliseconds`](/reference/chrono/duration_aliases.md) | 3 | 0.001 |
| [`microseconds`](/reference/chrono/duration_aliases.md) | 6 | 0.000001 |
| [`nanoseconds`](/reference/chrono/duration_aliases.md) | 9 | 0.000000001 |
| [`duration`](/reference/chrono/duration.md)`<int,` [`ratio`](/reference/ratio/ratio.md)`<1, 2>>` | 1 | 0.5 |
| [`duration`](/reference/chrono/duration.md)`<int,` [`ratio`](/reference/ratio/ratio.md)`<1, 3>>` | 6 | 0.333333 |
| [`duration`](/reference/chrono/duration.md)`<int,` [`ratio`](/reference/ratio/ratio.md)`<1, 4>>` | 2 | 0.25 |
| [`duration`](/reference/chrono/duration.md)`<int,` [`ratio`](/reference/ratio/ratio.md)`<1, 5>>` | 1 | 0.2 |
| [`duration`](/reference/chrono/duration.md)`<int,` [`ratio`](/reference/ratio/ratio.md)`<1, 6>>` | 6 | 0.166666 |
| [`duration`](/reference/chrono/duration.md)`<int,` [`ratio`](/reference/ratio/ratio.md)`<1, 7>>` | 6 | 0.142857 |
| [`duration`](/reference/chrono/duration.md)`<int,` [`ratio`](/reference/ratio/ratio.md)`<1, 8>>` | 3 | 0.125 |
| [`duration`](/reference/chrono/duration.md)`<int,` [`ratio`](/reference/ratio/ratio.md)`<1, 9>>` | 6 | 0.111111 |
| [`duration`](/reference/chrono/duration.md)`<int,` [`ratio`](/reference/ratio/ratio.md)`<1, 10>>` | 1 | 0.1 |
| [`duration`](/reference/chrono/duration.md)`<int,` [`ratio`](/reference/ratio/ratio.md)`<756, 625>>` | 4 | 0.2096 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main() {
  std::cout << chrono::hh_mm_ss{0s} << std::endl;
  std::cout << chrono::hh_mm_ss{1ms} << std::endl;
  std::cout << chrono::hh_mm_ss{1ns} << std::endl;

  // 1/3秒単位
  std::cout << chrono::hh_mm_ss{chrono::duration<int, std::ratio<1, 3>>{1}} << std::endl;
}
```
* 1ms[link /reference/chrono/duration/op_ms.md]
* 1ns[link /reference/chrono/duration/op_ns.md]
* std::ratio[link /reference/ratio/ratio.md]

### 出力
```
00:00:00
00:00:00.001
00:00:00.000000001
00:00:00.333333
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0 [mark verified]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
