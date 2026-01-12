# signbit
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  bool signbit(float x);            // (1) C++11からC++20まで
  bool signbit(double x);           // (2) C++11からC++20まで
  bool signbit(long double x);      // (3) C++11からC++20まで

  constexpr bool
    signbit(floating-point-type x); // (4) C++23

  bool
    signbit(Integral x);            // (5) C++11
  constexpr bool
    signbit(Integral x);            // (5) C++23
}
```
* Integral[italic]

## 概要
数値の符号が負であるか判定する。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)


## 戻り値
パラメータ`x`が負数である場合、`true`を返す。そうでない場合、`false`を返す。

この関数はその名前の通り、浮動小数点数の符号ビットを検出する。そのため、`NaN`の符号を検出することができる。  
他には[`std::copysign`](/reference/cmath/copysign.md)でも検出でき、この2つのみが`NaN`の符号を検出できる移植性のある方法となる。


## 備考
- C標準ライブラリでは`signbit`は関数マクロとして定義されるが、C++標準ライブラリでは関数として定義される
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <iostream>
#include <cmath>
#include <limits>

int main()
{
  // 通常の数値
  std::cout << std::boolalpha;
  std::cout << "-1.0f : " << std::signbit(-1.0f) << std::endl;
  std::cout << "-0.0f : " << std::signbit(-0.0f) << std::endl;

  std::cout << "1.0f  : " << std::signbit(1.0f) << std::endl;
  std::cout << "0.0f  : " << std::signbit(0.0f) << std::endl;

  // 無限大
  const double inf = std::numeric_limits<double>::infinity();
  std::cout << "inf   : " << std::signbit(inf) << std::endl;
  std::cout << "-inf  : " << std::signbit(-inf) << std::endl;

  // NaN (Not a Number)
  // NaNの符号ビットも検出できる
  const double nan = std::numeric_limits<double>::quiet_NaN();
  std::cout << "nan   : " << std::signbit(nan) << std::endl;
  std::cout << "-nan  : " << std::signbit(-nan) << std::endl;
}
```
* std::signbit[color ff0000]
* infinity()[link /reference/limits/numeric_limits/infinity.md]
* quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]

### 出力
```
-1.0f : true
-0.0f : true
1.0f  : false
0.0f  : false
inf   : false
-inf  : true
nan   : false
-nan  : true
```

### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
