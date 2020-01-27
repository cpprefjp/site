# operator<=>
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr strong_ordering operator<=>(const year& x, const year& y) noexcept; // (1) C++20
}
```

## 概要
`year`同士の三方比較を行う。


## 戻り値
- (1) : `static_cast<int>(x) <=> static_cast<int>(y);`


## 例外
投げない


## 備考
- この演算�により、`operator<`、`operator<=`、`operator>`、`operator>=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert((chrono::year{2020} <=> chrono::year{2020}) == 0);

  assert(chrono::year{2019} < chrono::year{2020});
  assert(chrono::year{2019} <= chrono::year{2020});

  assert(chrono::year{2020} > chrono::year{2019});
  assert(chrono::year{2020} >= chrono::year{2019});
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
