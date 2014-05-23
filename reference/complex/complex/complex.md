#コンストラクタ
```cpp
complex(const T& re = T(), const T& im = T());            // (1) C++03
constexpr complex(const T& re = T(), const T& im = T());  // (1) C++11

complex(const complex& other);                            // (2) C++03
constexpr complex(const complex& other);                  // (2) C++11

template <class X>
complex(const complex<X>& other);                         // (3) C++03

template <class X>
constexpr complex(const complex<X>& other);               // (3) C++11

```

##complexオブジェクトの構築
- (1) : 実部(`re`)と虚部(`im`)の値をそれぞれ受け取って構築
- (2) : コピーコンストラクタ
- (3) : 変換可能な要素型の`complex`オブジェクトからのコピー


##効果
- (1) : 実部(`re`)、虚部(`im`)の値をそれぞれ受け取り、メンバ変数に保持する。どちらもデフォルト値は`0.0`である。
- (2), (3) : `other`が持つ実部および虚部の値を、`*this`にコピーする。


##例
```cpp
#include <iostream>
#include <complex>

int main()
{
  // (1)
  // 実部(real)に1.0f、虚部(imag)に2.0fを設定して構築
  std::complex<float> c1(1.0f, 2.0f);

  // (2)
  // コピー構築
  std::complex<float> c2 = c1;

  // (3)
  // 変換可能なcomplexオブジェクトからコピー
  std::complex<double> c3 = c2;

  std::cout << "c1 : " << c1 << std::endl;
  std::cout << "c2 : " << c2 << std::endl;
  std::cout << "c3 : " << c3 << std::endl;
}
```

###出力
```
c1 : (1,2)
c2 : (1,2)
c3 : (1,2)
```


##参照

| 名前             | 説明                             |
|------------------|----------------------------------|
|[`real`](real.md) | 実部を取得、あるいは、設定する。 |
|[`imag`](imag.md) | 虚部を取得、あるいは、設定する。 |
