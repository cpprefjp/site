# operator-
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month operator-(const year_month& ym, const months& dm) noexcept; // (1) C++20
  constexpr year_month operator-(const year_month& ym, const years& dy) noexcept;  // (2) C++20
}
```

## 概要
`year_month`の減算を行う。

- (1) : `year_month`から月の時間間隔を減算する
- (2) : `year_month`から年の時間間隔を減算する


## 戻り値
- (1) : `return ym + (-dm);`
- (2) : `return ym + (-dy);`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  assert(2020y/3 - chrono::months{1} == 2020y/2);
  assert(2020y/3 - chrono::years{1} == 2019y/3);
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): 11.1
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
