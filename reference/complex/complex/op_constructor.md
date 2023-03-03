# コンストラクタ
* complex[meta header]
* std[meta namespace]
* complex[meta class]
* function[meta id-type]

```cpp
complex(const T& re = T(), const T& im = T());            // (1) C++03
constexpr complex(const T& re = T(), const T& im = T());  // (1) C++14

complex(const complex& other);                            // (2) C++03
constexpr complex(const complex& other);                  // (2) C++14
constexpr complex(const complex& other) = default;        // (2) C++23

template <class X>
complex(const complex<X>& other);                         // (3) C++03
template <class X>
constexpr complex(const complex<X>& other);               // (3) C++14
template <class X>
constexpr explicit(see below)
  complex(const complex<X>& other);                       // (3) C++23
```

## 概要
- (1) : 実部(`re`)と虚部(`im`)の値をそれぞれ受け取って構築
- (2) : コピーコンストラクタ
- (3) : 変換可能な要素型の`complex`オブジェクトからのコピー


## 効果
- (1) : 実部(`re`)、虚部(`im`)の値をそれぞれ受け取り、メンバ変数に保持する。どちらもデフォルト値は`0.0`である。
- (2), (3) : `other`が持つ実部および虚部の値を、`*this`にコピーする。


## 備考
- (3) : 浮動小数点数型として縮小変換となるものは `explicit` と宣言されているため、暗黙の型変換には使用されない


## 例
```cpp example
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

  // (3)
  // 縮小変換となるコンストラクタは explicit
  // std::complex<float> c4 = c3; // エラー
  std::complex<float> c4(c3);     // 直接初期化なら OK

  std::cout << "c1 : " << c1 << std::endl;
  std::cout << "c2 : " << c2 << std::endl;
  std::cout << "c3 : " << c3 << std::endl;
  std::cout << "c4 : " << c4 << std::endl;
}
```

### 出力
```
c1 : (1,2)
c2 : (1,2)
c3 : (1,2)
c4 : (1,2)
```


## 関連項目

| 名前             | 説明                             |
|------------------|----------------------------------|
|[`real`](real.md) | 実部を取得、あるいは、設定する。 |
|[`imag`](imag.md) | 虚部を取得、あるいは、設定する。 |


## 参照
- [N3302 Constexpr Library Additions: complex, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2011/n3302.html)
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で拡張浮動小数点数型に対応した
