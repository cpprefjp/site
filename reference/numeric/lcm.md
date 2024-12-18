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


## 適格要件
- 型`M` および `N` が `bool` 以外の整数型であること


## 事前条件
- `|m|` および `|n|` が [`common_type_t`](/reference/type_traits/common_type.md)`<M, N>` の値として表現できること
- `|m|` と `|n|` の最小公倍数が [`common_type_t`](/reference/type_traits/common_type.md)`<M, N>` の値として表現できること


## 戻り値
- `m` または `n` が 0 の場合 0 を返す
- それ以外の場合引数 `|m|` と `|n|` の最小公倍数を返す


## 例外
投げない。


## 備考
- この関数は、公式通りに `abs(m * n) / gcd(m, n)` として実装すると、`m * n`の箇所でオーバーフローしやすい。実装によっては、式を改良することでオーバーフローしにくいようになっている場合がある
    - GCC (libstdc++), Clang (libc++), Visual C++ : オーバーフローしにくい改良版の式として`abs(m) / gcd(m, n) * abs(n)`という実装が使用されている


## 例
### 基本的な使い方
```cpp example
#include <cassert>
#include <numeric>

int main() {
  assert(std::lcm(3, 4) == 12);
  assert(std::lcm(4, 3) == 12);

  // コンパイル時に最小公倍数を求めることもできる
  static_assert(std::lcm(0, 1) == 0);
  static_assert(std::lcm(4u, -6l) == 12);
}
```
* std::lcm[color ff0000]

#### 出力
```
```

### オーバーフローしやすい状況の例
```cpp example
#include <iostream>
#include <cstdint>
#include <numeric>

int main() {
  std::uint16_t m = 20000;
  std::uint16_t n = 40000;

  // 標準std::lcm()の動作は実装定義
  std::cout << "std::lcm(" << m << ", " << n << ")     " << std::lcm(m, n) << std::endl;

  // 公式通りのオーバーフローしやすい最小公倍数の実装
  volatile std::uint16_t t = m * n; // 最適化回避のための変数
  std::cout << "formal lcm(" << m << ", " << n << ")   " << (t / std::gcd(m, n)) << std::endl;

  // オーバーフローしにくいよう公式を改良した実装
  auto g = std::gcd(m, n);
  std::cout << "improved lcm(" << m << ", " << n << ") " << m * (n / g) << std::endl;
}
```
* std::lcm[color ff0000]
* std::uint16_t[link /reference/cstdint/uint16_t.md]
* std::gcd[link gcd.md]

#### 出力例
```
std::lcm(20000, 40000)     40000
formal lcm(20000, 40000)   0
improved lcm(20000, 40000) 40000
```

### 3つ以上の値に対する最小公倍数を求める
```cpp example
#include <cassert>
#include <numeric>
#include <vector>

// 可変引数で最小公倍数を求める関数
template <class T>
T vlcm(T m, T n) {
  return std::lcm(m, n);
}

template <class T, class... Args>
T vlcm(T a, Args... args) {
  return vlcm(a, vlcm(args...));
}

int main() {
  // 2つずつ最小公倍数を求める
  assert(std::lcm(std::lcm(3, 4), 6) == 12);

  // リスト全体の最小公倍数を求める
  std::vector<int> v = {3, 4, 6};
  int r = std::accumulate(v.begin(), v.end(), 1, [](int m, int n) {
    return std::lcm(m, n);
  });
  assert(r == 12);

  // 可変引数で最小公倍数を求める
  assert(vlcm(3, 4, 6) == 12);
}
```
* std::lcm[color ff0000]
* std::accumulate[link accumulate.md]

#### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
#### Clang (libc++)
- 事前条件を満たすかどうかチェックしない。
- [`_LIBCPP_DEBUG`](http://releases.llvm.org/5.0.0/projects/libcxx/docs/DesignDocs/DebugMode.html#using-debug-mode) マクロが`0` 以上の場合、事前条件2を満たさなければ [`abort`](/reference/cstdlib/abort.md) する。
    - ただしバージョン 4 系では [`<limits>`](/reference/limits.md) を `<numeric>` より先に include しなければならない。
    - それ以外の場合（デフォルト）、オーバーフローにより戻り値が不正になることがある。

#### GCC (libstdc++)
- 事前条件を満たすかどうかチェックしない。
- 事前条件2を満たさない場合、オーバーフローにより戻り値が不正になることがある。


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

```cpp
template <class M, class N>
constexpr std::common_type_t<M, N> gcd(M m, N n) {
  if (m == 0 && n == 0) {
    return 0;
  }
  while (m != 0 && n != 0) {
    if (m > n) {
      m %= n;
    }
    else {
      n %= m;
    }
  }
  return m < n ? n : m;
}

template <class M, class N>
constexpr std::common_type_t<M, N> lcm(M m, N n) {
  return m / gcd(m, n) * n;
}
```