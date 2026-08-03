# frexp
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr deduced-vec-t<V>
    frexp(const V& value,
          rebind_t<int, deduced-vec-t<V>>* exp); // C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]
* rebind_t[link rebind.md]

## 概要
浮動小数点要素型の[`basic_vec`](basic_vec.md)について、各要素を正規化された仮数部と2を底とする指数部に分解する。各要素に[`std::frexp`](/reference/cmath/frexp.md)を適用する。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素型の[`basic_vec`](basic_vec.md)、またはそれと組み合わせて[`basic_vec`](basic_vec.md)を導出できる型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、引数から導出される[`basic_vec`](basic_vec.md)型である。


## 効果
各要素`i`（`0`以上`deduced-vec-t<V>::size()`未満）について、`value[i]`の指数部を格納した整数要素の[`basic_vec`](basic_vec.md)を`*exp`に設定する。


## 戻り値
各要素`i`について、`value[i]`の仮数部（絶対値が`0.5`以上`1`未満、または`0`）で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<float, 4> v([](int i) { return i + 1.0f; }); // {1, 2, 3, 4}

  simd::rebind_t<int, simd::vec<float, 4>> exp;
  simd::vec<float, 4> m = simd::frexp(v, &exp);

  for (std::size_t i = 0; i < v.size(); ++i)
    std::print("{}*2^{} ", m[i], exp[i]);
  std::println("");
}
```
* simd::frexp[color ff0000]
* simd::vec[link basic_vec.md]
* simd::rebind_t[link rebind.md]

### 出力
```
0.5*2^1 0.5*2^2 0.75*2^2 0.5*2^3 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::ldexp`](ldexp.md)
- [`std::simd::modf`](modf.md)
- [`std::simd::logb`](logb.md)
- [`std::frexp`](/reference/cmath/frexp.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
