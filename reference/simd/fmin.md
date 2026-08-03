# fmin
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr deduced-vec-t<V> fmin(const V& x, const V& y);                     // (1) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V> fmin(const deduced-vec-t<V>& x, const V& y);  // (2) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V> fmin(const V& x, const deduced-vec-t<V>& y);  // (3) C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]

## 概要
[`basic_vec`](basic_vec.md)の各要素について、小さいほうの値を求める。一方がNaNの場合はもう一方の値を返す。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素の[`basic_vec`](basic_vec.md)、またはそこから[`basic_vec`](basic_vec.md)を導出可能なスカラー浮動小数点型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、`V`に対応する[`basic_vec`](basic_vec.md)型（`V`がスカラー型のときはそれを要素型とする[`basic_vec`](basic_vec.md)）を表す。

- (1) : 両引数が同じ型`V`の場合。
- (2), (3) : 一方の引数を[`basic_vec`](basic_vec.md)、他方をスカラー値として、スカラー側を全要素に対して適用する場合。


## 戻り値
各要素`i`について、`x`・`y`の対応する要素に[`<cmath>`](/reference/cmath.md)の[`fmin`](/reference/cmath/fmin.md)を適用した結果で初期化された[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)型のオブジェクトを返す。

ある要素`i`について定義域エラー・極エラー・値域エラーが発生する場合、その要素の値は未規定である。


## 備考
[`errno`](/reference/cerrno/errno.md)にアクセスするか否かは未規定である。


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<float, 4> x{[](int i) { constexpr float a[] = {1, 5, 3, 8}; return a[i]; }};
  simd::vec<float, 4> y{[](int i) { constexpr float a[] = {4, 2, 6, 7}; return a[i]; }};

  // 各要素の最小値
  simd::vec<float, 4> r = simd::fmin(x, y);

  for (int i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::fmin[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
1 2 3 7 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::fmax`](fmax.md)
- [`std::simd::fdim`](fdim.md)
- [`std::simd::min`](min.md)
- [`std::fmin`](/reference/cmath/fmin.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
