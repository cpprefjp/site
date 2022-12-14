# operator!=
* complex[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  // operator==により、以下の演算子が使用可能になる (C++20)
  template <class T>
  bool operator!=(const complex<T>& lhs,
                  const complex<T>& rhs);           // (1) C++03
  template <class T>
  constexpr bool operator!=(const complex<T>& lhs,
                            const complex<T>& rhs); // (1) C++14

  template <class T>
  bool operator!=(const complex<T>& lhs,
                  const T& rhs);                    // (2) C++03
  template <class T>
  constexpr bool operator!=(const complex<T>& lhs,
                            const T& rhs);          // (2) C++14

  template <class T>
  bool operator==(const T& lhs,
                  const complex<T>& rhs);           // (3) C++03
  template <class T>
  constexpr bool operator==(const T& lhs,
                            const complex<T>& rhs); // (3) C++14
}
```

## 概要
非等値比較を行う。


## 戻り値
`lhs.`[`real`](real.md)`() != rhs.`[`real`](real.md)`() || lhs.`[`imag`](imag.md)`() != rhs.`[`imag`](imag.md)`()`


## 備考
引数の型が `const T&` の場合、虚部（[`imag`](imag.md)`()`）は `T()`、あるいは、`0.0` とみなされる。


## 例
```cpp example
#include <iostream>
#include <complex>

int main()
{
  std::complex<double> c1(1.0, 2.0);
  std::complex<double> c2(1.0, 4.0);
  std::cout << std::boolalpha;
  std::cout << c1 << " != " << c1 << ":" << (c1 != c1) << std::endl;
  std::cout << c1 << " != " << c2 << ":" << (c1 != c2) << std::endl;
  std::cout << c1 << " != " << 1.0 << ":" << (c1 != 1.0) << std::endl;
  std::cout << 4.0 << " != " << c2 << ":" << (4.0 != c2) << std::endl;
}
```
* !=[color ff0000]

### 出力
```
(1,2) != (1,2):false
(1,2) != (1,4):true
(1,2) != 1:true
4 != (1,4):true
```


## 関連項目

| 名前                        | 説明                                           |
|-----------------------------|------------------------------------------------|
| [`operator==`](op_equal.md) | 等値比較を行う。                               |
| [`real`](real.md)           | 実部を取得、あるいは、設定する。（メンバ関数） |
| [`imag`](imag.md)           | 虚部を取得、あるいは、設定する。（メンバ関数） |


## 参照
- [N3302 Constexpr Library Additions: complex, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2011/n3302.html)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
