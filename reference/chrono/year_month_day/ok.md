# ok
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_day[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool ok() const noexcept; // (1) C++20
```

## 概要
`year_month_day`オブジェクトの値が有効な日付の範囲内かを判定する。


## 戻り値
以下の全ての条件を満たす場合にこの関数は`true`を返し、そうでなければ`false`を返す：

- [`year()`](year.md)メンバ関数によって返されるオブジェクト`y`の[`ok()`](/reference/chrono/year/ok.md)が`true`
- [`month()`](month.md)メンバ関数によって返されるオブジェクト`m`の[`ok()`](/reference/chrono/month/ok.md)が`true`
- [`day()`](day.md)メンバ関数によって返されるオブジェクトの値が`[1d, (y/m/`[`last`](/reference/chrono/last_spec.md)`).`[`day()`](day.md)`]`の範囲内であること


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  assert((2020y/3/1).ok()  == true);
  assert((2020y/2/28).ok() == true);
  assert((2020y/2/30).ok() == false);
  assert((2021y/2/29).ok() == false);
}
```
* ok()[color ff0000]

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
