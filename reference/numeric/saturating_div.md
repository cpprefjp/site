# saturating_div
* numeric[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class T>
    constexpr T saturating_div(T x, T y) noexcept;
}
```

## 概要
飽和除算 `x / y` を計算する。


## テンプレートパラメータ制約
`T`は符号付き整数型または符号無し整数型であること。


## 事前条件
`y != 0`


## 戻り値
- `T`が符号付き整数型かつ`x ==` [`numeric_limits<T>::min()`](/reference/limits/numeric_limits/min.md) `&& y == -1`のとき、[`numeric_limits<T>::max()`](/reference/limits/numeric_limits/max.md)を返す
- そうでなければ、`x / y`を返す


## 例外
投げない


## 定数式に評価される条件
事前条件を満たすこと


## 例
```cpp example
#include <cstdint>
#include <numeric>
#include <print>

int main()
{
  // 10 / 3 = 3
  std::println("{}", std::saturating_div(10, 3));

  // -128 * -1 = 128 -> 127(2**7-1)
  std::int8_t x = -128, y = -1;
  std::println("{}", std::saturating_div(x, y));
}
```
* std::saturating_div[color ff0000]

### 出力
```
3
127
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0543R3 Saturation arithmetic](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p0543r3.html)
- [P4052R0 Renaming saturation arithmetic functions](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4052r0.html)
