# lcm
* numeric[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]
* [mathjax enable]

```cpp
namespace std {
template <class M, class N> constexpr common_type_t<M, N> lcm(M m, N n);
}
```
* common_type_t[link /reference/type_traits/common_type.md]

## 概要
最小公倍数 (least common multiple) を求める。


## 要件
1. `M` および `N` が `bool` 以外の整数型であること  
  満足しない場合プログラムは不適格となる
2. `|m|` および `|n|` が [`common_type_t`](/reference/type_traits/common_type.md)`<M, N>` の値として表現できること  
  満足しない場合の挙動は未定義
3. `|m|` と `|n|` の最小公倍数が [`common_type_t`](/reference/type_traits/common_type.md)`<M, N>` の値として表現できること  
  満足しない場合の挙動は未定義


## 戻り値
* `m` または `n` が 0 の場合 0 を返す
* それ以外の場合引数 `|m|` と `|n|` の最小公倍数を返す


## 例外
投げない。


## 例
```cpp
#include <numeric>

int main() {
  static_assert(std::lcm(0, 1) == 0);
  static_assert(std::lcm(4u, -6l) == 12);
}
```
* lcm[color ff0000]

### 出力
```
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

`_LIBCPP_DEBUG` マクロが `0` 以上の場合、要件 3 を満たさなければ [`abort`](/reference/cstdlib/abort.md) する。
ただし 4 系では [`<limits>`](/reference/limits.md) を `<numeric>` より先に include しなければならない。
それ以外の場合（デフォルト）、オーバーフローにより戻り値が負になることがある。

#### GCC (libstdc++)
要件 2, 3 を満たすかどうかチェックしない。
要件 3 を満たさない場合、オーバーフローにより戻り値が負になることがある。


## 参照
* [WG21 N3845 Greatest Common Divisor and Least Common Multiple](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3845.pdf)
* [WG21 N3913 Greatest Common Divisor and Least Common Multiple, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3913.pdf)
* [WG21 N4061 Greatest Common Divisor and Least Common Multiple, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4061.pdf)
* [WG21 P0295R0 Adopt Selected Library Fundamentals V2 Components for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0295r0.pdf)


## 実装例
$$ \mathrm{lcm}(m, n) = \frac{|mn|}{\mathrm{gcd}(m, n)} $$
