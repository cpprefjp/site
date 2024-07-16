# operator unsigned int
* chrono[meta header]
* std::chrono[meta namespace]
* month[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr explicit operator unsigned int() const noexcept; // (1) C++20
```

## 概要
`month`オブジェクトを`unsigned int`型に明示的に変換する。


## 戻り値
- (1) : メンバ変数として保持している`unsigned int`型としての月の値を返す


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto m = static_cast<unsigned int>(chrono::December);
  assert(m == 12);
}
```
* chrono::December[link /reference/chrono/month_constants.md]

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
