# bit_reverse
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std::simd {
  template<simd-integral V>
  constexpr V bit_reverse(const V& v) noexcept; // C++29
}
```
* simd-integral[link /reference/simd/simd-integral.md]

## 概要
符号なし整数要素をもつ[`basic_vec`](basic_vec.md)の各要素に対して、`<bit>`ヘッダの[`std::bit_reverse`](/reference/bit/bit_reverse.md)を要素ごとに適用し、各要素のビット列の並びを反転する。


## テンプレートパラメータ制約
- `V::value_type`が符号なし整数型であること


## 戻り値
`i`番目の要素が`std::bit_reverse(v[i])`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。


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
  // {0x0001, 0x0002, 0x0004, 0x0008}
  simd::vec<std::uint16_t, 4> v {[](int i) {
    return static_cast<std::uint16_t>(1u << i);
  }};

  simd::vec<std::uint16_t, 4> r = simd::bit_reverse(v);

  for (int i = 0; i < v.size(); ++i) {
    std::println("{:016b} -> {:016b}", v[i], r[i]);
  }
}
```
* simd::bit_reverse[color ff0000]

### 出力
```
0000000000000001 -> 1000000000000000
0000000000000010 -> 0100000000000000
0000000000000100 -> 0010000000000000
0000000000001000 -> 0001000000000000
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


## 参照
- [P3104R3 Bit permutations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3104r3.html)
    - C++29で`<bit>`ヘッダにスカラー版の`bit_reverse`が追加された
- [P3772R1 std::simd overloads for bit permutations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3772r1.html)
    - C++29で`std::simd`版のオーバーロードが追加された
