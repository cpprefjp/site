# weekday_indexed
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr chrono::weekday_indexed weekday_indexed() const noexcept; // (1) C++20
```
* chrono::weekday_indexed[link /reference/chrono/weekday_indexed.md]

## 概要
N回目の曜日要素を取得する。


## 戻り値
コンストラクタで設定されて保持しているN回目の曜日オブジェクトを返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::year_month_weekday date = 2020y/3/chrono::Sunday[2];
  chrono::weekday_indexed wdi = date.weekday_indexed();
  assert(wdi == chrono::Sunday[2]);
}
```
* date.weekday_indexed()[color ff0000]
* chrono::weekday_indexed[link /reference/chrono/weekday_indexed.md]
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
