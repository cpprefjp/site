# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* hh_mm_ss[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr hh_mm_ss() noexcept
  : hh_mm_ss{Duration::zero()} {}        // (1) C++20

constexpr explicit hh_mm_ss(Duration d); // (2) C++20

hh_mm_ss(const hh_mm_ss&);               // (3) C++20
hh_mm_ss(hh_mm_ss&&);                    // (4) C++20
```
* zero()[link /reference/chrono/duration/zero.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 時間間隔を指定して時:分:秒、秒未満に分割する
- (3) : コピーコンストラクタ
- (4) : ムーブコンストラクタ


## 効果
- (1) : `Duration`型の値ゼロで時間を構築する
- (2) : `precision`型の精度で`Duration d`をもつ`hh_mm_ss`オブジェクトを構築する
    - `d < Duration::`[`zero()`](/reference/chrono/duration/zero.md)である場合、負の時間とみなし[`is_negative()`](is_negative.md)が`true`を返すようにする
    - [`duration_cast`](/reference/chrono/duration_cast.md)`<`[`chrono::hours`](/reference/chrono/duration_aliases.md)`>(`[`abs`](/reference/chrono/duration/abs.md)`(d))`で時を構築する
    - [`duration_cast`](/reference/chrono/duration_cast.md)`<`[`chrono::minutes`](/reference/chrono/duration_aliases.md)`>(`[`abs`](/reference/chrono/duration/abs.md)`(d) -` [`hours()`](hours.md)`)`で分を構築する
    - [`duration_cast`](/reference/chrono/duration_cast.md)`<`[`chrono::seconds`](/reference/chrono/duration_aliases.md)`>(`[`abs`](/reference/chrono/duration/abs.md)`(d) -` [`hours()`](hours.md) `-` [`minutes()`](minutes.md)`)`で秒を構築する
    - [`treat_as_floating_point_v`](/reference/chrono/treat_as_floating_point.md)`<precision::rep>`が`true`である場合、秒未満は[`abs`](/reference/chrono/duration/abs.md)`(d) -` [`hours()`](hours.md) `-` [`minutes()`](minutes.md) `-` [`seconds()`](seconds.md)で構築する。そうでなければ、[`duration_cast`](/reference/chrono/duration_cast.md)`<precision>(`[`abs`](/reference/chrono/duration/abs.md)`(d) -` [`hours()`](hours.md) `-` [`minutes()`](minutes.md) `-` [`seconds()`](seconds.md)`)`で秒未満を構築する


## 事後条件
- (2) : [`treat_as_floating_point_v`](/reference/chrono/treat_as_floating_point.md)`<precision::rep>`が`true`である場合、[`to_duration()`](to_duration.md)は`d`を返し、そうでなければ[`to_duration()`](to_duration.md)は[`duration_cast`](/reference/chrono/duration_cast.md)`<precision>(d)`を返す


## 備考
- (2) : `precision::rep`が整数型で、`precision::period`が[`ratio`](/reference/ratio/ratio.md)`<1>`である場合、[`subseconds()`](subseconds.md)は常に[`0s`](/reference/chrono/duration/op_s.md)となる


### 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::hh_mm_ss time1{15h + 30min + 20s};
  assert(time1.is_negative() == false);
  assert(time1.hours() == 15h);
  assert(time1.minutes() == 30min);
  assert(time1.seconds() == 20s);
  assert(time1.subseconds() == 0s);

  // 負の時間
  chrono::hh_mm_ss time2{-(15h + 30min + 20s)};
  assert(time2.is_negative() == true);
  assert(time2.hours() == 15h);
  assert(time2.minutes() == 30min);
  assert(time2.seconds() == 20s);
  assert(time2.subseconds() == 0s);

  // 秒未満をもつ時間
  chrono::hh_mm_ss time3{15h + 30min + 20s + 123ms};
  assert(time3.is_negative() == false);
  assert(time3.hours() == 15h);
  assert(time3.minutes() == 30min);
  assert(time3.seconds() == 20s);
  assert(time3.subseconds() == 123ms);
}
```
* 15h[link /reference/chrono/duration/op_h.md]
* 30min[link /reference/chrono/duration/op_min.md]
* 20s[link /reference/chrono/duration/op_s.md]
* 0s[link /reference/chrono/duration/op_s.md]
* 123ms[link /reference/chrono/duration/op_ms.md]
* is_negative()[link is_negative.md]
* hours()[link hours.md]
* minutes()[link minutes.md]
* seconds()[link seconds.md]
* subseconds()[link subseconds.md]

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

