# operator-
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr month operator-(const month& x, const months& y) noexcept; // (1) C++20
  constexpr months operator-(const month& x, const month& y) noexcept; // (2) C++20
}
```

## 概要
`month`の減算を行う。

- (1) : `month`から時間間隔を減算する
- (2) : `month`同士の差を求める


## 戻り値
- (1) : `return x + -y;`
- (2) : `x.`[`ok()`](ok.md) `== true`かつ`y.`[`ok()`](ok.md) `== true`である場合、範囲`[months{0}, months{11}]`に収まるよう`x`と`y`の月の差を求めて返す。そうでなければ、未規定の値が返る


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert(chrono::March - chrono::months{2} == chrono::January);
  assert(chrono::March - chrono::February == chrono::months{1});

  assert(chrono::January - chrono::February == chrono::months{11});
}
```
* chrono::January[link /reference/chrono/month_constants.md]
* chrono::February[link /reference/chrono/month_constants.md]
* chrono::March[link /reference/chrono/month_constants.md]

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
