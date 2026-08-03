# polar
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<simd-floating-point V>
  rebind_t<complex<typename V::value_type>, V> polar(const V& x, const V& y = {}); // C++26
}
```
* simd-floating-point[link /reference/simd/simd-floating-point.md]
* complex[link /reference/complex/complex.md]

## 概要
実数型を要素とする[`basic_vec`](basic_vec.md)から、極形式で指定した複素数を要素ごとに生成する。`x`が絶対値、`y`が偏角（位相角）を表す。

制約[`simd-floating-point`](/reference/simd/simd-floating-point.md)は、`V`が浮動小数点型を要素とする[`basic_vec`](basic_vec.md)であることを表す説明専用のコンセプトである。戻り値の型は`V`の要素数はそのままに、要素型を`std::complex<T>`（`T`は`V`の要素型）とした[`basic_vec`](basic_vec.md)となる。


## 戻り値
各要素`i`（`0`以上`V::size()`未満）について、`x[i]`と`y[i]`に[`<complex>`](/reference/complex/complex.md)の[`polar`](/reference/complex/complex/polar.md)を適用した結果で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。

ある要素`i`について定義域エラー・極エラー・値域エラーが発生する場合、その要素の値は未規定である。


## 備考
[`errno`](/reference/cerrno/errno.md)にアクセスするか否かは未規定である。


## 例
```cpp example
#include <simd>
#include <complex>
#include <numbers>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<float, 2> rho = 1.0f; // {1, 1}
  simd::vec<float, 2> theta = std::numbers::pi_v<float> / 4.0f; // {π/4, π/4}

  // 極形式から複素数を要素ごとに生成する
  simd::vec<std::complex<float>, 2> r = simd::polar(rho, theta);

  for (std::size_t i = 0; i < r.size(); ++i) {
    std::complex<float> c = r[i];
    std::print("({}, {}) ", c.real(), c.imag());
  }
  std::println("");
}
```
* simd::polar[color ff0000]
* std::numbers::pi_v[link /reference/numbers/pi.md]

### 出力例
```
(0.707107, 0.707107) (0.707107, 0.707107) 
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
- [`std::complex::polar`](/reference/complex/complex/polar.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P2663R7 Interleaved complex values support in std::simd](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2663r7.html)
    - 要素型が複素数の`basic_vec`に対する複素数関連の関数が追加された
