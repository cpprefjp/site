# atan2
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr deduced-vec-t<V>
    atan2(const V& y, const V& x);                // (1) C++26

  template<math-floating-point V>
  constexpr deduced-vec-t<V>
    atan2(const deduced-vec-t<V>& x, const V& y); // (2) C++26

  template<math-floating-point V>
  constexpr deduced-vec-t<V>
    atan2(const V& x, const deduced-vec-t<V>& y); // (3) C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]

## 概要
要素型が浮動小数点数の[`basic_vec`](basic_vec.md)、またはスカラーの浮動小数点数の2つの引数`y`・`x`について、各要素の逆正接（`y/x`のアークタンジェント）を、両引数の符号から適切な象限を選択して求める。

- (1) : 両引数を`V`として受け取る。
- (2), (3) : 一方の引数をスカラー値（または対応する[`basic_vec`](basic_vec.md)）で受け取れるようにするオーバーロードである。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点数の[「vectorizable type」](/reference/simd.md#vectorizable-type)を要素とする[`basic_vec`](basic_vec.md)、またはスカラーの浮動小数点数であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、`V`に対応する[`basic_vec`](basic_vec.md)型（`decltype(x + x)`）である。


## 戻り値
各要素`i`について、対応する各要素に[`<cmath>`](/reference/cmath.md)の[`atan2`](/reference/cmath/atan2.md)を適用した結果を要素とする[`basic_vec`](basic_vec.md)オブジェクトを返す。

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
  simd::vec<float, 4> y = 1.0f;                          // {1, 1, 1, 1}
  simd::vec<float, 4> x([](int i) { return i + 1.0f; }); // {1, 2, 3, 4}

  // 各要素の逆正接を求める
  simd::vec<float, 4> r = simd::atan2(y, x);

  for (std::size_t i = 0; i < r.size(); ++i) {
    std::print("{} ", r[i]);
  }
  std::println("");
}
```
* simd::atan2[color ff0000]

### 出力例
```
0.785398 0.463648 0.321751 0.244979 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::atan`](atan.md)
- [`std::simd::tan`](tan.md)
- [`atan2`](/reference/cmath/atan2.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
