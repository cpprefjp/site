# lround
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  long lround(float x);
  long lround(double x);
  long lround(long double x);

  long lround(Integral x);

  long int lroundf(float x);       // C++17 から
  long int lroundl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
引数 `x` を四捨五入により丸めた整数値を`long`型として得る。  
ここで引数 `x` の四捨五入とは、`x` を最も近い整数に丸めるが、`x` の小数部分が `0.5` の場合には、`x` の符号が�負のいずれであってもゼ�から遠い方向に丸めることを指す。  
具体例は下記の出力例を参照。


## 戻り値
引数 `x` を四捨五入により丸めた整数値を、`long`型の範囲に収めて返す。


## 備考
- 本関数は、C99 の規格にある `lround`（より�確には `math.h` ヘッダの `lround`、`lroundf`、`lroundl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と�価である。
- [`round`](round.md)関数と違い、本関数において戻り値が非整数型引数 `x` と異なる場合に、例外 [`FE_INEXACT`](/reference/cfenv/fe_inexact.md) を発生させる必要はない。
- 戻り値が`long`型の範囲を超えた場合、定義域エラーが起こる可能性がある。その際の挙動については、[`<cmath>`](../cmath.md) を参照。
- なお、本関数の挙動は、現在の丸めモードには依�しない。


## 例
```cpp example
#include <iostream>
#include <cmath>

void test(double x)
{
  long result = std::lround(x);
  std::cout << "lround(" << x << ") = " << result << std::endl;
}

int main()
{
  test(2.0);
  test(2.1);
  test(2.5);
  test(2.9);
  test(-2.0);
  test(-2.1);
  test(-2.5);
  test(-2.9);
}
```
* std::lround[color ff0000]

### 出力
```
lround(2) = 2
lround(2.1) = 2
lround(2.5) = 3
lround(2.9) = 3
lround(-2) = -2
lround(-2.1) = -2
lround(-2.5) = -3
lround(-2.9) = -3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

