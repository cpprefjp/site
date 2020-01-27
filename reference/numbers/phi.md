# phi
* numbers[meta header]
* std::numbers[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  inline constexpr T phi_v = unspecified;      // (1)

  template <floating_point T>
  inline constexpr T phi_v<T> = see below;     // (2)

  inline constexpr double phi = phi_v<double>; // (3)
}
```
* unspecified[italic]
* floating_point[link /reference/concepts/floating_point.md]

## 概要
黄金比φを表す定数。

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
  double a = std::numbers::phi;
  std::cout << a << std::endl;

  // 任意の浮動小数点数型の定数
  float b = std::numbers::phi_v<float>;
  std::cout << b << std::endl;
}
```
* std::numbers::phi[color ff0000]
* std::numbers::phi_v[color ff0000]

### 出力
```
1.61803
1.61803
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [三分探索と黄金分割探索 - naoya_t@hatenablog](https://naoyat.hatenablog.jp/entry/2012/01/04/231801)
