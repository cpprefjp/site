# add_sat
* numeric[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class T>
    constexpr T add_sat(T x, T y) noexcept;
}
```

## 概要
飽和加算 `x + y` を計算する。


## テンプレートパラメータ制約
`T`は符号付き整数型または符号無し整数型であること。


## 戻り値
- 無限の範囲で計算した値`x + y`が型`T`で表現可能ならば、`x + y`を返す
- そうでないとき、型`T`で表現可能な最大値または最小値のうち`x + y`に近い方の値を返す


## 例外
投げない


## 例
```cpp example
#include <cstdint>
#include <numeric>
#include <print>

int main()
{
  // 1 + 2 = 3
  std::println("{}", std::add_sat(1, 2));

  // 200 + 200 = 400 -> 255(2**8-1)
  std::uint8_t x = 200;
  std::println("{}", std::add_sat(x, x));

  // -100 + -100 = -200 -> -128(-2**7)
  std::int8_t y = -100;
  std::println("{}", std::add_sat(y, y));
}
```
* std::add_sat[color ff0000]
* std::println[link /reference/print/println.md]

### 出力
```
3
255
-128
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
