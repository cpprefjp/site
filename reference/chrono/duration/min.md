# min
* chrono[meta header]
* std::chrono[meta namespace]
* duration[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr duration min();          // C++11
static constexpr duration min() noexcept; // C++20
```

## 概要
`rep`の最小値から成る`duration`を取得する

## 戻り値
`duration(`[`duration_values`](/reference/chrono/duration_values.md)`<rep>::`[`min()`](/reference/chrono/duration_values/min.md)`)`


## 例
```cpp example
#include <iostream>
#include <chrono>

using std::chrono::duration;
using std::micro;

int main()
{
  using microseconds = duration<int, micro>;

  microseconds m = microseconds::min();
  std::cout << m.count() << std::endl;
}
```
* min()[color ff0000]
* micro[link /reference/ratio/si_prefix.md]
* count()[link count.md]


### 出力例
```
-2147483648
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.5.1 [mark verified], 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [P0972R0 `<chrono>` `zero()`, `min()`, and `max()` should be `noexcept`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0972r0.pdf)
