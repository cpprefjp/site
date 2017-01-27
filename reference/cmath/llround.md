#llround
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  long long llround(float x);

  long long llround(double x);

  long long llround(long double x);

  long long llround(Integral x);
}
```
* Integral[italic]

##概要
引数 `x` を四捨五入により丸めた整数値を[`long long`型](/lang/cpp11/long_long_type.md)として得る。  
ここで引数 `x` の四捨五入とは、`x` を最も近い整数に丸めるが、`x` の小数部分が `0.5` の場合には、`x` の符号が正負のいずれであってもゼロから遠い方向に丸めることを指す。  
具体例は下記の出力例を参照。


##戻り値
引数 `x` を四捨五入により丸めた整数値を、[`long long`型](/lang/cpp11/long_long_type.md)型の範囲に収めて返す。


##備考
- 本関数は、C99 の規格にある `llround`（より正確には `math.h` ヘッダの `llround`、`llroundf`、`llroundl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と同等である。
- [`round`](round.md)関数と違い、本関数において戻り値が非整数型引数 `x` と異なる場合に、例外 [`FE_INEXACT`](/reference/cfenv/fe_inexact.md) を発生させる必要はない。
- 戻り値が[`long long`型](/lang/cpp11/long_long_type.md)型の範囲を超えた場合、定義域エラーが起こる可能性がある。その際の挙動については、[`<cmath>`](../cmath.md) を参照。
- なお、本関数の挙動は、現在の丸めモードには依存しない。


##例
```cpp
#include <iostream>
#include <cmath>

void test(double x)
{
  long long result = std::llround(x);
  std::cout << "llround(" << x << ") = " << result << std::endl;
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
* std::llround[color ff0000]

###出力
```
llround(2) = 2
llround(2.1) = 2
llround(2.5) = 3
llround(2.9) = 3
llround(-2) = -2
llround(-2.1) = -2
llround(-2.5) = -3
llround(-2.9) = -3
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

