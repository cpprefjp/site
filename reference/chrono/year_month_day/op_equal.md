# operator==
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr bool operator==(const year_month_day& x, const year_month_day& y) noexcept; // (1) C++20
}
```

## 概要
`year_month_day`同士の�値比較を行う。


## 戻り値
- (1) :

```cpp
return x.year() == y.year() && x.month() == y.month() && x.day() == y.day();
```
* year()[link year.md]
* month()[link month.md]
* day()[link day.md]


## 例外
投げない


## 備考
- この演算�により、`operator!=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono_literals;

int main()
{
  assert(2020y/3/1 == 2020y/3/1);
  assert(2020y/3/1 != 2020y/3/2);
}
```
* 2020y[link /reference/chrono/year/op_y.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
