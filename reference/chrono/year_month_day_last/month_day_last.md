# month_day_last
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_day_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr chrono::month_day_last month_day_last() const noexcept; // (1) C++20
```
* chrono::month_day_last[link /reference/chrono/month_day_last.md]

## 概要
月の最終日要素を取得する。


## 戻り値
コンストラクタで設定されて保持している月の最終日オブジェクトを返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::year_month_day_last date = 2020y/2/chrono::last;
  chrono::month_day_last mdl = date.month_day_last();
  assert(mdl == chrono::February/chrono::last);
}
```
* date.month_day_last()[color ff0000]
* chrono::month_day_last[link /reference/chrono/month_day_last.md]
* 2020y[link /reference/chrono/year/op_y.md]
* chrono::February[link /reference/chrono/month_constants.md]
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
