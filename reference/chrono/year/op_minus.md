# operator-
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year operator-(const year& x, const years& y) noexcept; // (1) C++20
  constexpr years operator-(const year& x, const year& y) noexcept; // (2) C++20
}
```

## 概要
`year`の減算を行う。

- (1) : `year`から時間間隔を減算する
- (2) : `year`同士の差を求める


## 戻り値
- (1) : `return x + -y;`
- (2) : `return years{static_cast<int>(x) - static_cast<int>(y)};`


## 例外
投げない


## 備考
- (2)は減算の結果として負数になる場合、負数として差が求まる


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert(chrono::year{2020} - chrono::years{3} == chrono::year{2017});
  assert(chrono::year{2020} - chrono::year{2017} == chrono::years{3});
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
