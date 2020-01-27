# complex
* complex[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T>
  class complex;
}
```

`<complex>`ヘッダでは、複素数を扱うクラスおよび関数を定義する。


`complex`クラステンプレートは、複素数を表すクラスである。このクラスは、実部(real part)と虚部(imaginary part)を、それぞれ型`T`の値として保持し、演算に使用する。

`complex`クラステンプレートは以下の型で特殊化され、特化した実装が行われる：

- `float`
- `double`
- `long double`

これ以外の型がテンプレート引数として与えられた場合、その動作は未規定である。


### 配列への�ャスト(C++11)

`complex`クラスの左辺値オブジェクト`c`は、`reinterpret_cast<cv修飾 T(&)[2]>(c)`もしくは`reinterpret_cast<cv修飾 T*>(&c)`で浮動小数点数型の配列に�ャスト可能である。その場合、配列の`0`番目は実部を表し、`1`番目は虚部を表す。


## メンバ関数

| 名前                                          | 説明                           | 対応バージョン |
|-----------------------------------------------|--------------------------------|----------------|
| [`(constructor)`](complex/op_constructor.md)  | コンストラクタ                 |                |
| `~complex() = default;`                       | デストラクタ                   |                |
| [`real`](complex/real.md)                     | 複素数値の実部を取得／�定する |                |
| [`imag`](complex/imag.md)                     | 複素数値の虚部を取得／�定する |                |
| [`operator=`](complex/op_assign.md)           | 複素数値のコピー               |                |
| [`operator+=`](complex/op_plus_assign.md)     | 複素数値の加算                 |                |
| [`operator-=`](complex/op_minus_assign.md)    | 複素数値の減算                 |                |
| [`operator*=`](complex/op_multiply_assign.md) | 複素数値の乗算                 |                |
| [`operator/=`](complex/op_divide_assign.md)   | 複素数値の除算                 |                |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|------|----------------|
| `value_type` | 実部と虚部およびそれらの演算に使用する浮動小数点数型。テンプレートパラメータの型`T`。 | |


## 非メンバ関数
### 複素数の値

| 名前                           | 説明                         | 対応バージョン |
|--------------------------------|------------------------------|----------------|
| [`real`](complex/real_free.md) | 実部を取得する               |                |
| [`imag`](complex/imag_free.md) | 虚部を取得する               |                |
| [`abs`](complex/abs.md)        | 複素数の絶対値を得る         |                |
| [`arg`](complex/arg.md)        | 複素数の偏角を得る           |                |
| [`norm`](complex/norm.md)      | 複素数体のノルムを得る       |                |
| [`conj`](complex/conj.md)      | 共役複素数を得る             |                |
| [`proj`](complex/proj.md)      | リーマン球面への射影を得る   | C++11          |
| [`polar`](complex/polar.md)    | 複素数を極形式で指定して作る |                |


### 演算�

| 名前                                            | 説明                                          | 対応バージョン |
|-------------------------------------------------|-----------------------------------------------|----------------|
| [`operator+` (単項)](complex/op_unary_plus.md)  | 単項 `+` 演算（引数をそのまま返す）           |                |
| [`operator-` (単項)](complex/op_unary_minus.md) | 単項 `-` 演算（符号を反転した複素数値を得る） |                |
| [`operator+`](complex/op_plus.md)               | `complex` オブジェクトを加算する              |                |
| [`operator-`](complex/op_minus.md)              | `complex` オブジェクトを減算する              |                |
| [`operator*`](complex/op_multiply.md)           | `complex` オブジェクトを乗算する              |                |
| [`operator/`](complex/op_divide.md)             | `complex` オブジェクトを除算する              |                |
| [`operator==`](complex/op_equal.md)             | `complex` オブジェクトを�値比較する          |                |
| [`operator!=`](complex/op_not_equal.md)         | `complex` オブジェクトを非�値比較する        |                |
| [`operator<<`](complex/op_ostream.md)           | ストリームへの出力                            |                |
| [`operator>>`](complex/op_istream.md)           | ストリームからの入力                          |                |


### リテラル

| 名前                     | 説明                             | 対応バージョン |
|--------------------------|----------------------------------|----------------|
| [`i`](complex/op_i.md)   | `complex<double>`のリテラル      | C++14          |
| [`if`](complex/op_if.md) | `complex<float>`のリテラル       | C++14          |
| [`il`](complex/op_il.md) | `complex<long double>`のリテラル | C++14          |


### 数�関数の`complex`に対するオーバー�ード

| 名前                        | 説明                                      | 対応バージョン |
|-----------------------------|-------------------------------------------|----------------|
| [`acos`](complex/acos.md)   | 複素数の逆余弦を求める                    | C++11          |
| [`asin`](complex/asin.md)   | 複素数の逆�弦を求める                    | C++11          |
| [`atan`](complex/atan.md)   | 複素数の逆�接を求める                    | C++11          |
| [`acosh`](complex/acosh.md) | 複素数の双曲線逆余弦を求める              | C++11          |
| [`asinh`](complex/asinh.md) | 複素数の双曲線逆�弦を求める              | C++11          |
| [`atanh`](complex/atanh.md) | 複素数の双曲線逆�接を求める              | C++11          |
| [`cos`](complex/cos.md)     | 複素数の余弦を求める                      |                |
| [`cosh`](complex/cosh.md)   | 複素数の双曲線余弦を求める                |                |
| [`exp`](complex/exp.md)     | 自然対数の底 e の累乗（複素数）を求める。 |                |
| [`log`](complex/log.md)     | 複素数の自然対数を求める                  |                |
| [`log10`](complex/log10.md) | 複素数の常用対数を求める                  |                |
| [`pow`](complex/pow.md)     | 複素数の累乗を求める                      |                |
| [`sin`](complex/sin.md)     | 複素数の�弦を求める                      |                |
| [`sinh`](complex/sinh.md)   | 複素数の双曲線�弦を求める                |                |
| [`sqrt`](complex/sqrt.md)   | 複素数の平方根を求める                    |                |
| [`tan`](complex/tan.md)     | 複素数の�接を求める                      |                |
| [`tanh`](complex/tanh.md)   | 複素数の双曲線�接を求める                |                |


## 例
```cpp example
#include <iostream>
#include <complex>

float pi()
{
  return 3.141593f;
}

int main()
{
  // 実部1.0f、虚部2.0fの複素数オブジェクトを作る
  std::complex<float> c(1.0f, 2.0f);

  // ストリーム出力
  std::cout << "output : " << c << std::endl;

  // 各要素の取得
  float real = c.real(); // 実部
  float imag = c.imag(); // 虚部
  std::cout << "real : " << real << std::endl;
  std::cout << "imag : " << imag << std::endl;

  // 演算
  std::complex<float> a(1.0f, 2.0f);
  std::complex<float> b(2.0f, 3.0f);
  std::cout << "a + b : " << a + b << std::endl;
  std::cout << "a - b : " << a - b << std::endl;
  std::cout << "a * b : " << a * b << std::endl;
  std::cout << "a / b : " << a / b << std::endl;

  // 各複素数の値を取得する
  std::cout << "abs : " << std::abs(c) << std::endl;   // 絶対値
  std::cout << "arg : " << std::arg(c) << std::endl;   // 偏角
  std::cout << "norm : " << std::norm(c) << std::endl; // ノルム
  std::cout << "conj : " << std::conj(c) << std::endl; // 共役複素数
  std::cout << "proj : " << std::proj(c) << std::endl; // リーマン球面への射影
  std::cout << "polar : " << std::polar(1.0f, pi() / 2.0f); // 極座標(絶対値：1.0、偏角：円周率÷2.0)から複素数を作る
}
```
* std::complex[color ff0000]
* c.real()[link complex/real.md]
* c.imag()[link complex/imag.md]
* std::abs[link complex/abs.md]
* std::arg[link complex/arg.md]
* std::norm[link complex/norm.md]
* std::conj[link complex/conj.md]
* std::proj[link complex/proj.md]
* std::polar[link complex/polar.md]

### 出力
```
output : (1,2)
real : 1
imag : 2
a + b : (3,5)
a - b : (-1,-1)
a * b : (-4,7)
a / b : (0.615385,0.0769231)
abs : 2.23607
arg : 1.10715
norm : 5
conj : (1,-2)
proj : (1,2)
polar : (-1.62921e-07,1)
```


## 参照
- [複素数 - Wikipedia](https://ja.wikipedia.org/wiki/複素数)
- [複素数の手ほどき - 日本電気技術者協会](http://www.jeea.or.jp/course/contents/01109/)
- [複素数とは何か - EMANの物理�](http://eman-physics.net/math/imaginary01.html)
- [LWG Issue 387. `std::complex` over-encapsulated](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#387)
    - C++11で、`std::complex`型のメモリレイアウトが規定された経緯のレポート
- [N1568 Proposed additions to TR-1 to improve compatibility with C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1568.htm)

