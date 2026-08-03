# fpclassify
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr rebind_t<int, deduced-vec-t<V>>
    fpclassify(const V& x); // C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]
* rebind_t[link rebind.md]

## 概要
浮動小数点要素型の[`basic_vec`](basic_vec.md)について、各要素を浮動小数点数の種別に分類する。各要素に[`std::fpclassify`](/reference/cmath/fpclassify.md)を適用する。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素型の[`basic_vec`](basic_vec.md)、またはそれと組み合わせて[`basic_vec`](basic_vec.md)を導出できる型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、引数から導出される[`basic_vec`](basic_vec.md)型である。戻り値の型は、要素型を`int`とした整数の[`basic_vec`](basic_vec.md)となる。


## 戻り値
各要素`i`（`0`以上`deduced-vec-t<V>::size()`未満）について、`x[i]`に[`std::fpclassify`](/reference/cmath/fpclassify.md)を適用した結果で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。各要素の値は、[`FP_INFINITE`](/reference/cmath/fp_infinite.md)・[`FP_NAN`](/reference/cmath/fp_nan.md)・[`FP_NORMAL`](/reference/cmath/fp_normal.md)・[`FP_SUBNORMAL`](/reference/cmath/fp_subnormal.md)・[`FP_ZERO`](/reference/cmath/fp_zero.md)、または処理系が定義する分類のいずれかである。


## 例
```cpp example
#include <simd>
#include <print>
#include <cmath>
#include <limits>
#include <array>

namespace simd = std::simd;

int main()
{
  constexpr float inf = std::numeric_limits<float>::infinity();
  constexpr float nan = std::numeric_limits<float>::quiet_NaN();
  simd::vec<float, 4> v{
    [&](int i) { return std::array{1.0f, 0.0f, inf, nan}[i]; }
  }; // {1, 0, inf, nan}

  simd::rebind_t<int, simd::vec<float, 4>> r = simd::fpclassify(v);

  for (std::size_t i = 0; i < r.size(); ++i)
    std::print("{} ", r[i] == FP_NORMAL);
  std::println("");
}
```
* simd::fpclassify[color ff0000]
* simd::vec[link basic_vec.md]
* simd::rebind_t[link rebind.md]
* FP_NORMAL[link /reference/cmath/fp_normal.md]

### 出力
```
true false false false 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::isnan`](isnan.md)
- [`std::simd::isinf`](isinf.md)
- [`std::simd::isnormal`](isnormal.md)
- [`std::fpclassify`](/reference/cmath/fpclassify.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
