# ldexp
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr deduced-vec-t<V>
    ldexp(const V& x,
          const rebind_t<int, deduced-vec-t<V>>& exp); // C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]
* rebind_t[link rebind.md]

## 概要
浮動小数点要素型の[`basic_vec`](basic_vec.md)について、各要素`x[i]`を`2`の`exp[i]`乗倍する。各要素に[`std::ldexp`](/reference/cmath/ldexp.md)を適用する。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素型の[`basic_vec`](basic_vec.md)、またはそれと組み合わせて[`basic_vec`](basic_vec.md)を導出できる型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、引数から導出される[`basic_vec`](basic_vec.md)型である。


## 戻り値
各要素`i`（`0`以上`deduced-vec-t<V>::size()`未満）について、`x[i]`と`exp[i]`に[`std::ldexp`](/reference/cmath/ldexp.md)を適用した結果（`x[i] × 2`<sup>`exp[i]`</sup>）で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。

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
  simd::vec<float, 4> v([](int i) { return i + 1.0f; }); // {1, 2, 3, 4}
  simd::rebind_t<int, simd::vec<float, 4>> exp(
    [](int i) { return i + 1; }); // {1, 2, 3, 4}

  simd::vec<float, 4> r = simd::ldexp(v, exp);

  for (std::size_t i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::ldexp[color ff0000]
* simd::vec[link basic_vec.md]
* simd::rebind_t[link rebind.md]

### 出力
```
2 8 24 64 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::frexp`](frexp.md)
- [`std::simd::scalbn`](scalbn.md)
- [`std::ldexp`](/reference/cmath/ldexp.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
