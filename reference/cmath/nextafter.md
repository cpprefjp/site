# nextafter
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float
    nextafter(float x,
              float y);               // (1) C++11からC++20まで
  double
    nextafter(double x,
              double y);              // (2) C++11からC++20まで
  long double
    nextafter(long double x,
              long double y);         // (3) C++11からC++20まで

  constexpr floating-point-type
    nextafter(floating-point-type x,
              floating-point-type y); // (4) C++23

  Promoted
    nextafter(Arithmetic1 x,
              Arithmetic2 y);         // (5) C++11
  constexpr Promoted
    nextafter(Arithmetic1 x,
              Arithmetic2 y);         // (5) C++23

  float
    nextafterf(float x,
               float y);              // (6) C++17
  constexpr float
    nextafterf(float x,
               float y);              // (6) C++23

  long double
    nextafterl(long double x,
               long double y);        // (7) C++17
  constexpr long double
    nextafterl(long double x,
               long double y);        // (7) C++23
}
```
* Arithmetic1[italic]
* Arithmetic2[italic]
* Promoted[italic]

## 概要
指定方向への次の表現可能な値を取得する。

この関数は、パラメータ`x`の値をパラメータ`y`の値の方向に対して、その環境で表現可能な最小の値だけ進める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 算術型に対するオーバーロード (大きい精度にキャストして計算される。整数は`double`で計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
パラメータ`x`の値をパラメータ`y`の方向に、表現可能な最小の値だけ進めた値を返す。

`x`と`y`が等値である場合、`y`を返す。

進めた結果が無限大、もしくは表現できない場合、値域エラーとなる。


## 備考
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <iostream>
#include <cmath>

int main()
{
  float result1 = std::nextafter(0.0f, 1.0f);
  std::cout << result1 << std::endl;

  float result2 = std::nextafter(0.0f, -1.0f);
  std::cout << result2 << std::endl;
}
```
* std::nextafter[color ff0000]

### 出力例
```
1.4013e-45
-1.4013e-45
```

### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
