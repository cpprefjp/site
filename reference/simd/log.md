# log
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr deduced-vec-t<V> log(const V& x); // (1) C++26

  template<simd-complex V>
  constexpr V log(const V& v);                // (2) C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]
* simd-complex[link /reference/simd/simd-complex.md]

## 概要
[`basic_vec`](basic_vec.md)の各要素について、自然対数（底が`e`の対数）を求める。

- (1) : 浮動小数点数型を要素とする[`basic_vec`](basic_vec.md)について、各要素に[`<cmath>`](/reference/cmath.md)の[`log`](/reference/cmath/log.md)を要素ごとに適用する。
- (2) : 要素型が`std::complex<T>`の[`basic_vec`](basic_vec.md)について、各要素に[`<complex>`](/reference/complex/complex.md)の[`log`](/reference/complex/complex/log.md)を要素ごとに適用する。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点数型を要素とする[`basic_vec`](basic_vec.md)であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は`V`から導出される[`basic_vec`](basic_vec.md)型（通常は`V`自身）を表す。制約[`simd-complex`](/reference/simd/simd-complex.md)は、`V`が要素型`std::complex<T>`の[`basic_vec`](basic_vec.md)であることを表す説明専用のコンセプトである。


## 戻り値
各要素`i`（`0`以上`V::size()`未満）について、`v[i]`（`x[i]`）に対応する`log`を適用した結果に要素ごとに等しい[`basic_vec`](basic_vec.md)オブジェクトを返す。

- (1) : [`<cmath>`](/reference/cmath.md)の[`log`](/reference/cmath/log.md)を適用する。
- (2) : [`<complex>`](/reference/complex/complex.md)の[`log`](/reference/complex/complex/log.md)を適用する。

ある要素`i`について定義域エラー・極エラー・値域エラーが発生する場合、その要素の値は未規定である。


## 備考
[`errno`](/reference/cerrno/errno.md)にアクセスするか否かは未規定である。


## 例
### 基本的な使い方
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<float, 4> v([](int i) { return float(i + 1); }); // {1, 2, 3, 4}

  // 各要素の自然対数を求める
  simd::vec<float, 4> r = simd::log(v);

  for (std::size_t i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::log[color ff0000]

#### 出力例
```
0 0.693147 1.09861 1.38629 
```

### 複素数版 (2)
```cpp example
#include <simd>
#include <complex>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<std::complex<float>, 2> v{
    [](int i) { return std::complex<float>(i + 1.0f, 0.0f); }
  };  // {(1, 0), (2, 0)}

  // 各要素の自然対数を求める
  simd::vec<std::complex<float>, 2> r = simd::log(v);

  for (std::size_t i = 0; i < r.size(); ++i) {
    std::complex<float> c = r[i];
    std::print("({}, {}) ", c.real(), c.imag());
  }
  std::println("");
}
```
* simd::log[color ff0000]

#### 出力例
```
(0, 0) (0.693147, 0) 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::log10`](log10.md)
- [`std::simd::log2`](log2.md)
- [`std::simd::log1p`](log1p.md)
- [`std::simd::exp`](exp.md)
- [`std::simd::pow`](pow.md)
- [`std::simd::sqrt`](sqrt.md)
- [`std::log`](/reference/cmath/log.md)
- [`std::complex::log`](/reference/complex/complex/log.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加され、実数版の`log` (1) が追加された
- [P2663R7 Interleaved complex values support in std::simd](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2663r7.html)
    - 要素型が複素数の`basic_vec`に対する複素数版の`log` (2) が追加された
