# e
* numbers[meta header]
* std::numbers[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::numbers {
  template <class T>
  inline constexpr T e_v = unspecified;    // (1)

  template <floating_point T>
  inline constexpr T e_v<T> = see below;   // (2)

  inline constexpr double e = e_v<double>; // (3)
}
```
* unspecified[italic]
* see below[italic]
* floating_point[link /reference/concepts/floating_point.md]

## 概要
自然対数の底であるネイピア数を表す定数。

- (1) : プライマリーテンプレート。これをインスタンス化するとプログラムは不適格となる
- (2) : 任意の浮動小数点数型`T`に対する定数定義。標準で定義される浮動小数点数型ごとの精度に応じた定数が定義される
- (3) : `double`型に対する定数定義


## 例
```cpp example
#include <iostream>
#include <numbers>

int main()
{
  // double型定数
  double a = std::numbers::e;
  std::cout << a << std::endl;

  // 任意の浮動小数点数型の定数
  float b = std::numbers::e_v<float>;
  std::cout << b << std::endl;
}
```
* std::numbers::e[color ff0000]
* std::numbers::e_v[color ff0000]

### 出力
```
2.71828
2.71828
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
