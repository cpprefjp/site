# lcm
* numeric[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]
* [mathjax enable]

```cpp
namespace std {
  template <class M, class N>
  constexpr common_type_t<M, N> lcm(M m, N n);
}
```
* common_type_t[link /reference/type_traits/common_type.md]

## 概要
最小公倍数 (least common multiple) を求める。


## 要件
- 型`M` および `N` が `bool` 以外の整数型であること  
  この要件を満たさない場合、プ�グラムは不適格となる
- `|m|` および `|n|` が [`common_type_t`](/reference/type_traits/common_type.md)`<M, N>` の値として表現できること  
  この要件を満たさない場合の動作は未定義
- `|m|` と `|n|` の最小公倍数が [`common_type_t`](/reference/type_traits/common_type.md)`<M, N>` の値として表現できること  
  この要件を満たさない場合の動作は未定義


## 戻り値
* `m` または `n` が 0 の場合 0 を返す
* それ以外の場合引数 `|m|` と `|n|` の最小公倍数を返す


## 例外
投げない。


## 例
```cpp example
#include <cmath>
#include <iostream>
#include <limits>
#include <numeric>

int main() {
  static_assert(std::lcm(0, 1) == 0);
  static_assert(std::lcm(4u, -6l) == 12);

  // オーバーフ�ーする例
  auto m = std::numeric_limits<uint32_t>::max();
  auto n = m - 1;
  std::cout << "lcm(" << m << ", " << n << ")      " << std::lcm(m, n) << std::endl;
  auto g = std::gcd(m, n);  // 1
  std::cout << "true lcm(" << m << ", " << n << ") " << std::fabs(m) * std::fabs(n / g) << std::endl;
}
```
* std::lcm[color ff0000]
* max[link /reference/limits/numeric_limits/max.md]
* std::fabs[link /reference/cmath/fabs.md]

### 出力例
```
lcm(4294967295, 4294967294)      2
true lcm(4294967295, 4294967294) 1.84467e+19
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
要件 2 を満たすかどうかチェックしない。

[`_LIBCPP_DEBUG`](http://releases.llvm.org/5.0.0/projects/libcxx/docs/DesignDocs/DebugMode.html#using-debug-mode) マク�が
`0` 以上の場合、要件 3 を満たさなければ [`abort`](/reference/cstdlib/abort.md) する。
ただし 4 系では [`<limits>`](/reference/limits.md) を `<numeric>` より先に include しなければならない。
それ以外の場合（デフォルト）、オーバーフ�ーにより戻り値が不�になることがある。

#### GCC (libstdc++)
要件 2, 3 を満たすかどうかチェックしない。
要件 3 を満たさない場合、オーバーフ�ーにより戻り値が不�になることがある。


## 参照
* [WG21 N3845 Greatest Common Divisor and Least Common Multiple](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3845.pdf)
* [WG21 N3913 Greatest Common Divisor and Least Common Multiple, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3913.pdf)
* [WG21 N4061 Greatest Common Divisor and Least Common Multiple, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4061.pdf)
* [WG21 P0295R0 Adopt Selected Library Fundamentals V2 Components for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0295r0.pdf)
* [LWG Issue 2837. `gcd` and `lcm` should support a wider range of input values](https://wg21.cmeerw.net/lwg/issue2837)
* [LWG Issue 2759. `gcd` / `lcm` and `bool` for the WP](https://wg21.cmeerw.net/lwg/issue2759)


## 関連項目
* [`gcd`](gcd.md)


## 実装例
$$ \mathrm{lcm}(m, n) = \frac{|mn|}{\mathrm{gcd}(m, n)} $$
