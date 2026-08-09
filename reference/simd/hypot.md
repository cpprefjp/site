# hypot
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr deduced-vec-t<V> hypot(const V& x, const V& y);                          // (1) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V> hypot(const deduced-vec-t<V>& x, const V& y);       // (2) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V> hypot(const V& x, const deduced-vec-t<V>& y);       // (3) C++26

  template<math-floating-point V>
  constexpr deduced-vec-t<V> hypot(const V& x, const V& y, const V& z);              // (4) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V> hypot(const deduced-vec-t<V>& x,
                                       const V& y, const V& z);                          // (5) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V> hypot(const V& x,
                                       const deduced-vec-t<V>& y, const V& z);       // (6) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V> hypot(const V& x, const V& y,
                                       const deduced-vec-t<V>& z);                   // (7) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V> hypot(const deduced-vec-t<V>& x,
                                       const deduced-vec-t<V>& y, const V& z);       // (8) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V> hypot(const deduced-vec-t<V>& x, const V& y,
                                       const deduced-vec-t<V>& z);                   // (9) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V> hypot(const V& x, const deduced-vec-t<V>& y,
                                       const deduced-vec-t<V>& z);                   // (10) C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]

## 概要
浮動小数点数型を要素とする[`basic_vec`](basic_vec.md)について、各要素の直角三角形の斜辺の長さ（引数の平方和の平方根）を求める。各要素に[`<cmath>`](/reference/cmath.md)の[`hypot`](/reference/cmath/hypot.md)を要素ごとに適用したものである。

- (1) : 2引数版。両引数を`V`として受け取り、各要素について<code>&#x221A;<span style="text-decoration:overline">&#xA0;x<sup>2</sup> + y<sup>2</sup>&#xA0;</span></code>を求める。
- (2), (3) : 2引数版で、一方の引数をスカラー値（または対応する[`basic_vec`](basic_vec.md)）で受け取れるようにするオーバーロードである。
- (4) : 3引数版。3引数を`V`として受け取り、各要素について<code>&#x221A;<span style="text-decoration:overline">&#xA0;x<sup>2</sup> + y<sup>2</sup> + z<sup>2</sup>&#xA0;</span></code>を求める。
- (5)〜(10) : 3引数版で、一部の引数をスカラー値（または対応する[`basic_vec`](basic_vec.md)）で受け取れるようにするオーバーロードである。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点数型を要素とする[`basic_vec`](basic_vec.md)であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は`V`から導出される[`basic_vec`](basic_vec.md)型（通常は`V`自身）を表す。一部の引数を[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)とするオーバーロードにより、スカラー値を渡して全要素にブロードキャストできる。


## 戻り値
各要素`i`（`0`以上`V::size()`未満）について、各引数の第`i`要素に[`<cmath>`](/reference/cmath.md)の[`hypot`](/reference/cmath/hypot.md)を適用した結果に要素ごとに等しい[`basic_vec`](basic_vec.md)オブジェクトを返す。

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
  simd::vec<float, 4> x([](int i) { return float(i + 1); }); // {1, 2, 3, 4}
  simd::vec<float, 4> y{[](int i) {
    float table[] = {0.0f, 0.0f, 4.0f, 3.0f};
    return table[i];
  }};

  // 各要素について sqrt(x^2 + y^2) を求める
  simd::vec<float, 4> r = simd::hypot(x, y);

  for (std::size_t i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::hypot[color ff0000]

### 出力例
```
1 2 5 5 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::sqrt`](sqrt.md)
- [`std::simd::pow`](pow.md)
- [`std::hypot`](/reference/cmath/hypot.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
- [P3844R4 Reword simd.math for consteval conversions](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3844r4.pdf)
    - `<cmath>`関数と同様に引数の変換を呼び出し側で行うよう、`<simd>`の数学関数が複数のオーバーロードとして再規定された（比較関数の戻り値型の修正・不足していたオーバーロードの追加を含む）
