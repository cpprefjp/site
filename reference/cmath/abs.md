# abs
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float abs(float x);                       // (1) C++03からC++20まで

  double abs(double x);                     // (2) C++03からC++20まで

  long double abs(long double x);           // (3) C++03からC++20まで

  constexpr floating-point-type
    abs(floating-point-type x);             // (4) C++23

  double abs(Integral x);                   // (5) C++11 から C++14 まで

  int abs(int x);                           // (6) C++17
  constexpr int abs(int x);                 // (6) C++23

  long abs(long int x);                     // (7) C++17
  constexpr long abs(long int x);           // (7) C++23

  long long abs(long long x);               // (8) C++17
  constexpr long long abs(long long x);     // (8) C++23
}
```
* Integral[italic]

## 概要
浮動小数点数型の絶対値を求める。abs は absolute value（絶対値）の略。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `int`に対するオーバーロード
- (7) : `long int`に対するオーバーロード
- (8) : `long long`に対するオーバーロード


## 戻り値
引数 `x` の絶対値を返す。

- (1),(2),(3),(4) : `x` が `±∞` だった場合 `+∞` を返す。


## 備考
- $$ f(x) = | x | $$
- 任意の整数型に対するオーバーロード(5)は C++11 で追加されたが、[一部の符号なし整数型に対して問題を引き起こす](http://wg21.cmeerw.net/lwg/issue2192)ことから C++17 で削除され、符号付き整数型に対するオーバーロード(6),(7),(8)が追加された
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "abs(1.5)  = " << std::abs(1.5) << std::endl;
  std::cout << "abs(-1.5) = " << std::abs(-1.5) << std::endl;
}
```
* std::abs[color ff0000]
* std::fixed[link /reference/ios/fixed.md]

### 出力
```
abs(1.5)  = 1.500000
abs(-1.5) = 1.500000
```

### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## 実装例
```cpp
namespace std {
  constexpr float abs(float x) {
    return x < 0 ? -x : x;
  }

  constexpr double abs(double x) {
    return x < 0 ? -x : x;
  }

  constexpr long double abs(long double x) {
    return x < 0 ? -x : x;
  }
}
```


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
