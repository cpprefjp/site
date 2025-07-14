# pi
* numbers[meta header]
* std::numbers[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::numbers {
  template <class T>
  inline constexpr T pi_v = unspecified;     // (1)

  template <floating_point T>
  inline constexpr T pi_v<T> = see below;    // (2)

  inline constexpr double pi = pi_v<double>; // (3)
}
```
* unspecified[italic]
* floating_point[link /reference/concepts/floating_point.md]

## 概要
円周率πを表す定数。

- (1) : プライマリーテンプレート。これをインスタンス化するとプログラムは不適格となる
- (2) : 任意の浮動小数点数型`T`に対する定数定義。標準で定義される浮動小数点数型ごとの精度に応じた定数が定義される
- (3) : `double`型に対する定数定義


## 例
```cpp example
#include <iostream>
#include <numbers>
#include <cmath>

int main()
{
  // double型定数
  double a = std::numbers::pi;
  std::cout << a << std::endl;

  // 任意の浮動小数点数型の定数
  float b = std::numbers::pi_v<float>;
  std::cout << b << std::endl;

  // 動的に計算する
  double c = std::acos(-1.0);
  std::cout << c << std::endl;
}
```
* std::numbers::pi[color ff0000]
* std::numbers::pi_v[color ff0000]
* std::acos[link /reference/cmath/acos.md]

### 出力
```
3.14159
3.14159
3.14159
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 11 [mark verified]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 5 [mark verified]
