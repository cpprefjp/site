# rotl
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<simd-vec-type V0, simd-vec-type V1>
  constexpr V0 rotl(const V0& v0, const V1& v1) noexcept; // (1) C++26

  template<simd-vec-type V>
  constexpr V rotl(const V& v, int s) noexcept;           // (2) C++26
}
```
* simd-vec-type[link /reference/simd/simd-vec-type.md]

## 概要
符号なし整数要素をもつ[`basic_vec`](basic_vec.md)の各要素に対して、[`std::rotl`](/reference/bit/rotl.md)を要素ごとに適用し、各要素のビットを左に循環シフトする。

- (1) : 各要素をシフト量`v1[i]`だけ左に循環シフトする
- (2) : 各要素を同一のシフト量`s`だけ左に循環シフトする


## テンプレートパラメータ制約
- (1) :
    - `V0::value_type`が符号なし整数型であること
    - `V1::value_type`が整数型であること
    - `V0::size() == V1::size()`が`true`であること
    - `sizeof(typename V0::value_type) == sizeof(typename V1::value_type)`が`true`であること
- (2) :
    - `V::value_type`が符号なし整数型であること


## 戻り値
- (1) : `i`番目の要素が[`std::rotl`](/reference/bit/rotl.md)`(v0[i], static_cast<int>(v1[i]))`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す
- (2) : `i`番目の要素が[`std::rotl`](/reference/bit/rotl.md)`(v[i], s)`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す


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

  // 各要素を4ビットだけ左に循環シフトする
  simd::vec<std::uint16_t, 4> r = simd::rotl(v, 4);

  for (int i = 0; i < v.size(); ++i) {
    std::println("{:016b} -> {:016b}", v[i], r[i]);
  }
}
```
* simd::rotl[color ff0000]

### 出力
```
0000000000000001 -> 0000000000010000
0000000000010000 -> 0000000100000000
0000000100000000 -> 0001000000000000
0001000000000000 -> 0000000000000001
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::rotl`](/reference/bit/rotl.md)
- [`std::simd::rotr`](rotr.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P2933R4 Extend `<bit>` header function with overloads for `std::simd`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2933r4.html)
    - C++26で`<bit>`ヘッダの関数に`std::simd`向けのオーバーロードが追加された
