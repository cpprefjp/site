# reduce_min
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class Abi>
  constexpr T
    reduce_min(const basic_vec<T, Abi>& x) noexcept; // (1) C++26

  template<class T, class Abi>
  constexpr T
    reduce_min(const basic_vec<T, Abi>& x,
               const typename basic_vec<T, Abi>::mask_type& mask) noexcept; // (2) C++26

  template<class T>
  constexpr T
    reduce_min(const T& x) noexcept; // (3) C++26

  template<class T>
  constexpr T
    reduce_min(const T& x,
               std::same_as<bool> auto mask) noexcept; // (4) C++26
}
```
* basic_vec[link basic_vec.md]
* std::same_as[link /reference/concepts/same_as.md]

## 概要
[`basic_vec`](basic_vec.md)の要素のうち、最小の値を取得する。

- (1) : `x`の全要素の最小値を返す。
- (2) : `mask`で選択された要素の最小値を返す。ひとつも選択されていない場合は`T`の最大値を返す。
- (3) : スカラー値`x`をそのまま返す（SIMD-genericなコードを書けるようにするためのオーバーロード）。
- (4) : `mask`が`true`なら`x`を、`false`なら`T`の最大値を返す。

## テンプレートパラメータ制約
- (1), (2) : `T`が[`std::totally_ordered`](/reference/concepts/totally_ordered.md)のモデルであること
- (3), (4) : `T`が[「vectorizable type」](/reference/simd.md#vectorizable-type)であり、かつ[`std::totally_ordered`](/reference/concepts/totally_ordered.md)のモデルであること

## 戻り値
- (1) : すべての`i`（`0`以上`x.size()`未満）について`x[i] < x[j]`が`false`となるような要素`x[j]`の値を返す。
- (2) : [`none_of`](none_of.md)`(mask)`が`true`なら[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<T>::max()`を返す。そうでなければ、`mask`で選択されたすべてのインデックス`i`について`x[i] < x[j]`が`false`となるような選択要素`x[j]`の値を返す。
- (3) : `x`を返す。
- (4) : `mask`が`false`なら[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<T>::max()`を、そうでなければ`x`を返す。

## 例外
投げない

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> v([](int i) { return 3 - i; }); // {3, 2, 1, 0}

  // 全要素の最小値
  std::println("{}", simd::reduce_min(v));

  // 選択された要素（値が2以上）の最小値
  std::println("{}", simd::reduce_min(v, v >= 2));
}
```
* simd::reduce_min[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
0
2
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::reduce_max`](reduce_max.md)
- [`std::simd::reduce`](reduce.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
- [P3690R1 Consistency fix: Make simd reductions SIMD-generic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3690r1.pdf)
    - スカラー[「vectorizable type」](/reference/simd.md#vectorizable-type)を受け取るオーバーロード (3), (4) が追加され、SIMD-genericなコードを書けるようになった
