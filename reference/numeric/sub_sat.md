# sub_sat
* numeric[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class T>
    constexpr T sub_sat(T x, T y) noexcept;
}
```

## 概要
飽和減算 `x - y` を計算する。


## テンプレートパラメータ制約
`T`は符号付き整数型または符号無し整数型であること。


## 戻り値
- 無限の範囲で計算した値`x - y`が型`T`で表現可能ならば、`x - y`を返す
- そうでないとき、型`T`で表現可能な最大値または最小値のうち`x - y`に近い方の値を返す


## 例外
投げない


## 例
```cpp example
#include <cstdint>
#include <numeric>
#include <print>

int main()
{
  // 3 - 1 = 2
  std::println("{}", std::sub_sat(3, 1));

  // 1 - 3 = -2 -> 0
  std::println("{}", std::sub_sat(1u, 3u));

  // -100 - 50 = -150 -> -128(-2**7)
  std::int8_t x = -100, y = 50;
  std::println("{}", std::sub_sat(x, y));
}
```
* std::sub_sat[color ff0000]

### 出力
```
2
0
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
