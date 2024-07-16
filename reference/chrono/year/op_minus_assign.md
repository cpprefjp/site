# operator-=
* chrono[meta header]
* std::chrono[meta namespace]
* year[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr year& operator-=(const years& y) noexcept; // (1) C++20
```

## 概要
`year`の値に対して減算の複合代入を行う。

パラメータの型が、本クラスである`year`ではなく、年単位の時間間隔を表す[`years`](/reference/chrono/duration_aliases.md)であることに注意。


## 効果
- (1) : `*this = *this - y`


## 戻り値
- (1) : `*this`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::year y{2020};

  y -= chrono::years{3};
  assert(static_cast<int>(y) == 2017);
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
