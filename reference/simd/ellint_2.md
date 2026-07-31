# ellint_2
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  deduced-vec-t<V> ellint_2(const V& k, const V& phi);                // (1) C++26
  template<math-floating-point V>
  deduced-vec-t<V> ellint_2(const deduced-vec-t<V>& k, const V& phi); // (2) C++26
  template<math-floating-point V>
  deduced-vec-t<V> ellint_2(const V& k, const deduced-vec-t<V>& phi); // (3) C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]

## 概要
浮動小数点要素型の[`basic_vec`](basic_vec.md)（またはスカラーの浮動小数点数）について、各要素に[`<cmath>`](/reference/cmath.md)の[`ellint_2`](/reference/cmath/ellint_2.md)を適用し、各要素を母数`k`・振幅`phi`とする第二種不完全楕円積分の値を求める。

- (1) : すべての引数を`V`として受け取る。
- (2), (3) : 一方の引数をスカラー値（または対応する[`basic_vec`](basic_vec.md)）で受け取れるようにするオーバーロードである。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素型の[`basic_vec`](basic_vec.md)、またはスカラーの浮動小数点型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、`V`に対応するデータ並列型（`V`がスカラーの場合は既定のABIをもつ[`basic_vec`](basic_vec.md)）である。


## 戻り値
各要素`i`（`0`以上`deduced-vec-t<V>::size()`未満）について、`k[i]`と`phi[i]`に[`<cmath>`](/reference/cmath.md)の[`ellint_2`](/reference/cmath/ellint_2.md)を適用した結果で要素ごとに初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。

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
  simd::vec<double, 2> k = 0.0;                                  // {0, 0}
  simd::vec<double, 2> phi([](int i) { return i * 0.5 + 0.5; }); // {0.5, 1}

  // 各要素を母数・振幅とする第二種不完全楕円積分を求める
  simd::vec<double, 2> r = simd::ellint_2(k, phi);

  for (std::size_t i = 0; i < r.size(); ++i) {
    std::print("{} ", r[i]);
  }
  std::println("");
}
```
* simd::ellint_2[color ff0000]

### 出力例
```
0.5 1 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::ellint_1`](ellint_1.md)
- [`std::simd::ellint_3`](ellint_3.md)
- [`std::simd::comp_ellint_2`](comp_ellint_2.md)
- [`std::ellint_2`](/reference/cmath/ellint_2.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された

