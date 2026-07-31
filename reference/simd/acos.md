# acos
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr deduced-vec-t<V> acos(const V& x);  // C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]

## 概要
要素型が浮動小数点数の[`basic_vec`](basic_vec.md)、またはスカラーの浮動小数点数`x`について、各要素の逆余弦（アークコサイン）を求める。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点数の[「vectorizable type」](/reference/simd.md#vectorizable-type)を要素とする[`basic_vec`](basic_vec.md)、またはスカラーの浮動小数点数であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、`V`に対応する[`basic_vec`](basic_vec.md)型（`decltype(x + x)`）である。


## 戻り値
各要素`i`について、`x`の各要素に[`<cmath>`](/reference/cmath.md)の[`acos`](/reference/cmath/acos.md)を適用した結果を要素とする[`basic_vec`](basic_vec.md)オブジェクトを返す。

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
  simd::vec<float, 4> v([](int i) { return -0.75f + i * 0.5f; }); // {-0.75, -0.25, 0.25, 0.75}

  // 各要素の逆余弦を求める
  simd::vec<float, 4> r = simd::acos(v);

  for (std::size_t i = 0; i < r.size(); ++i) {
    std::print("{} ", r[i]);
  }
  std::println("");
}
```
* simd::acos[color ff0000]

### 出力例
```
2.41886 1.82348 1.31812 0.722734 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::cos`](cos.md)
- [`std::simd::asin`](asin.md)
- [`std::simd::atan`](atan.md)
- [`std::simd::acosh`](acosh.md)
- [`acos`](/reference/cmath/acos.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
