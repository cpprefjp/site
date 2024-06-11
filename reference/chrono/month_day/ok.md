# ok
* chrono[meta header]
* std::chrono[meta namespace]
* month_day[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool ok() const noexcept; // (1) C++20
```

## 概要
`month_day`オブジェクトの値が有効な月日の範囲内かを判定する。


## 戻り値
以下の全ての条件を満たす場合にこの関数は`true`を返し、そうでなければ`false`を返す：

- [`month()`](month.md)`.`[`ok()`](/reference/chrono/month/ok.md) `== true`であること
- [`day()`](day.md)が返す値が、[`1d`](/reference/chrono/day/op_d.md)以上かつ[`month()`](month.md)の月の日数以下であること
    - [`month()`](month.md) `==` [`February`](/reference/chrono/month_constants.md)である場合、日数は29であるとみなされる


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert((chrono::March/1).ok()  == true);
  assert((chrono::March/31).ok() == true);
  assert((chrono::March/0).ok()  == false);
  assert((chrono::April/31).ok() == false);

  assert((chrono::February/28).ok() == true);
  assert((chrono::February/29).ok() == true);
}
```
* ok()[color ff0000]
* chrono::March[link /reference/chrono/month_constants.md]
* chrono::April[link /reference/chrono/month_constants.md]
* chrono::February[link /reference/chrono/month_constants.md]

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
