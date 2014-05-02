#complex
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


###配列へのキャスト

`complex`クラスの左辺値オブジェクト`c`は、`reinterpret_cast<cv修飾 T(&)[2]>(c)`もしくは`reinterpret_cast<cv修飾 T*>(&c)`で浮動小数点数型の配列にキャスト可能である。その場合、配列の`0`番目は実部を表し、`1`番目は虚部を表す。


##メンバ関数

| 名前            | 説明                           | 対応バージョン |
|-----------------|--------------------------------|-------|
| `(constructor)` | コンストラクタ                 | |
| `(destructor)`  | デストラクタ                   | |
| `real`          | 複素数値の実部を取得／設定する | |
| `imag`          | 複素数値の虚部を取得／設定する | |
| `operator=`     | 複素数値のコピー               | |
| `operator+=`    | 複素数値の加算                 | |
| `operator-=`    | 複素数値の減算                 | |
| `operator*=`    | 複素数値の乗算                 | |
| `operator/=`    | 複素数値の除算                 | |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------|------|----------------|
| `value_type` | 実部と虚部およびそれらの演算に使用する浮動小数点数型。テンプレートパラメータの型`T`。 | |


##非メンバ関数
###複素数の値

| 名前    | 説明                                                 | 対応バージョン |
|---------|------------------------------------------------------|----------------|
| `real`  | 実部を取得する                                       | |
| `imag`  | 虚部を取得する                                       | |
| `abs`   | 大きさ(マグニチュード)を取得する                     | |
| `norm`  | ノルム(マグニチュードの自乗)を取得する               | |
| `conj`  | 共役複素数を取得する                                 | |
| `proj`  | 複素射影直線(リーマン球面への射影)を取得する         | C++11 |
| `polar` | `complex` を大きさ `ρ` と位相 `Θ` の表現に変換する | |


###演算子

| 名前         | 説明                                  | 対応バージョン |
|--------------|---------------------------------------|----------------|
| `operator+`  | `complex`オブジェクトを加算する       | |
| `operator-`  | `complex`オブジェクトを減算する       | |
| `operator*`  | `complex`オブジェクトを乗算する       | |
| `operator/`  | `complex`オブジェクトを除算する       | |
| `operator==` | `complex`オブジェクトを等値比較する   | |
| `operator!=` | `complex`オブジェクトを非等値比較する | |
| `operator<<` | ストリームへの出力                    | |
| `operator>>` | ストリームからの入力                  | |


###リテラル

| 名前 | 説明                             | 対応バージョン |
|------|----------------------------------|----------------|
| `i`  | `complex<double>`のリテラル      | C++14          |
| `if` | `complex<float>`のリテラル       | C++14          |
| `il` | `complex<long double>`のリテラル | C++14          |


###数学関数の`complex`に対するオーバーロード

| 名前    | 説明                 | 対応バージョン |
|---------|----------------------|----------------|
| `acos`  | 逆余弦を求める       | C++11 |
| `asin`  | 逆正弦を求める       | C++11 |
| `atan`  | 逆正接を求める       | C++11 |
| `acosh` | 双曲線逆余弦を求める | C++11 |
| `asinh` | 双曲線逆正弦を求める | C++11 |
| `atanh` | 双曲線逆正接を求める | C++11 |
| `cos`   | 余弦を求める         | |
| `cosh`  | 双曲線余弦を求める   | |
| `exp`   | 指数関数を求める     | |
| `log`   | 自然対数を求める     | |
| `log10` | 常用対数を求める     | |
| `pow`   | 累乗を求める         | |
| `sin`   | 正弦を求める         | |
| `sinh`  | 双曲線正弦を求める   | |
| `sqrt`  | 平方根を求める       | |
| `tan`   | 正接を求める         | |
| `tanh`  | 双曲線正接を求める   | |


##例
```cpp
#include <iostream>
#include <exception>
#include <complex>

int main() try{
  typedef std::complex<float> t;
  auto a = t(12.34f,56.78f);
  for(const t& v:{
    a,
    a += t(-1.0f,-10.0f),
    a -= t(34.12f, 78.56f),
    a *= 2.0f,
    a /= -3.0f,
  })
    std::cout << v << std::endl; 
  a.real(10.0f);
  a.imag(20.0f);
  std::cout << a << std::endl;
}catch(const std::exception& e){
  std::cerr << e.what();
}
```

###出力
```
(12.34,56.78)
(11.34,46.78)
(-22.78,-31.78)
(-45.56,-63.56)
(15.1867,21.1867)
(10,20)
```

##例
```cpp
#include <iostream>
#include <exception>
#include <complex>

int main() try{
  typedef std::complex<float> t; 
  auto a = t(12.34f,56.78f);
#define m(f)\
  std::cout << f(a) << std::endl;
  m(acos);
  m(asinh);
  m(exp);
  m(log);
  m(sqrt);
  m(real);
  m(imag);
  m(norm);
#undef m
}catch(const std::exception& e){
  std::cerr << e.what();
}
```

###出力
```
(1.35691,-4.75602)
(4.75534,1.35676)
(222571,52426.1)
(4.06226,1.35679)
(5.93487,4.78359)
12.34
56.78
3376.24
```


##参照
- [複素数 - Wikipedia](http://ja.wikipedia.org/wiki/複素数)
- [複素数の手ほどき - 日本電気技術者協会](http://www.jeea.or.jp/course/contents/01109/)
- [複素数とは何か - EMANの物理学](http://homepage2.nifty.com/eman/math/imaginary01.html)

