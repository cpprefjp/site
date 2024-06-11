# operator<=>
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr strong_ordering operator<=>(const year_month& x, const year_month& y) noexcept; // (1) C++20
}
```

## 概要
`year_month`同士の三方比較を行う。


## 戻り値
- (1) : 以下と等価：

```cpp
if (auto c = x.year() <=> y.year(); c != 0) return c;
return x.month() <=> y.month();
```
* year()[link year.md]
* month()[link month.md]


## 例外
投げない


## 備考
- この演算子により、`operator<`、`operator<=`、`operator>`、`operator>=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono_literals;

int main()
{
  assert((2020y/3 <=> 2020y/3) == 0);

  assert(2020y/2 < 2020y/3);
  assert(2020y/2 <= 2020y/3);

  assert(2020y/3 > 2020y/2);
  assert(2020y/3 >= 2020y/2);
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
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
