# inv_sqrt3
* numbers[meta header]
* std::numbers[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::numbers {
  template <class T>
  inline constexpr T inv_sqrt3_v = unspecified;            // (1)

  template <floating_point T>
  inline constexpr T inv_sqrt3_v<T> = see below;           // (2)

  inline constexpr double inv_sqrt3 = inv_sqrt3_v<double>; // (3)
}
```
* unspecified[italic]
* see below[italic]
* floating_point[link /reference/concepts/floating_point.md]

## 概要
3の平方根の逆数 (inverse square root 3) である1/√3を表す定数。

- (1) : プライマリーテンプレート。これをインスタンス化するとプログラムは不適格となる
- (2) : 任意の浮動小数点数型`T`に対する定数定義。標準で定義される浮動小数点数型ごとの精度に応じた定数が定義される
- (3) : `double`型に対する定数定義


## 備考
- 1/√2を表す`inv_sqrt2`は定義されない。`inv_sqrt2`は[`sqrt2`](sqrt2.md)`/2`もしくは[`sqrt2`](sqrt2.md)から指数を1引けば精度の低下なく簡単に求められるが、`inv_sqrt3`は簡単ではないため、標準ライブラリでは`inv_sqrt3`のみが定義される
    ```cpp
    #include <iostream>
    #include <numbers>
    #include <cmath>

    int main() {
      // 除算で 1/√2を求める
      constexpr double r1 = std::numbers::sqrt2 / 2;
      std::cout << r1 << std::endl; // 0.707107

      // sqrt2から指数を1引くことで 1/√2を求める
      int exp = 0;
      double fraction = std::frexp(std::numbers::sqrt2, &exp);
      double r2 = std::ldexp(fraction, exp - 1);
      std::cout << r2 << std::endl; // 0.707107
    }
    ```
    * std::numbers::sqrt2[link sqrt2.md]
    * std::frexp[link /reference/cmath/frexp.md]
    * std::ldexp[link /reference/cmath/ldexp.md]


## 例
```cpp example
#include <iostream>
#include <numbers>
#include <cmath>

int main()
{
  // double型定数
  double a = std::numbers::inv_sqrt3;
  std::cout << a << std::endl;

  // 任意の浮動小数点数型の定数
  float b = std::numbers::inv_sqrt3_v<float>;
  std::cout << b << std::endl;

  // 動的に計算する
  double c = 1.0 / std::sqrt(3.0);
  std::cout << c << std::endl;
}
```
* std::numbers::inv_sqrt3[color ff0000]
* std::numbers::inv_sqrt3_v[color ff0000]
* std::sqrt[link /reference/cmath/sqrt.md]

### 出力
```
0.57735
0.57735
0.57735
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [Why isn't inv_sqrt2 defined in the C++ standard library? - Stackoverflow](https://stackoverflow.com/questions/61900861/why-isnt-inv-sqrt2-defined-in-the-c-standard-library)
