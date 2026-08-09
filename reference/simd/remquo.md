# remquo
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr deduced-vec-t<V>
    remquo(const V& x, const V& y,
           rebind_t<int, deduced-vec-t<V>>* quo);  // (1) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V>
    remquo(const deduced-vec-t<V>& x, const V& y,
           rebind_t<int, deduced-vec-t<V>>* quo);  // (2) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V>
    remquo(const V& x, const deduced-vec-t<V>& y,
           rebind_t<int, deduced-vec-t<V>>* quo);  // (3) C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]
* rebind_t[link rebind.md]

## 概要
[`basic_vec`](basic_vec.md)の各要素について、[`remainder`](remainder.md)と同じIEEE剰余を求めると同時に、商`x / y`の下位ビット（符号付き）を`*quo`に格納する。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素の[`basic_vec`](basic_vec.md)、またはそこから[`basic_vec`](basic_vec.md)を導出可能なスカラー浮動小数点型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、`V`に対応する[`basic_vec`](basic_vec.md)型（`V`がスカラー型のときはそれを要素型とする[`basic_vec`](basic_vec.md)）を表す。

- (1) : 両引数が同じ型`V`の場合。
- (2), (3) : 一方の引数を[`basic_vec`](basic_vec.md)、他方をスカラー値として、スカラー側を全要素に対して適用する場合。


## 効果
各要素`i`について、`x`・`y`の対応する要素に[`<cmath>`](/reference/cmath.md)の[`remquo`](/reference/cmath/remquo.md)を適用したときの商側の結果で初期化された`rebind_t<int, deduced-vec-t<V>>`型のオブジェクトを`*quo`に格納する。


## 戻り値
各要素`i`について、`x`・`y`の対応する要素に[`<cmath>`](/reference/cmath.md)の[`remquo`](/reference/cmath/remquo.md)を適用したときの剰余で初期化された[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)型のオブジェクトを返す。

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
  simd::vec<float, 4> x{[](int i) { constexpr float a[] = {5, 7, 9, 11}; return a[i]; }};

  simd::rebind_t<int, simd::vec<float, 4>> quo;

  // 各要素の3.0に対するIEEE剰余と、商の下位ビットを求める
  simd::vec<float, 4> r = simd::remquo(x, 3.0f, &quo);

  for (int i = 0; i < r.size(); ++i)
    std::print("{}(quo={}) ", r[i], quo[i]);
  std::println("");
}
```
* simd::remquo[color ff0000]
* simd::vec[link basic_vec.md]
* simd::rebind_t[link rebind.md]

### 出力
```
-1(quo=2) 1(quo=2) 0(quo=3) -1(quo=4) 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::fmod`](fmod.md)
- [`std::simd::remainder`](remainder.md)
- [`std::remquo`](/reference/cmath/remquo.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
- [P3844R4 Reword simd.math for consteval conversions](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3844r4.pdf)
    - `<cmath>`関数と同様に引数の変換を呼び出し側で行うよう、`<simd>`の数学関数が複数のオーバーロードとして再規定された（比較関数の戻り値型の修正・不足していたオーバーロードの追加を含む）
