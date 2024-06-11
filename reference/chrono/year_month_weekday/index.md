# index
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr unsigned int index() const noexcept; // (1) C++20
```

## 概要
何回目の曜日かを取得する。


## 戻り値
以下と等価：

```cpp
return weekday_indexed().index();
```
* weekday_indexed()[link weekday_indexed.md]
* index()[link /reference/chrono/weekday_indexed/index.md]


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::year_month_weekday date = 2020y/3/chrono::Sunday[2];
  unsigned int i = date.index();
  assert(i == 2);
}
```
* date.index()[color ff0000]
* 2020y[link /reference/chrono/year/op_y.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]

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
