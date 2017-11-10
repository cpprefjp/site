# gcd
* numeric[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]
* [mathjax enable]

```cpp
namespace std {
template <class M, class N> constexpr common_type_t<M, N> gcd(M m, N n);
}
```
* common_type_t[link /reference/type_traits/common_type.md]

## 概要
最大公約数 (greatest common divisor, gcd) を求める。


## 要件
1. `M` および `N` が `bool` 以外の整数型であること  
  満足しない場合プログラムは不適格となる
2. `|m|` および `|n|` が [`common_type_t`](/reference/type_traits/common_type.md)`<M, N>` の値として表現できること  
  満足しない場合の挙動は未定義


## 戻り値
* `m` および `n` が 0 の場合 0 を返す
* それ以外の場合引数 `|m|` と `|n|` の最大公約数を返す


## 例外
投げない。


## 例
```cpp
#include <iostream>
#include <limits>
#include <numeric>
#include <type_traits>

int main() {
  static_assert(std::gcd(0, 0) == 0);
  static_assert(std::gcd(3u, -7l) == 1);

  // 符号付き整数の場合戻り値が負になることがある
  using T = int32_t;
  constexpr auto m = std::numeric_limits<T>::min();
  const auto gs = std::gcd<T, T>(m, m);  // -m が int32_t で表せないと m < 0 になる
  std::cout << "gcd<int32_t, int32_t>(" << m << ", " << m << ")   " << gs << std::endl;

  // 符号なし整数にすれば戻り値は正
  using U = std::make_unsigned<T>::type;  // uint32_t
  const auto gu = std::gcd<U, U>(m, m);
  std::cout << "gcd<uint32_t, uint32_t>(" << m << ", " << m << ") " << gu << std::endl;
}
```
* std::gcd[color ff0000]
* min[link /reference/limits/numeric_limits/min.md]
* std::make_unsigned[link /reference/type_traits/make_unsigned.md]

### 出力例
```
gcd<int32_t, int32_t>(-2147483648, -2147483648)   -2147483648
gcd<uint32_t, uint32_t>(-2147483648, -2147483648) 2147483648
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.0
- [GCC](/implementation.md#gcc): 7.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
#### Clang (libc++)
要件 2 を満たすかどうかチェックしないが、戻り値を `constexpr` 指定するとオーバーフロー時にコンパイルエラーとなることがある。
要件 2 を満たさない場合、オーバーフローにより戻り値が負になることがある。

#### GCC (libstdc++)
要件 2 を満たすかどうかチェックしないが、戻り値を `constexpr` 指定するとオーバーフロー時にコンパイルエラーとなることがある。
要件 2 を満たさない場合、オーバーフローにより戻り値が負になることがある。


## 参照
* [WG21 N3845 Greatest Common Divisor and Least Common Multiple](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3845.pdf)
* [WG21 N3913 Greatest Common Divisor and Least Common Multiple, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3913.pdf)
* [WG21 N4061 Greatest Common Divisor and Least Common Multiple, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4061.pdf)
* [WG21 P0295R0 Adopt Selected Library Fundamentals V2 Components for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0295r0.pdf)


## 関連項目
* [`lcm`](lcm.md)


## 実装例
$$ \mathrm{gcd}(m, n) = \begin{cases}
  |m| & \text{if } n = 0 \\
  \mathrm{gcd}(n, m \bmod n) & \text{otherwise}
\end{cases} $$
