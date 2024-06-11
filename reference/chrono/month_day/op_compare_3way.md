# operator<=>
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr strong_ordering operator<=>(const month_day& x, const month_day& y) noexcept; // (1) C++20
}
```

## 概要
`month_day`同士の三方比較を行う。


## 戻り値
- (1) : 以下と等価：

```cpp
if (auto c = x.month() <=> y.month(); c != 0) return c;
return x.day() <=> y.day();
```
* month()[link month.md]
* day()[link day.md]


## 例外
投げない


## 備考
- この演算子により、`operator<`、`operator<=`、`operator>`、`operator>=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert((chrono::March/1 <=> chrono::March/1) == 0);

  assert(chrono::March/1 < chrono::March/2);
  assert(chrono::March/1 <= chrono::March/2);

  assert(chrono::March/2 > chrono::March/1);
  assert(chrono::March/2 >= chrono::March/1);
}
```
* chrono::March[link /reference/chrono/month_constants.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
