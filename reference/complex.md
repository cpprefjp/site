#complex
```cpp
namespace std {
  template<class T>
  class complex;
}
```
`complex` は複素数を扱う標準ライブラリである。複素数の値を保持する `complex` クラステンプレートのほか、各種の演算子、三角関数などの基礎的な関数のオーバーロードを定義する。


###メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------|------------------------|-------|
| `(constructor)` | コンストラクタ | |
| `(destructor)` | デストラクタ | |
| `real` | 複素数値の実部を取得／設定する | |
| `imag` | 複素数値の虚部を取得／設定する | |
| `operator=` | 複素数値のコピー | |
| `operator+=` | 複素数値の加算 | |
| `operator-=` | 複素数値の減算 | |
| `operator*=` | 複素数値の乗算 | |
| `operator/=` | 複素数値の除算 | |


###例
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

##`complex` クラスに対する各種の演算


###関数

| 名前 | 説明 | 対応バージョン |
|------------|----------------------------------------------------------------------------------|-------|
| `acos` | `complex` の逆余弦を求める | C++11 |
| `asin` | `complex` の逆正弦を求める | C++11 |
| `atan` | `complex` の逆正接を求める | C++11 |
| `acosh` | `complex` の双曲線逆余弦を求める | C++11 |
| `asinh` | `complex` の双曲線逆正弦を求める | C++11 |
| `atanh` | `complex` の双曲線逆正接を求める | C++11 |
| `cos` | `complex` の余弦を求める | |
| `cosh` | `complex` の双曲線余弦を求める | |
| `exp` | `complex` の指数関数を求める | |
| `log` | `complex` の自然対数を求める | |
| `log10` | `complex` の常用対数を求める | |
| `pow` | `complex` の累乗を求める | |
| `sin` | `complex` の正弦を求める | |
| `sinh` | `complex` の双曲線正弦を求める | |
| `sqrt` | `complex` の平方根を求める | |
| `tan` | `complex` の正接を求める | |
| `tanh` | `complex` の双曲線正接を求める | |
| `operator+` | 左辺の `complex` に 右辺の `complex` を加算する | |
| `operator-` | 左辺の `complex` に 右辺の `complex` を減算する | |
| `operator*` | 左辺の `complex` に 右辺の `complex` を乗算する | |
| `operator/` | 左辺の `complex` に 右辺の `complex` を除算する | |
| `operator==` | 左辺の `complex` と 右辺の `complex` の値が等しいか比較する | |
| `operator!=` | 左辺の `complex` と 右辺の `complex` の値が等しくないか比較する | |
| `real` | `complex` の実部を得る | |
| `imag` | `complex` の虚部を得る | |
| `abs` | `complex` の大きさ(マグニチュード)を得る | |
| `norm` | `complex` のノルム(マグニチュードの自乗)を得る | |
| `conj` | `complex` の共役複素数を得る | |
| `proj` | `complex` の複素射影直線(リーマン球面への射影)を得る | C++11 |
| `polar` | `complex` を大きさ `ρ` と位相 `Θ` の表現に変換する | |

###例
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

