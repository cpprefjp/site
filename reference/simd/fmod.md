# fmod
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr deduced-vec-t<V> fmod(const V& x, const V& y);                     // (1) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V> fmod(const deduced-vec-t<V>& x, const V& y);  // (2) C++26
  template<math-floating-point V>
  constexpr deduced-vec-t<V> fmod(const V& x, const deduced-vec-t<V>& y);  // (3) C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]

## 概要
[`basic_vec`](basic_vec.md)の各要素について、`x`を`y`で割った剰余（`x - n * y`、`n`は`x / y`を0方向へ丸めた整数）を求める。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素の[`basic_vec`](basic_vec.md)、またはそこから[`basic_vec`](basic_vec.md)を導出可能なスカラー浮動小数点型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、`V`に対応する[`basic_vec`](basic_vec.md)型（`V`がスカラー型のときはそれを要素型とする[`basic_vec`](basic_vec.md)）を表す。

- (1) : 両引数が同じ型`V`の場合。
- (2), (3) : 一方の引数を[`basic_vec`](basic_vec.md)、他方をスカラー値として、スカラー側を全要素に対して適用する場合。


## 戻り値
各要素`i`について、`x`・`y`の対応する要素に[`<cmath>`](/reference/cmath.md)の[`fmod`](/reference/cmath/fmod.md)を適用した結果で初期化された[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)型のオブジェクトを返す。

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
  simd::vec<float, 4> x{[](int i) { return i + 5.0f; }}; // {5, 6, 7, 8}

  // 各要素を3.0で割った剰余（スカラーとの演算）
  simd::vec<float, 4> r = simd::fmod(x, 3.0f);

  for (int i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::fmod[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
2 0 1 2 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::remainder`](remainder.md)
- [`std::simd::remquo`](remquo.md)
- [`std::fmod`](/reference/cmath/fmod.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
- [P3844R4 Reword simd.math for consteval conversions](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3844r4.pdf)
    - `<cmath>`関数と同様に引数の変換を呼び出し側で行うよう、`<simd>`の数学関数が複数のオーバーロードとして再規定された（比較関数の戻り値型の修正・不足していたオーバーロードの追加を含む）
