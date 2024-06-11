# operator precision
* chrono[meta header]
* std::chrono[meta namespace]
* hh_mm_ss[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr explicit operator precision() const noexcept; // (1) C++20
```

## 概要
時:分:秒、秒未満をもつ[`duration`](/reference/chrono/duration.md)オブジェクトに明示的に変換する。


## 戻り値
```cpp
return to_duration();
```
* to_duration()[link to_duration.md]


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::hh_mm_ss time1{15h + 30min + 20s};
  assert(chrono::seconds{time1} == 15h + 30min + 20s);

  chrono::hh_mm_ss time2{-(15h + 30min + 20s)};
  assert(chrono::seconds{time2} == -(15h + 30min + 20s));

  chrono::hh_mm_ss time3{15h + 30min + 20s + 123ms};
  assert(chrono::milliseconds{time3} == 15h + 30min + 20s + 123ms);
}
```
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
