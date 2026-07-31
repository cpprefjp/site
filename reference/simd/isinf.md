# isinf
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr typename deduced-vec-t<V>::mask_type
    isinf(const V& x); // C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]

## 概要
浮動小数点要素型の[`basic_vec`](basic_vec.md)について、各要素が無限大（正または負）であるかを判定する。各要素に[`std::isinf`](/reference/cmath/isinf.md)を適用する。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素型の[`basic_vec`](basic_vec.md)、またはそれと組み合わせて[`basic_vec`](basic_vec.md)を導出できる型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、引数から導出される[`basic_vec`](basic_vec.md)型である。戻り値の型`deduced-vec-t<V>::mask_type`は、要素ごとの判定結果を保持する[`basic_mask`](basic_mask.md)である。


## 戻り値
各要素`i`（`0`以上`deduced-vec-t<V>::size()`未満）について、`x[i]`が無限大であれば`true`、そうでなければ`false`となる[`basic_mask`](basic_mask.md)オブジェクトを返す。


## 例
```cpp example
#include <simd>
#include <print>
#include <limits>
#include <array>

namespace simd = std::simd;

int main()
{
  constexpr float inf = std::numeric_limits<float>::infinity();
  constexpr float nan = std::numeric_limits<float>::quiet_NaN();
  simd::vec<float, 4> v{
    [&](int i) { return std::array{1.0f, inf, nan, -inf}[i]; }
  }; // {1, inf, nan, -inf}

  simd::vec<float, 4>::mask_type m = simd::isinf(v);

  for (std::size_t i = 0; i < m.size(); ++i)
    std::print("{} ", m[i]);
  std::println("");
}
```
* simd::isinf[color ff0000]
* simd::vec[link basic_vec.md]
* m.size()[link basic_mask/size.md]

### 出力
```
false true false true 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::isfinite`](isfinite.md)
- [`std::simd::isnan`](isnan.md)
- [`std::isinf`](/reference/cmath/isinf.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
