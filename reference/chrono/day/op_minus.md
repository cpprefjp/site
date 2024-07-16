# operator-
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr day operator-(const day& x, const days& y) noexcept; // (1) C++20
  constexpr days operator-(const day& x, const day& y) noexcept; // (2) C++20
}
```

## 概要
`day`の減算を行う。

- (1) : `day`から時間間隔を減算する
- (2) : `day`同士の差を求める


## 戻り値
- (1) : `return x + -y;`
- (2) : `return days{static_cast<int>(static_cast<unsigned int>(x)) - static_cast<int>(static_cast<unsigned int>(y))};`


## 例外
投げない


## 備考
- [`month`](/reference/chrono/month.md)や[`weekday`](/reference/chrono/weekday.md)と違い、`[1, 31]`の範囲では循環しない
- (2)は減算の結果として負数になる場合、負数として差が求まる


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert(chrono::day{31} - chrono::days{2} == chrono::day{29});
  assert(chrono::day{1} - chrono::day{3} == chrono::days{-2});
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
