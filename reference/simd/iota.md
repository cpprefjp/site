# iota
* simd[meta header]
* std::simd[meta namespace]
* variable[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std::simd {
  template<class T>
  constexpr T iota = /*see below*/;
}
```

## 概要
`iota`は、`0, 1, 2, …`という連番を要素とするデータ並列オブジェクトを表す変数テンプレートである。

SIMDプログラミングでは、各レーンのインデックスに相当する連番`0, 1, 2, …`が頻出する。`iota`を使うと、ジェネレータコンストラクタ（`vec<int>([](int i) { return i; })`）よりも簡潔に、かつSIMD幅に応じてスケールする形でこの定数を記述できる。スケールやオフセットを組み合わせて任意の等差数列を作れる。

- `T`が[`basic_vec`](basic_vec.md)の場合: 各要素がそのインデックスに等しいデータ並列オブジェクト（`{0, 1, …, T::size() - 1}`）となる。
- `T`がスカラーの算術型の場合: 値`0`（`T()`）となる。SIMD-genericなコードで、データ並列型とスカラーを統一的に扱うための縮退ケースである。


## 適格要件
次のいずれかを満たすこと。

- `T`が[「vectorizable type」](/reference/simd.md#vectorizable-type)であり、[`std::is_arithmetic_v`](/reference/type_traits/is_arithmetic.md)`<T>`が`true`であること
- `T`が[`basic_vec`](basic_vec.md)の有効な特殊化であり、[`std::is_arithmetic_v`](/reference/type_traits/is_arithmetic.md)`<typename T::value_type>`が`true`であり、かつ`T::size() - 1`が[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<typename T::value_type>::max()`以下であること（連番が要素型で表現でき、オーバーフローしないこと）


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  // 各要素がインデックスに等しい連番
  simd::vec<int, 4> a = simd::iota<simd::vec<int, 4>>;         // {0, 1, 2, 3}

  // スケールとオフセットを適用した等差数列
  simd::vec<int, 4> b = 2 + 3 * simd::iota<simd::vec<int, 4>>; // {2, 5, 8, 11}

  for (int i = 0; i < a.size(); ++i)
    std::print("{} ", a[i]);
  std::println("");
  for (int i = 0; i < b.size(); ++i)
    std::print("{} ", b[i]);
  std::println("");
}
```
* simd::iota[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
0 1 2 3 
2 5 8 11 
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec`](basic_vec.md)
- [`std::iota`](/reference/numeric/iota.md)


## 参照
- [P3319R6 Add an iota object for simd (and more)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3319r6.pdf)
    - C++29で追加された
