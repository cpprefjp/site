# real
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<simd-complex V>
  constexpr rebind_t<simd-complex-value-type<V>, V> real(const V& v) noexcept; // C++26
}
```
* simd-complex-value-type[link /reference/simd/simd-complex-value-type.md]
* simd-complex[link /reference/simd/simd-complex.md]
* complex[link /reference/complex/complex.md]

## 概要
要素型が`std::complex<T>`の[`basic_vec`](basic_vec.md)について、各要素の実部を取り出し、実数型`T`を要素とする[`basic_vec`](basic_vec.md)として返す。

制約[`simd-complex`](/reference/simd/simd-complex.md)は、`V`が要素型`std::complex<T>`の[`basic_vec`](basic_vec.md)であることを表す説明専用のコンセプトである。[`simd-complex-value-type<V>`](/reference/simd/simd-complex-value-type.md)は`V`の要素型`std::complex<T>`における`T`（実数型）を表す。`rebind_t`は要素型を置き換えた[`basic_vec`](basic_vec.md)型を得る別名であり、戻り値の型は`V`の要素数はそのままに要素型を`T`とした[`basic_vec`](basic_vec.md)となる。


## 戻り値
各要素`i`（`0`以上`V::size()`未満）について、`v[i]`に[`<complex>`](/reference/complex/complex.md)の[`real`](/reference/complex/complex/real_free.md)を適用した結果で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。


## 例
```cpp example
#include <simd>
#include <complex>
#include <print>

namespace simd = std::simd;

int main()
{
  // 各要素が複素数のデータ並列型
  simd::vec<std::complex<float>, 2> v{
    [](int i) { return std::complex<float>(i + 1.0f, i + 0.5f); }
  };  // {(1, 0.5), (2, 1.5)}

  // 各要素の実部を取り出す
  simd::vec<float, 2> re = simd::real(v);

  for (std::size_t i = 0; i < re.size(); ++i)
    std::print("{} ", re[i]);
  std::println("");
}
```
* simd::real[color ff0000]

### 出力例
```
1 2 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::imag`](imag.md)
- [`std::simd::abs`](abs.md)
- [`std::simd::arg`](arg.md)
- [`std::simd::norm`](norm.md)
- [`std::simd::conj`](conj.md)
- [`std::complex::real`](/reference/complex/complex/real_free.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P2663R7 Interleaved complex values support in std::simd](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2663r7.html)
    - 要素型が複素数の`basic_vec`に対する複素数関連の関数が追加された
