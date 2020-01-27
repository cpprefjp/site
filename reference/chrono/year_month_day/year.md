# year
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_day[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr chrono::year year() const noexcept; // (1) C++20
```
* chrono::year[link /reference/chrono/year.md]

## 概要
年要素を取得する。


## 戻り値
コンストラクタで�定されて保持している年オブジェクトを返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::year_month_day date = 2020y/3/1;
  chrono::year y = date.year();
  assert(y == 2020y);
}
```
* date.year()[color ff0000]
* chrono::year[link /reference/chrono/year.md]
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
