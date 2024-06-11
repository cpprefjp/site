# operator unsigned int
* chrono[meta header]
* std::chrono[meta namespace]
* day[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr explicit operator unsigned int() const noexcept; // (1) C++20
```

## 概要
`day`オブジェクトを`unsigned int`型に明示的に変換する。


## 戻り値
- (1) : メンバ変数として保持している`unsigned int`型としての日の値を返す


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::day d{1};
  auto value = static_cast<unsigned int>(d);
  assert(value == 1);
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
