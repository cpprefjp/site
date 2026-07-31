# has_single_bit
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<simd-vec-type V>
  constexpr typename V::mask_type has_single_bit(const V& v) noexcept; // C++26
}
```
* simd-vec-type[link /reference/simd/simd-vec-type.md]

## 概要
符号なし整数要素をもつ[`basic_vec`](basic_vec.md)の各要素に対して、[`std::has_single_bit`](/reference/bit/has_single_bit.md)を要素ごとに適用し、各要素がちょうど1つのビットだけを立てているか（2の累乗であるか）を判定する。


## テンプレートパラメータ制約
- `V::value_type`が符号なし整数型であること


## 戻り値
`i`番目の要素が[`std::has_single_bit`](/reference/bit/has_single_bit.md)`(v[i])`で初期化された[`basic_mask`](basic_mask.md)オブジェクトを返す。


## 例外
投げない


## 例
```cpp example
#include <simd>
#include <print>
#include <cstdint>

namespace simd = std::simd;

int main()
{
  // {1, 2, 3, 4}
  simd::vec<std::uint32_t, 4> v {[](int i) { return i + 1; }};

  auto m = simd::has_single_bit(v);

  for (int i = 0; i < v.size(); ++i) {
    std::println("{:016b} -> {}", v[i], m[i]);
  }
}
```
* simd::has_single_bit[color ff0000]

### 出力
```
0000000000000001 -> true
0000000000000010 -> true
0000000000000011 -> false
0000000000000100 -> true
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::has_single_bit`](/reference/bit/has_single_bit.md)
- [`std::simd::basic_mask`](basic_mask.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P2933R4 Extend `<bit>` header function with overloads for `std::simd`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2933r4.html)
    - C++26で`<bit>`ヘッダの関数に`std::simd`向けのオーバーロードが追加された
