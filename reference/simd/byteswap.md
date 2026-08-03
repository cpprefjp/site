# byteswap
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<simd-vec-type V>
  constexpr V byteswap(const V& v) noexcept; // C++26
}
```
* simd-vec-type[link /reference/simd/simd-vec-type.md]

## 概要
整数要素をもつ[`basic_vec`](basic_vec.md)の各要素に対して、[`std::byteswap`](/reference/bit/byteswap.md)を要素ごとに適用し、各要素を構成するバイト列の順序を反転する。


## テンプレートパラメータ制約
- `V::value_type`が整数型であること


## 戻り値
`i`番目の要素が[`std::byteswap`](/reference/bit/byteswap.md)`(v[i])`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。


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
  // {0x1122, 0xaabb}
  simd::vec<std::uint16_t, 2> v {[](int i) {
    return static_cast<std::uint16_t>(i == 0 ? 0x1122 : 0xaabb);
  }};

  simd::vec<std::uint16_t, 2> r = simd::byteswap(v);

  for (int i = 0; i < v.size(); ++i) {
    std::println("{:016b} -> {:016b}", v[i], r[i]);
  }
}
```
* simd::byteswap[color ff0000]

### 出力
```
0001000100100010 -> 0010001000010001
1010101010111011 -> 1011101110101010
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::byteswap`](/reference/bit/byteswap.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P2933R4 Extend `<bit>` header function with overloads for `std::simd`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2933r4.html)
    - C++26で`<bit>`ヘッダの関数に`std::simd`向けのオーバーロードが追加された
