# get
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <std::size_t I, class T>
  constexpr T& get(complex<T>& z) noexcept;               // (1) C++26

  template <std::size_t I, class T>
  constexpr T&& get(complex<T>&& z) noexcept;             // (2) C++26

  template <std::size_t I, class T>
  constexpr const T& get(const complex<T>& z) noexcept;   // (3) C++26

  template <std::size_t I, class T>
  constexpr const T&& get(const complex<T>&& z) noexcept; // (4) C++26
}
```

## 概要
タプルと見なせる型から指定した位置の要素を取得する。

`<complex>`ヘッダでは、`std::complex`クラスに関するオーバーロードを定義する。


## 適格要件
- `I < 2`であること


## 戻り値
`I == 0`の場合は実部 (real)、そうでない場合は虚部 (imag) を返す。


## 例外
投げない


## 例
```cpp example
#include <print>
#include <complex>

int main()
{
  std::complex<float> c{1.0f, 2.0f};

  float real = std::get<0>(c);
  float imag = std::get<1>(c);

  std::println("real:{} imag:{}", real, imag);
}
```
* std::get[color ff0000]


### 出力
```
real:1 imag:2
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 19.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 10 [mark noimpl]


## 関連項目
- [`get - std::tuple`](/reference/tuple/tuple/get.md)


## 参照
- [P2819R2 Add tuple protocol to complex](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2819r2.pdf)
    - C++26から`std::complex`にタプルインタフェースがサポートされた
