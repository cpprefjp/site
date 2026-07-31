# nearbyint
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  deduced-vec-t<V> nearbyint(const V& x); // C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]

## 概要
[`basic_vec`](basic_vec.md)の各要素について、現在の丸めモードに従って整数値に丸める。[`rint`](rint.md)とは異なり、`FE_INEXACT`浮動小数点例外を送出しない。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素の[`basic_vec`](basic_vec.md)、またはそこから[`basic_vec`](basic_vec.md)を導出可能なスカラー浮動小数点型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、`V`に対応する[`basic_vec`](basic_vec.md)型（`V`がスカラー型のときはそれを要素型とする[`basic_vec`](basic_vec.md)）を表す。


## 戻り値
各要素`i`について、`x`の対応する要素に[`<cmath>`](/reference/cmath.md)の[`nearbyint`](/reference/cmath/nearbyint.md)を適用した結果で初期化された[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)型のオブジェクトを返す。

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
  simd::vec<float, 4> v{[](int i) {
    constexpr float a[] = {0.5f, 1.5f, 2.5f, 3.5f};
    return a[i];
  }};

  // 既定の丸めモード（最近接偶数への丸め）で整数に丸める
  simd::vec<float, 4> r = simd::nearbyint(v);

  for (int i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::nearbyint[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
0 2 2 4 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::rint`](rint.md)
- [`std::simd::round`](round.md)
- [`std::nearbyint`](/reference/cmath/nearbyint.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
