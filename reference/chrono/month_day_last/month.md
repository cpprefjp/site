# month
* chrono[meta header]
* std::chrono[meta namespace]
* month_day_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr chrono::month month() const noexcept; // (1) C++20
```
* chrono::month[link /reference/chrono/month.md]

## 概要
月要素を取得する。


## 戻り値
コンストラクタで設定されて保持している月オブジェクトを返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::month_day_last mdl = chrono::March/chrono::last;

  chrono::month m = mdl.month();
  assert(m == chrono::March);
}
```
* mdl.month()[color ff0000]
* chrono::month[link /reference/chrono/month.md]
* chrono::March[link /reference/chrono/month_constants.md]
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
