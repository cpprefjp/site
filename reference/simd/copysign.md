# copysign
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr deduced-vec-t<V>
    copysign(const V& x, const V& y);                // (1) C++26

  template<math-floating-point V>
  constexpr deduced-vec-t<V>
    copysign(const deduced-vec-t<V>& x, const V& y); // (2) C++26

  template<math-floating-point V>
  constexpr deduced-vec-t<V>
    copysign(const V& x, const deduced-vec-t<V>& y); // (3) C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]

## 概要
浮動小数点要素型の[`basic_vec`](basic_vec.md)について、各要素`x[i]`の大きさと`y[i]`の符号を合成した値を求める。各要素に[`std::copysign`](/reference/cmath/copysign.md)を適用する。

- (1) : 両オペランドが同じ型の場合のオーバーロード。
- (2), (3) : 一方のオペランドがスカラー値であり、[`basic_vec`](basic_vec.md)へと変換される場合のオーバーロード。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素型の[`basic_vec`](basic_vec.md)、またはそれと組み合わせて[`basic_vec`](basic_vec.md)を導出できる型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、引数から導出される[`basic_vec`](basic_vec.md)型である。


## 戻り値
各要素`i`（`0`以上`deduced-vec-t<V>::size()`未満）について、`x[i]`の大きさと`y[i]`の符号を持つ値（`x[i]`と`y[i]`に[`std::copysign`](/reference/cmath/copysign.md)を適用した結果）で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。

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
  simd::vec<float, 4> mag([](int i) { return i + 1.0f; }); // {1, 2, 3, 4}
  simd::vec<float, 4> sign([](int i) { return i % 2 ? 1.0f : -1.0f; }); // {-1, 1, -1, 1}

  // magの大きさとsignの符号を合成する
  simd::vec<float, 4> r = simd::copysign(mag, sign);

  for (std::size_t i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::copysign[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
-1 2 -3 4 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::signbit`](signbit.md)
- [`std::simd::nextafter`](nextafter.md)
- [`std::copysign`](/reference/cmath/copysign.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
- [P3844R4 Reword simd.math for consteval conversions](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3844r4.pdf)
    - `<cmath>`関数と同様に引数の変換を呼び出し側で行うよう、`<simd>`の数学関数が複数のオーバーロードとして再規定された（比較関数の戻り値型の修正・不足していたオーバーロードの追加を含む）
