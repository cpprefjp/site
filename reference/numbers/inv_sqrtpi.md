# inv_sqrtpi
* numbers[meta header]
* std::numbers[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  inline constexpr T inv_sqrtpi_v = unspecified;             // (1)

  template <floating_point T>
  inline constexpr T inv_sqrtpi_v<T> = see below;            // (2)

  inline constexpr double inv_sqrtpi = inv_sqrtpi_v<double>; // (3)
}
```
* unspecified[italic]
* floating_point[link /reference/concepts/floating_point.md]

## 概要
円周率の平方根の逆数 (inverse square root pi) である1/√πを表す定数。

- (1) : プライマリーテンプレート。これをインスタンス化するとプ�グラムは不適格となる
- (2) : 任意の浮動小数点数型`T`に対する定数定義。標準で定義される浮動小数点数型ごとの精度に応じた定数が定義される
- (3) : `double`型に対する定数定義


## 例
```cpp example
#include <iostream>
#include <numbers>

int main()
{
  // double型定数
  double a = std::numbers::inv_sqrtpi;
  std::cout << a << std::endl;

  // 任意の浮動小数点数型の定数
  float b = std::numbers::inv_sqrtpi_v<float>;
  std::cout << b << std::endl;
}
```
* std::numbers::inv_sqrtpi[color ff0000]
* std::numbers::inv_sqrtpi_v[color ff0000]

### 出力
```
0.56419
0.56419
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): ??
