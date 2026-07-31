# bit_compress
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std::simd {
  template<simd-integral V>
  constexpr V
    bit_compress(const V& v, const V& m) noexcept;               // (1) C++29

  template<simd-integral V>
  constexpr V
    bit_compress(const V& v, typename V::value_type m) noexcept; // (2) C++29
}
```
* simd-integral[link /reference/simd/simd-integral.md]

## 概要
符号なし整数要素をもつ[`basic_vec`](basic_vec.md)の各要素に対して、`<bit>`ヘッダの[`std::bit_compress`](/reference/bit/bit_compress.md)を要素ごとに適用する。各要素について、マスクのビットが立っている位置の値`v`のビットを集め、下位ビットへ詰めて配置する。

- (1) : 各要素についてマスクを`m[i]`で指定する
- (2) : すべての要素について同一のマスク`m`を指定する


## テンプレートパラメータ制約
- `V::value_type`が符号なし整数型であること


## 戻り値
- (1) : `i`番目の要素が`std::bit_compress(v[i], m[i])`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す
- (2) : `i`番目の要素が`std::bit_compress(v[i], m)`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す


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
  // {0x0010, 0x0020, 0x0030, 0x0040}
  simd::vec<std::uint16_t, 4> v {[](int i) {
    return static_cast<std::uint16_t>((i + 1) << 4);
  }};

  // マスク0x00f0で立っているビット（第4〜7ビット）を下位へ詰める
  simd::vec<std::uint16_t, 4> r = simd::bit_compress(v, std::uint16_t{0x00f0});

  for (int i = 0; i < v.size(); ++i) {
    std::println("{:016b} -> {:016b}", v[i], r[i]);
  }
}
```
* simd::bit_compress[color ff0000]

### 出力
```
0000000000010000 -> 0000000000000001
0000000000100000 -> 0000000000000010
0000000000110000 -> 0000000000000011
0000000001000000 -> 0000000000000100
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::bit_expand`](bit_expand.md)


## 参照
- [P3104R3 Bit permutations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3104r3.html)
    - C++29で`<bit>`ヘッダにスカラー版の`bit_compress`が追加された
- [P3772R1 std::simd overloads for bit permutations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3772r1.html)
    - C++29で`std::simd`版のオーバーロードが追加された
