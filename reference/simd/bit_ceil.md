# bit_ceil
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<simd-vec-type V>
  constexpr V bit_ceil(const V& v); // C++26
}
```
* simd-vec-type[link /reference/simd/simd-vec-type.md]

## 概要
符号なし整数要素をもつ[`basic_vec`](basic_vec.md)の各要素に対して、[`std::bit_ceil`](/reference/bit/bit_ceil.md)を要素ごとに適用し、各要素以上で最小の2の累乗を求める。


## テンプレートパラメータ制約
- `V::value_type`が符号なし整数型であること


## 事前条件
すべての要素`v[i]`について、`v[i]`以上で最小の2の累乗が`V::value_type`型で表現可能であること。


## 戻り値
`i`番目の要素が[`std::bit_ceil`](/reference/bit/bit_ceil.md)`(v[i])`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。


## 例外
投げない


## 備考
- 事前条件に違反する関数呼び出し式は、定数式として評価されない。


## 例
```cpp example
#include <simd>
#include <print>
#include <array>
#include <cstdint>

namespace simd = std::simd;

int main()
{
  std::array data = {0b0011u, 0b0101u, 0b1000u, 0b1001u};
  simd::vec<std::uint32_t, 4> v {[&](int i) { return data[i]; }};

  simd::vec<std::uint32_t, 4> r = simd::bit_ceil(v);

  for (int i = 0; i < v.size(); ++i) {
    std::println("{:016b} -> {:016b}", v[i], r[i]);
  }
}
```
* simd::bit_ceil[color ff0000]

### 出力
```
0000000000000011 -> 0000000000000100
0000000000000101 -> 0000000000001000
0000000000001000 -> 0000000000001000
0000000000001001 -> 0000000000010000
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::bit_ceil`](/reference/bit/bit_ceil.md)
- [`std::simd::bit_floor`](bit_floor.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P2933R4 Extend `<bit>` header function with overloads for `std::simd`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2933r4.html)
    - C++26で`<bit>`ヘッダの関数に`std::simd`向けのオーバーロードが追加された
- [LWG Issue 4375. `std::simd::bit_ceil` should not be `noexcept`](https://cplusplus.github.io/LWG/issue4375)
    - C++26で、`bit_ceil`から`noexcept`指定が削除された。結果が表現できない場合に事前条件違反となりうるため、スカラー版の[`std::bit_ceil`](/reference/bit/bit_ceil.md)と同様に`noexcept`を付けない形に修正された
