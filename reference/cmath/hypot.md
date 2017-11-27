# hypot
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float hypot(float x, float y);                                  // (1)
  double hypot(double x, double y);                               // (2)
  long double hypot(long double x, long double y);                // (3)

  Promoted hypot(Arithmetic1 x, Arithmetic2 y);                   // (4)

  float hypotf(float x, float y);                                 // (5) C++17 から
  long double hypotl(long double x, long double y);               // (6) C++17 から

  double hypot(double x, double y, double z);                     // (7) C++17 から
  float hypot(float x, float y, float z);                         // (8) C++17 から
  long double hypot(long double x, long double y, long double z); // (9) C++17 から

  Promoted hypot(Arithmetic1 x, Arithmetic2 y, Arithmetic2 z);    // (10) C++17 から
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]
* Arithmetic3[italic]

## 概要
算術型の平方和の平方根を求める。この際、余計なオーバーフロー、アンダーフローを起こさない。hypot は hypotenuse（（直角三角形の）斜辺）の略。

この関数は、「三平方の定理」によって、直角三角形の斜辺の長さを求めるために使用できる。直角三角形において、直角に隣接する辺aとb、および斜辺cがあったとき、辺の長さは、三平方の定理によって以下の関係が成り立つ：

<code>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></code>

この関数の効果である以下の式は、三平方の定理の式変形である：

$$ f(x, y) = \sqrt{x^2 + y^2} $$

<code>a<sup>2</sup> + b<sup>2</sup></code>は<code>c<sup>2</sup></code>と等しくなるため、2乗の和に対する平方根を求めることで、斜辺cの長さが求まる。つまり、この関数に引数として、直角に隣接する辺aとbの長さを与えることで、戻り値として斜辺cの長さが返される。

各オーバーロードの概要は、以下の通りである：

- (1) : `double`型について、2引数の平方和の平方根を求める
- (2) : `float`型について、2引数の平方和の平方根を求める
- (3) : `long double`型について、2引数の平方和の平方根を求める
- (4) : 浮動小数点数型以外の算術型について、2引数の平方和の平方根を求める
- (5) : `float`型について、2引数の平方和の平方根を求める
- (6) : `long double`型について、2引数の平方和の平方根を求める
- (7) : `double`型について、3引数の平方和の平方根を求める
- (8) : `float`型について、3引数の平方和の平方根を求める
- (9) : `long double`型について、3引数の平方和の平方根を求める
- (10) : 浮動小数点数型以外の算術型について、3引数の平方和の平方根を求める


## 戻り値
- (1)-(6) : 引数 `x` と引数 `y` の平方和の平方根を返す。
- (7)-(10) : 引数 `x` 、引数 `y` 、引数 `z` の平方和の平方根を返す。

オーバーフローエラー、アンダーフローエラーが発生する可能性がある。


## 備考
- (1)-(6) : $$ f(x, y) = \sqrt{x^2 + y^2} $$
- (7)-(10) : $$ f(x, y, z) = \sqrt{x^2 + y^2 + z^2} $$
- 概要の「余計なオーバーフロー、アンダーフローを起こさない」とは、たとえ <code>x<sup>2</sup></code> が戻り値型の範囲を超えていても、結果が戻り値型の範囲に収まるのであればオーバーフローしないで正しい結果を返す、と言う事である。
- オーバーフローエラー、アンダーフローエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `hypot(x, y)` と `hypot(y, x)` と `hypot(x, -y)` は同一である。
	- `hypot(x, ±0)` は、[`fabs`](fabs.md)`(x)` と同一である。
	- `hypot(±∞, y)` の戻り値は、たとえ `y` が NaN の場合でも `+∞` となる。


## 例
### 基本的な使い方
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  // 2引数版
  std::cout << std::fixed;
  std::cout << "hypot(0.0, 0.0)  = " << std::hypot(0.0, 0.0) << std::endl;
  std::cout << "hypot(1.0, 1.0)  = " << std::hypot(1.0, 1.0) << std::endl;
  std::cout << "hypot(3.0, 4.0)  = " << std::hypot(3.0, 4.0) << std::endl;
  std::cout << "hypot(+∞, NaN)   = " << std::hypot(std::numeric_limits<double>::infinity(),
                                                   std::numeric_limits<double>::quiet_NaN())
            << std::endl;

  // 3引数版
  std::cout << "hypot(3.0, 4.0, 2.0) = " << std::hypot(3.0, 4.0, 2.0) << std::endl;
}
```
* std::fixed[link ../ios/fixed.md]
* std::hypot[color ff0000]
* std::numeric_limits[link ../limits/numeric_limits.md]
* infinity[link ../limits/numeric_limits/infinity.md]
* quiet_NaN[link ../limits/numeric_limits/quiet_nan.md]

#### 出力
```
hypot(0.0, 0.0)  = 0.000000
hypot(1.0, 1.0)  = 1.414214
hypot(3.0, 4.0)  = 5.000000
hypot(+∞, NaN)   = inf
hypot(3.0, 4.0, 2.0) = 5.385165
```

### ベクトルの長さを求める
```cpp example
#include <iostream>
#include <cmath>

// 2次元ベクトル
struct Vector2 {
  double x = 0;
  double y = 0;

  // ベクトルの長さ。
  // ノルム (norm) とも呼ばれる
  double length() const
  {
    return std::hypot(x, y);
  }
};

// 3次元ベクトル
struct Vector3 {
  double x = 0;
  double y = 0;
  double z = 0;

  double length() const
  {
    return std::hypot(x, y, z);
  }
};

int main()
{
  std::cout << Vector2{3.0, 3.0}.length() << std::endl;
  std::cout << Vector3{3.0, 2.0, 4.0}.length() << std::endl;
}
```
* std::hypot[color ff0000]

#### 出力
```
4.24264
5.38516
```

## バージョン
### 言語
- C++11

### 処理系
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

#### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


## 実装例
[`fabs`](fabs.md) と [`sqrt`](sqrt.md) があれば、以下のように変換しても求められる。

$$ \sqrt{x^2 + y^2} = \left| u \right| \sqrt{1 + \left( \frac{v}{u} \right)^2} \quad \mathrm{for~all} \; (x, y), \; u = \max(|x|, |y|), \; v = \min(|x|, |y|) $$


## 参照
- [P0030R1 Proposal to Introduce a 3-Argument Overload to `std::hypot`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0030r1.pdf)
