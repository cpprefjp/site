# reduce_count
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<std::size_t Bytes, class Abi>
  constexpr simd-size-type
    reduce_count(const basic_mask<Bytes, Abi>& k) noexcept; // (1) C++26

  constexpr simd-size-type
    reduce_count(std::same_as<bool> auto x) noexcept;       // (2) C++26
}
```
* simd-size-type[link /reference/simd/simd-size-type.md]
* basic_mask[link basic_mask.md]
* std::same_as[link /reference/concepts/same_as.md]

## 概要
マスクのうち、`true`である要素の数を数える。

- (1) : [`basic_mask`](basic_mask.md)`k`のうち、`true`である要素の数を返す。
- (2) : スカラーの`bool`値`x`をそのまま数として返す（SIMD-genericなコードを書けるようにするためのオーバーロード。`true`なら`1`、`false`なら`0`）。

戻り値の型[`simd-size-type`](/reference/simd/simd-size-type.md)は、要素数を表す説明専用の符号付き整数型である。

## 戻り値
- (1) : `k`のうち`true`である要素の数を返す。
- (2) : `x`を返す。

## 例外
投げない

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> v([](int i) { return i; }); // {0, 1, 2, 3}

  // 2未満の要素の数
  std::println("{}", simd::reduce_count(v < 2));
}
```
* simd::reduce_count[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
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
- [`std::simd::all_of`](all_of.md)
- [`std::simd::any_of`](any_of.md)
- [`std::simd::none_of`](none_of.md)
- [`std::simd::basic_mask`](basic_mask.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
