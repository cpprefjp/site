# ilogb
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr rebind_t<int, deduced-vec-t<V>>
    ilogb(const V& x); // C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]
* rebind_t[link rebind.md]

## 概要
浮動小数点要素型の[`basic_vec`](basic_vec.md)について、各要素の指数部を`int`型の整数として取り出す。各要素に[`std::ilogb`](/reference/cmath/ilogb.md)を適用する。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素型の[`basic_vec`](basic_vec.md)、またはそれと組み合わせて[`basic_vec`](basic_vec.md)を導出できる型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、引数から導出される[`basic_vec`](basic_vec.md)型である。戻り値の型は、要素型を`int`とした整数の[`basic_vec`](basic_vec.md)となる。


## 戻り値
各要素`i`（`0`以上`deduced-vec-t<V>::size()`未満）について、`x[i]`に[`std::ilogb`](/reference/cmath/ilogb.md)を適用した結果で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。

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
  simd::vec<float, 4> v{
    [](int i) { return 1.0f * (1 << i); }
  }; // {1, 2, 4, 8}

  simd::rebind_t<int, simd::vec<float, 4>> r = simd::ilogb(v);

  for (std::size_t i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::ilogb[color ff0000]
* simd::vec[link basic_vec.md]
* simd::rebind_t[link rebind.md]

### 出力
```
0 1 2 3 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::logb`](logb.md)
- [`std::simd::frexp`](frexp.md)
- [`std::ilogb`](/reference/cmath/ilogb.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
