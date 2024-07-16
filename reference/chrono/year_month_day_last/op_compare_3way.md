# operator<=>
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr strong_ordering
    operator<=>(const year_month_day_last& x,
                const year_month_day_last& y) noexcept; // (1) C++20
}
```

## 概要
`year_month_day_last`同士の三方比較を行う。


## 戻り値
- (1) : 以下と等価：

```cpp
if (auto c = x.year() <=> y.year(); c != 0) return c;
return x.month_day_last() <=> y.month_day_last();
```
* year()[link year.md]
* month_day_last()[link month_day_last.md]


## 例外
投げない


## 備考
- この演算子により、`operator<`、`operator<=`、`operator>`、`operator>=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <chrono>

using std::chrono::last;
using namespace std::chrono_literals;

int main()
{
  assert((2020y/3/last <=> 2020y/3/last) == 0);

  assert(2020y/2/last < 2020y/3/last);
  assert(2020y/2/last <= 2020y/3/last);

  assert(2020y/3/last > 2020y/2/last);
  assert(2020y/3/last >= 2020y/2/last);
}
```
* 2020y[link /reference/chrono/year/op_y.md]
* last[link /reference/chrono/last_spec.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
