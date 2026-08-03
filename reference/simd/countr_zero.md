# countr_zero
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<simd-vec-type V>
  constexpr rebind_t<make_signed_t<typename V::value_type>, V>
    countr_zero(const V& v) noexcept; // C++26
}
```
* simd-vec-type[link /reference/simd/simd-vec-type.md]
* make_signed_t[link /reference/type_traits/make_signed.md]

## 概要
符号なし整数要素をもつ[`basic_vec`](basic_vec.md)の各要素に対して、[`std::countr_zero`](/reference/bit/countr_zero.md)を要素ごとに適用し、各要素について最下位ビットから連続する0ビットの数を数える。


## テンプレートパラメータ制約
- `V::value_type`が符号なし整数型であること


## 戻り値
`i`番目の要素が[`std::countr_zero`](/reference/bit/countr_zero.md)`(v[i])`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。要素型は`V::value_type`を符号付き整数型にしたものである。


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
  // {0x0001, 0x0010, 0x0100, 0x1000}
  simd::vec<std::uint16_t, 4> v {[](int i) {
    return static_cast<std::uint16_t>(1u << (i * 4));
  }};

  auto r = simd::countr_zero(v);

  for (int i = 0; i < v.size(); ++i) {
    std::println("{:016b} -> {}", v[i], r[i]);
  }
}
```
* simd::countr_zero[color ff0000]

### 出力
```
0000000000000001 -> 0
0000000000010000 -> 4
0000000100000000 -> 8
0001000000000000 -> 12
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::countr_zero`](/reference/bit/countr_zero.md)
- [`std::simd::countr_one`](countr_one.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P2933R4 Extend `<bit>` header function with overloads for `std::simd`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2933r4.html)
    - C++26で`<bit>`ヘッダの関数に`std::simd`向けのオーバーロードが追加された
