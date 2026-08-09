# isless
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<math-floating-point V>
  constexpr typename deduced-vec-t<V>::mask_type
    isless(const V& x, const V& y);                 // (1) C++26

  template<math-floating-point V>
  constexpr typename deduced-vec-t<V>::mask_type
    isless(const deduced-vec-t<V>& x, const V& y);  // (2) C++26

  template<math-floating-point V>
  constexpr typename deduced-vec-t<V>::mask_type
    isless(const V& x, const deduced-vec-t<V>& y);  // (3) C++26
}
```
* deduced-vec-t[link /reference/simd/deduced-vec-t.md]
* math-floating-point[link /reference/simd/math-floating-point.md]

## 概要
浮動小数点要素型の[`basic_vec`](basic_vec.md)について、各要素`x[i]`が`y[i]`より小さいかを判定する。各要素に[`std::isless`](/reference/cmath/isless.md)を適用する。浮動小数点例外を発生させずに比較を行う。

- (1) : 両オペランドが同じ型の場合のオーバーロード。
- (2), (3) : 一方のオペランドがスカラー値であり、[`basic_vec`](basic_vec.md)へと変換される場合のオーバーロード。

制約[`math-floating-point`](/reference/simd/math-floating-point.md)は、`V`が浮動小数点要素型の[`basic_vec`](basic_vec.md)、またはそれと組み合わせて[`basic_vec`](basic_vec.md)を導出できる型であることを表す説明専用のコンセプトである。[`deduced-vec-t<V>`](/reference/simd/deduced-vec-t.md)は、引数から導出される[`basic_vec`](basic_vec.md)型である。戻り値の型`deduced-vec-t<V>::mask_type`は、要素ごとの判定結果を保持する[`basic_mask`](basic_mask.md)である。


## 戻り値
各要素`i`（`0`以上`deduced-vec-t<V>::size()`未満）について、`x[i] < y[i]`であれば`true`、そうでなければ`false`となる[`basic_mask`](basic_mask.md)オブジェクトを返す。いずれかがNaNである要素は`false`となる。


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<float, 4> x([](int i) { return i + 1.0f; }); // {1, 2, 3, 4}
  simd::vec<float, 4> y = 2.5f;                          // 全要素が 2.5

  simd::vec<float, 4>::mask_type m = simd::isless(x, y);

  for (std::size_t i = 0; i < m.size(); ++i)
    std::print("{} ", m[i]);
  std::println("");
}
```
* simd::isless[color ff0000]
* simd::vec[link basic_vec.md]
* m.size()[link basic_mask/size.md]

### 出力
```
true true false false 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::islessequal`](islessequal.md)
- [`std::simd::isgreater`](isgreater.md)
- [`std::isless`](/reference/cmath/isless.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
- [P3844R4 Reword simd.math for consteval conversions](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3844r4.pdf)
    - `<cmath>`関数と同様に引数の変換を呼び出し側で行うよう、`<simd>`の数学関数が複数のオーバーロードとして再規定された（比較関数の戻り値型の修正・不足していたオーバーロードの追加を含む）
