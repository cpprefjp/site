# exp2
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr deduced-vec-t<V> exp2(const V& x); // C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]

## 概要
浮動小数点数型を要素とする[`basic_vec`](basic_vec.md)について、各要素の`2`を底とする指数関数（2を`x`乗した値）を求める。各要素に[`<cmath>`](/reference/cmath.md)の[`exp2`](/reference/cmath/exp2.md)を要素ごとに適用したものである。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点数型を要素とする[`basic_vec`](basic_vec.md)であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は`V`から導出される[`basic_vec`](basic_vec.md)型（通常は`V`自身）を表す。


## 戻り値
各要素`i`（`0`以上`V::size()`未満）について、`x[i]`に[`<cmath>`](/reference/cmath.md)の[`exp2`](/reference/cmath/exp2.md)を適用した結果に要素ごとに等しい[`basic_vec`](basic_vec.md)オブジェクトを返す。

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
  simd::vec<float, 4> v([](int i) { return float(i + 1); }); // {1, 2, 3, 4}

  // 各要素の2の指数関数を求める
  simd::vec<float, 4> r = simd::exp2(v);

  for (std::size_t i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::exp2[color ff0000]

### 出力例
```
2 4 8 16 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::exp`](exp.md)
- [`std::simd::log2`](log2.md)
- [`std::exp2`](/reference/cmath/exp2.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
