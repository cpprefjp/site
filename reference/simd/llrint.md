# llrint
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  rebind_t<long long, deduced-vec-t<V>> llrint(const V& x); // C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]
* rebind_t[link rebind.md]

## 概要
[`basic_vec`](basic_vec.md)の各要素について、現在の丸めモードに従って最も近い整数値に丸め、`long long`を要素型とする[`basic_vec`](basic_vec.md)として返す。[`llround`](llround.md)とは異なり丸めモードに従い、結果が元の値と異なる場合に`FE_INEXACT`浮動小数点例外を送出しうる。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素の[`basic_vec`](basic_vec.md)、またはそこから[`basic_vec`](basic_vec.md)を導出可能なスカラー浮動小数点型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、`V`に対応する[`basic_vec`](basic_vec.md)型を表す。戻り値の型は、要素数はそのままに要素型を`long long`とした[`basic_vec`](basic_vec.md)である。


## 戻り値
各要素`i`について、`x`の対応する要素に[`<cmath>`](/reference/cmath.md)の[`llrint`](/reference/cmath/llrint.md)を適用した結果で初期化された`rebind_t<long long, deduced-vec-t<V>>`型のオブジェクトを返す。

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

  // 既定の丸めモード（最近接偶数への丸め）で最も近い整数（long long）に丸める
  simd::rebind_t<long long, simd::vec<float, 4>> r = simd::llrint(v);

  for (int i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::llrint[color ff0000]
* simd::vec[link basic_vec.md]
* simd::rebind_t[link rebind.md]

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
- [`std::simd::lrint`](lrint.md)
- [`std::simd::rint`](rint.md)
- [`std::simd::llround`](llround.md)
- [`std::llrint`](/reference/cmath/llrint.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
