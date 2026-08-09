# cyl_neumann
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  deduced-vec-t<V> cyl_neumann(const V& nu, const V& x);                // (1) C++26
  template<math-floating-point V>
  deduced-vec-t<V> cyl_neumann(const deduced-vec-t<V>& nu, const V& x); // (2) C++26
  template<math-floating-point V>
  deduced-vec-t<V> cyl_neumann(const V& nu, const deduced-vec-t<V>& x); // (3) C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]

## 概要
浮動小数点要素型の[`basic_vec`](basic_vec.md)（またはスカラーの浮動小数点数）について、各要素に[`<cmath>`](/reference/cmath.md)の[`cyl_neumann`](/reference/cmath/cyl_neumann.md)を適用し、各要素を階数`nu`・引数`x`とする第二種ベッセル関数（ノイマン関数）の値を求める。

- (1) : すべての引数を`V`として受け取る。
- (2), (3) : 一方の引数をスカラー値（または対応する[`basic_vec`](basic_vec.md)）で受け取れるようにするオーバーロードである。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素型の[`basic_vec`](basic_vec.md)、またはスカラーの浮動小数点型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、`V`に対応するデータ並列型（`V`がスカラーの場合は既定のABIをもつ[`basic_vec`](basic_vec.md)）である。


## 戻り値
各要素`i`（`0`以上`deduced-vec-t<V>::size()`未満）について、`nu[i]`と`x[i]`に[`<cmath>`](/reference/cmath.md)の[`cyl_neumann`](/reference/cmath/cyl_neumann.md)を適用した結果で要素ごとに初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。

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
  simd::vec<double, 2> nu = 0.0;                         // {0, 0}
  simd::vec<double, 2> x([](int i) { return i + 1.0; }); // {1, 2}

  // 各要素を階数・引数とする第二種ベッセル関数を求める
  simd::vec<double, 2> r = simd::cyl_neumann(nu, x);

  for (std::size_t i = 0; i < r.size(); ++i) {
    std::print("{} ", r[i]);
  }
  std::println("");
}
```
* simd::cyl_neumann[color ff0000]

### 出力例
```
0.08825696421567697 0.5103756726497451 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::cyl_bessel_i`](cyl_bessel_i.md)
- [`std::simd::cyl_bessel_j`](cyl_bessel_j.md)
- [`std::simd::cyl_bessel_k`](cyl_bessel_k.md)
- [`std::cyl_neumann`](/reference/cmath/cyl_neumann.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
- [P3844R4 Reword simd.math for consteval conversions](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3844r4.pdf)
    - `<cmath>`関数と同様に引数の変換を呼び出し側で行うよう、`<simd>`の数学関数が複数のオーバーロードとして再規定された（比較関数の戻り値型の修正・不足していたオーバーロードの追加を含む）
