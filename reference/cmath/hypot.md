#hypot
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float hypot(float x, float y);

  double hypot(double x, double y);

  long double hypot(long double x, long double y);

  Promoted hypot(Arithmetic1 x, Arithmetic2 y);
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

##概要
算術型の平方和の平方根を求める。この際、余計なオーバーフロー、アンダーフローを起こさない。hypot は hypotenuse（（直角三角形の）斜辺）の略。


##戻り値
引数 `x` と引数 `y` の平方和の平方根を返す。

オーバーフローエラー、アンダーフローエラーが発生する可能性がある。


##備考
- $$ f(x, y) = \sqrt{x^2 + y^2} $$
- 概要の「余計なオーバーフロー、アンダーフローを起こさない」とは、たとえ <code>x<sup>2</sup></code> が戻り値型の範囲を超えていても、結果が戻り値型の範囲に収まるのであればオーバーフローしないで正しい結果を返す、と言う事である。
- オーバーフローエラー、アンダーフローエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `hypot(x, y)` と `hypot(y, x)` と `hypot(x, -y)` は同一である。
	- `hypot(x, ±0)` は、[`fabs`](fabs.md)`(x)` と同一である。
	- `hypot(±∞, y)` の戻り値は、たとえ `y` が NaN の場合でも `+∞` となる。


##例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "hypot(0.0, 0.0)  = " << std::hypot(0.0, 0.0) << std::endl;
  std::cout << "hypot(1.0, 1.0)  = " << std::hypot(1.0, 1.0) << std::endl;
  std::cout << "hypot(3.0, 4.0)  = " << std::hypot(3.0, 4.0) << std::endl;
  std::cout << "hypot(+∞, NaN)   = " << std::hypot(std::numeric_limits<double>::infinity(),
                                                   std::numeric_limits<double>::quiet_NaN())
            << std::endl;
}
```
* std::fixed[link ../ios/fixed.md]
* std::hypot[color ff0000]
* std::numeric_limits[link ../limits/numeric_limits.md]
* infinity[link ../limits/numeric_limits/infinity.md]
* quiet_NaN[link ../limits/numeric_limits/quiet_nan.md]

###出力
```
hypot(0.0, 0.0)  = 0.000000
hypot(1.0, 1.0)  = 1.414214
hypot(3.0, 4.0)  = 5.000000
hypot(+∞, NaN)   = inf
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 2.9, 3.1
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0, 14.1
	- 7.0, 7.1, 8.0, 9.0, 10.0およびそれ以降では、`<math.h>`でグローバル名前空間に以下が定義されている。
		- 仮引数・戻り値が`float`型の`_hypotf`関数が定義されている。
		- 仮引数・戻り値が`double`型の`hypot`関数と`_hypot`関数が定義されている。
		- 仮引数・戻り値が`long double`型の`_hypotl`マクロが定義されている。
	- 10.0, 11.0およびそれ以降では、上記に加え`<math.h>`でグローバル名前空間に以下が定義されている。
		- 仮引数・戻り値が`float`型の`hypotf`関数が定義されている。
		- 仮引数・戻り値が`long double`型の`hypotl`マクロが定義されている。
	- 12.0以降、`_hypotl`と`hypotl`は関数として定義されている。

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##実装例
[`fabs`](fabs.md) と [`sqrt`](sqrt.md) があれば、以下のように変換しても求められる。

$$ \sqrt{x^2 + y^2} = \left| u \right| \sqrt{1 + \left( \frac{v}{u} \right)^2} \quad \mathrm{for~all} \; (x, y), \; u = \max(|x|, |y|), \; v = \min(|x|, |y|) $$
