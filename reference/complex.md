#complex

##complex テンプレートクラス


```cpp

namespace std {

  template<class T>

    class complex {

      public:

        typedef T value_type;

        complex(const T& re = T(), const T& im = T());

        complex(const complex&);

        template<class X> complex(const complex<X>&);

        T real() const;

        void real(T);

        T imag() const;

        void imag(T);

        complex<T>& operator= (const T&);

        complex<T>& operator+=(const T&);

        complex<T>& operator-=(const T&);

        complex<T>& operator*=(const T&);

        complex<T>& operator/=(const T&);

        complex& operator=(const complex&);

        template<class X> complex<T>& operator= (const complex<X>&);

        template<class X> complex<T>& operator+=(const complex<X>&);

        template<class X> complex<T>& operator-=(const complex<X>&);

        template<class X> complex<T>& operator*=(const complex<X>&);

        template<class X> complex<T>& operator/=(const complex<X>&);

    };

}
```

complex は複素数を扱う標準ライブラリである。複素数の値を保持する complex テンプレートクラスのほか、各種の演算子、三角関数などの基礎的な関数のオーバーロードを定義する。



###メンバ関数



| | |
|---------------|--------------------------------------------------------|
| (constructor) | complex コンストラクタ (publicメンバ関数) |
| (destructor) | complex デストラクタ (publicメンバ関数) |
| real | 複素数値の実部を取得／設定する |
| imag | 複素数値の虚部を取得／設定する |
| operator= | 複素数値のコピー |
| operator+= | 複素数値の加算 |
| operator-= | 複素数値の減算 |
| operator*= | 複素数値の乗算 |
| operator/= | 複素数値の除算 |


<span style='line-height:25px;font-size:medium'>
</span>


###例

```cpp
#include <iostream>

#include <exception>

#include <complex>
```

int main() try{

  typedef <color=ff0000>std::complex</color><float> t;

  auto a = t<color=ff0000>(</color>12.34f,56.78f<color=ff0000>)</color>;

  for(const t& v:{

    a,

    a <color=ff0000>+=</color> t<color=ff0000>(</color>-1.0f,-10.0f<color=ff0000>)</color>,

    a <color=ff0000>-=</color> t<color=ff0000>(</color>34.12f, 78.56f<color=ff0000>)</color>,

    a <color=ff0000>*=</color> 2.0f,

    a <color=ff0000>/=</color> -3.0f,

  })

    std::cout << v << std::endl; 

  a.<color=ff0000>real</color>(10.0f);

  a.<color=ff0000>imag</color>(20.0f);

  std::cout << a << std::endl;

}catch(const std::exception& e){

  std::cerr << e.what();

}






<h4>出力</h4>
<span style='font-size:13px;line-height:21px'>

```cpp
(12.34,56.78)

(11.34,46.78)

(-22.78,-31.78)

(-45.56,-63.56)

(15.1867,21.1867)

(10,20)
```

</span>

<span style='line-height:28px'>
</span>


##complex クラスに対する各種の演算


###関数


| | |
|------------|----------------------------------------------------------------------------------|
| acos | complex の逆余弦を求める  |
| asin | complex の逆正弦を求める |
| atan | complex の逆正接を求める |
| acosh | complex の双曲線逆余弦を求める |
| asinh | complex の双曲線逆正弦を求める  |
| atanh | complex の双曲線逆正接を求める |
| cos | complex の余弦を求める |
| cosh | complex の双曲線余弦を求める |
| exp | complex の指数関数を求める |
| log | complex の自然対数を求める |
| log10 | complex の常用対数を求める |
| pow | complex の累乗を求める |
| sin | complex の正弦を求める |
| sinh | complex の双曲線正弦を求める |
| sqrt | complex の平方根を求める |
| tan | complex の正接を求める |
| tanh | complex の双曲線正接を求める |
| operator+ |  左辺の complex に 右辺の complex を加算する |
| operator- |  左辺の complex に 右辺の complex を減算する |
| operator* |  左辺の complex に 右辺の complex を乗算する |
| operator/ |  左辺の complex に 右辺の complex を除算する |
| operator== |  左辺の complex と 右辺の complex の値が等しいか比較する |
| operator!= |  左辺の complex と 右辺の complex の値が等しくないか比較する |
| real |  complex の実部を得る |
| imag |  complex の虚部を得る |
| abs |  complex の大きさ(マグニチュード)を得る |
| norm |  complex のノルム(マグニチュードの自乗)を得る |
| conj |  complex の共役複素数を得る |
| proj |  complex の複素射影直線(リーマン球面への射影)を得る |
| polar |  complex を大きさ ρ と位相 Θ の表現に変換する |






<h4>例</h4>
```cpp
#include <iostream>

#include <exception>

#include <complex>
```

int main() try{

  typedef <color=ff0000>std::complex</color><float> t; 

  auto a = t<color=ff0000>(</color>12.34f,56.78f<color=ff0000>)</color>;

#define m(f)\

  std::cout << f(a) << std::endl;

  m(<color=ff0000>acos</color>);

  m(<color=ff0000>asinh</color>);

  m(<color=ff0000>exp</color>);

  m(<color=ff0000>log</color>);

  m(<color=ff0000>sqrt</color>);

  m(<color=ff0000>real</color>);

  m(<color=ff0000>imag</color>);

  m(<color=ff0000>norm</color>);

#undef m

}catch(const std::exception& e){

  std::cerr << e.what();

}









<h4>
出力</h4>

<span style='line-height:13px'>

```cpp
(1.35691,-4.75602)

(4.75534,1.35676)

(222571,52426.1)

(4.06226,1.35679)

(5.93487,4.78359)

12.34

56.78

3376.24
```

</span>

