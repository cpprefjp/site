# reduce_min_index
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<std::size_t Bytes, class Abi>
  constexpr simd-size-type
    reduce_min_index(const basic_mask<Bytes, Abi>& k); // (1) C++26

  constexpr simd-size-type
    reduce_min_index(std::same_as<bool> auto x);       // (2) C++26
}
```
* simd-size-type[link /reference/simd/simd-size-type.md]
* basic_mask[link basic_mask.md]
* std::same_as[link /reference/concepts/same_as.md]

## 概要
マスクのうち、`true`である要素の最小のインデックス（最初に`true`となる要素の位置）を取得する。

- (1) : [`basic_mask`](basic_mask.md)`k`のうち、`true`である要素の最小のインデックスを返す。
- (2) : スカラーの`bool`値`x`に対するオーバーロード（SIMD-genericなコードを書けるようにするためのもの）。

戻り値の型[`simd-size-type`](/reference/simd/simd-size-type.md)は、要素数を表す説明専用の符号付き整数型である。

## 事前条件
- (1) : [`any_of`](any_of.md)`(k)`が`true`であること
- (2) : `x`が`true`であること

## 戻り値
- (1) : `k[i]`が`true`となる最小のインデックス`i`を返す。
- (2) : `0`を返す。

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> v([](int i) { return i; }); // {0, 1, 2, 3}

  // 値が1より大きい最初の要素のインデックス
  std::println("{}", simd::reduce_min_index(v > 1));
}
```
* simd::reduce_min_index[color ff0000]
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
- [`std::simd::reduce_max_index`](reduce_max_index.md)
- [`std::simd::reduce_count`](reduce_count.md)
- [`std::simd::basic_mask`](basic_mask.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
