# operator<=>
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr strong_ordering
    operator<=>(const month_day_last& x,
                const month_day_last& y) noexcept; // (1) C++20
}
```

## 概要
`month_day_last`同士の三方比較を行う。


## 戻り値
- (1) :

```cpp
return x.month() <=> y.month();
```
* month()[link month.md]


## 例外
投げない


## 備考
- この演算子により、`operator<`、`operator<=`、`operator>`、`operator>=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  assert((March/last <=> March/last) == 0);

  assert(February/last < March/last);
  assert(February/last <= March/last);

  assert(March/last > February/last);
  assert(March/last >= February/last);
}
```
* March[link /reference/chrono/month_constants.md]
* February[link /reference/chrono/month_constants.md]
* last[link /reference/chrono/last_spec.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
