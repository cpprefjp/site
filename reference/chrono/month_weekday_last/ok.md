# ok
* chrono[meta header]
* std::chrono[meta namespace]
* month_weekday_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool ok() const noexcept; // (1) C++20
```

## 概要
`month_weekday_last`オブジェクトの値が有効な日付の範囲内かを判定する。


## 戻り値
以下の全ての条件を満たす場合にこの関数は`true`を返し、そうでなければ`false`を返す：

- [`month()`](month.md)`.`[`ok()`](/reference/chrono/month/ok.md) `== true`であること
- [`weekday_last()`](weekday_last.md)`.`[`ok()`](/reference/chrono/weekday_last/ok.md) `== true`であること


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert((chrono::March/chrono::Sunday[chrono::last]).ok()  == true);
}
```
* ok()[color ff0000]
* chrono::March[link /reference/chrono/month_constants.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::last[link /reference/chrono/last_spec.md]

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
