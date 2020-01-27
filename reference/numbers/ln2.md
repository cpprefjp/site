# ln2
* numbers[meta header]
* std::numbers[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  inline constexpr T ln2_v = unspecified;      // (1)

  template <floating_point T>
  inline constexpr T ln2_v<T> = see below;     // (2)

  inline constexpr double ln2 = ln2_v<double>; // (3)
}
```
* unspecified[italic]
* floating_point[link /reference/concepts/floating_point.md]

## 概要
2の自然対数である[`log`](/reference/cmath/log.md)`(2)`を表す定数。

- (1) : プライマリーテンプレート。これをインスタンス化するとプ�グラムは不適格となる
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
  double a = std::numbers::ln2;
  std::cout << a << std::endl;

  // 任意の浮動小数点数型の定数
  float b = std::numbers::ln2_v<float>;
  std::cout << b << std::endl;

  // 動的に計算する
  double c = std::log(2.0);
  std::cout << c << std::endl;
}
```
* std::numbers::ln2[color ff0000]
* std::numbers::ln2_v[color ff0000]
* std::log[link /reference/cmath/log.md]

### 出力
```
0.693147
0.693147
0.693147
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): ??
