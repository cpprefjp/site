# norm
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<simd-complex V>
  constexpr rebind_t<simd-complex-value-type<V>, V> norm(const V& v); // C++26
}
```
* simd-complex-value-type[link /reference/simd/simd-complex-value-type.md]
* simd-complex[link /reference/simd/simd-complex.md]
* complex[link /reference/complex/complex.md]

## 概要
要素型が`std::complex<T>`の[`basic_vec`](basic_vec.md)について、各要素のノルム（絶対値の2乗）を求め、実数型`T`を要素とする[`basic_vec`](basic_vec.md)として返す。

制約[`simd-complex`](/reference/simd/simd-complex.md)は、`V`が要素型`std::complex<T>`の[`basic_vec`](basic_vec.md)であることを表す説明専用のコンセプトである。[`simd-complex-value-type<V>`](/reference/simd/simd-complex-value-type.md)は`V`の要素型`std::complex<T>`における`T`（実数型）を表す。戻り値の型は`V`の要素数はそのままに要素型を`T`とした[`basic_vec`](basic_vec.md)となる。


## 戻り値
各要素`i`（`0`以上`V::size()`未満）について、`v[i]`に[`<complex>`](/reference/complex/complex.md)の[`norm`](/reference/complex/complex/norm.md)を適用した結果で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。

ある要素`i`について定義域エラー・極エラー・値域エラーが発生する場合、その要素の値は未規定である。


## 備考
[`errno`](/reference/cerrno/errno.md)にアクセスするか否かは未規定である。


## 例
```cpp example
#include <simd>
#include <complex>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<std::complex<float>, 2> v{
    [](int i) { return std::complex<float>(i + 1.0f, i + 2.0f); }
  };  // {(1, 2), (2, 3)}

  // 各要素のノルム（絶対値の2乗）を求める
  simd::vec<float, 2> n = simd::norm(v);

  for (std::size_t i = 0; i < n.size(); ++i)
    std::print("{} ", n[i]);
  std::println("");
}
```
* simd::norm[color ff0000]

### 出力例
```
5 13 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::abs`](abs.md)
- [`std::simd::arg`](arg.md)
- [`std::simd::conj`](conj.md)
- [`std::simd::real`](real.md)
- [`std::simd::imag`](imag.md)
- [`std::complex::norm`](/reference/complex/complex/norm.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P2663R7 Interleaved complex values support in std::simd](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2663r7.html)
    - 要素型が複素数の`basic_vec`に対する複素数関連の関数が追加された
