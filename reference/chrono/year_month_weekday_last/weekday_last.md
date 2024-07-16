# weekday_last
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_weekday_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr chrono::weekday_last weekday_last() const noexcept; // (1) C++20
```
* chrono::weekday_last[link /reference/chrono/weekday_last.md]

## 概要
月の最終曜日要素を取得する。


## 戻り値
コンストラクタで設定されて保持している最終曜日オブジェクトを返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::year_month_weekday_last date = 2020y/3/chrono::Sunday[chrono::last];
  chrono::weekday_last wdl = date.weekday_last();
  assert(wdl == chrono::Sunday[chrono::last]);
}
```
* date.weekday_last()[color ff0000]
* chrono::weekday_last[link /reference/chrono/weekday_last.md]
* 2020y[link /reference/chrono/year/op_y.md]
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
