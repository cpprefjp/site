# abs
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  // 浮動小数点版
  template<math-floating-point V>
  constexpr deduced-vec-t<V>
    abs(const V& j);                 // (1) C++26

  // 符号付き整数版
  template<std::signed_integral T, class Abi>
  constexpr basic_vec<T, Abi>
    abs(const basic_vec<T, Abi>& j); // (2) C++26

  // 複素数版
  template<simd-complex V>
  constexpr rebind_t<simd-complex-value-type<V>, V>
    abs(const V& v);                 // (3) C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* simd-complex-value-type[link /reference/simd/simd-complex-value-type.md]
* math-floating-point[link /reference/simd/math-floating-point.md]
* simd-complex[link /reference/simd/simd-complex.md]
* std::signed_integral[link /reference/concepts/signed_integral.md]
* basic_vec[link basic_vec.md]
* rebind_t[link rebind.md]

## 概要
[`basic_vec`](basic_vec.md)の各要素について、絶対値を求める。

- (1) : 浮動小数点要素の各要素の絶対値を求める。
- (2) : 符号付き整数要素の各要素の絶対値を求める。
- (3) : 複素数要素の各要素の絶対値（大きさ・マグニチュード）を求め、実数型を要素とする[`basic_vec`](basic_vec.md)として返す。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素の[`basic_vec`](basic_vec.md)、またはそこから[`basic_vec`](basic_vec.md)を導出可能なスカラー浮動小数点型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、`V`に対応する[`basic_vec`](basic_vec.md)型を表す。

制約[`simd-complex`](/reference/simd/simd-complex.md)は、`V`が要素型`std::complex<T>`の[`basic_vec`](basic_vec.md)であることを表す説明専用のコンセプトである。[`simd-complex-value-type<V>`](/reference/simd/simd-complex-value-type.md)は`V`の要素型`std::complex<T>`における`T`（実数型）を表す。(3)の戻り値の型は、`V`の要素数はそのままに要素型を`T`とした[`basic_vec`](basic_vec.md)となる。


## 事前条件
- (2) : [`all_of`](all_of.md)`(j >= -`[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<T>::max())`が`true`であること。すなわち、`T`の最小値（`std::numeric_limits<T>::min()`）は許容されない。


## 戻り値
- (1) : 各要素`i`について、`j`の対応する要素に[`<cmath>`](/reference/cmath.md)の[`abs`](/reference/cmath/abs.md)を適用した結果で初期化された[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)型のオブジェクトを返す。
- (2) : 各要素`i`（`0`以上`j.size()`未満）について、[`abs`](/reference/cstdlib/abs.md)`(j[i])`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。
- (3) : 各要素`i`（`0`以上`V::size()`未満）について、`v[i]`に[`<complex>`](/reference/complex/complex.md)の[`abs`](/reference/complex/complex/abs.md)を適用した結果で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。

(1), (3)について、ある要素`i`で定義域エラー・極エラー・値域エラーが発生する場合、その要素の値は未規定である。


## 備考
- (1), (3) : [`errno`](/reference/cerrno/errno.md)にアクセスするか否かは未規定である。


## 例
### 基本的な使い方
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> v{[](int i) { return i % 2 == 0 ? -(i + 1) : (i + 1); }};
  // {-1, 2, -3, 4}

  // 各要素の絶対値を求める
  simd::vec<int, 4> a = simd::abs(v);

  for (int i = 0; i < a.size(); ++i)
    std::print("{} ", a[i]);
  std::println("");
}
```
* simd::abs[color ff0000]
* simd::vec[link basic_vec.md]

#### 出力
```
1 2 3 4 
```

### 複素数版の例 (C++26)
```cpp example
#include <simd>
#include <complex>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<std::complex<float>, 2> v{
    [](int i) { return std::complex<float>(i + 3.0f, i + 4.0f); }
  };  // {(3, 4), (4, 5)}

  // 各要素の絶対値（大きさ）を求める
  simd::vec<float, 2> a = simd::abs(v);

  for (std::size_t i = 0; i < a.size(); ++i)
    std::print("{} ", a[i]);
  std::println("");
}
```
* simd::abs[color ff0000]
* simd::vec[link basic_vec.md]

#### 出力例
```
5 6.40312 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::fabs`](fabs.md)
- [`std::simd::arg`](arg.md)
- [`std::simd::norm`](norm.md)
- [`std::simd::polar`](polar.md)
- [`std::complex::abs`](/reference/complex/complex/abs.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P2663R7 Interleaved complex values support in std::simd](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2663r7.html)
    - 要素型が複素数の`basic_vec`に対する複素数関連の関数が追加された
