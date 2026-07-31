# bit_repeat
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std::simd {
  template<simd-integral V0, simd-integral V1>
  constexpr V0 bit_repeat(const V0& v0, const V1& v1); // (1) C++29

  template<simd-integral V>
  constexpr V bit_repeat(const V& v, int l);           // (2) C++29
}
```
* simd-integral[link /reference/simd/simd-integral.md]

## 概要
符号なし整数要素をもつ[`basic_vec`](basic_vec.md)の各要素に対して、`<bit>`ヘッダの[`std::bit_repeat`](/reference/bit/bit_repeat.md)を要素ごとに適用し、各要素の最下位から`l`ビットのパターンを、要素の幅を埋めるように繰り返す。

- (1) : 各要素について繰り返すビット数を`v1[i]`で指定する
- (2) : すべての要素について繰り返すビット数を同一の`l`で指定する


## テンプレートパラメータ制約
- (1) :
    - `V0::value_type`が符号なし整数型であること
    - `V1::value_type`が整数型であること
    - `V0::size() == V1::size()`が`true`であること
    - `sizeof(typename V0::value_type) == sizeof(typename V1::value_type)`が`true`であること
- (2) :
    - `V::value_type`が符号なし整数型であること


## 事前条件
- (1) : すべての要素について`v1[i] > 0`が`true`であること
- (2) : `l > 0`が`true`であること


## 戻り値
- (1) : `i`番目の要素が`std::bit_repeat(v0[i], static_cast<int>(v1[i]))`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す
- (2) : `i`番目の要素が`std::bit_repeat(v[i], l)`で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す


## 例外
投げない


## 備考
- 事前条件に違反する関数呼び出し式は、定数式として評価されない。


## 例
```cpp example
#include <simd>
#include <print>
#include <cstdint>

namespace simd = std::simd;

int main()
{
  // {0x0001, 0x0003, 0x0005, 0x0007}
  simd::vec<std::uint16_t, 4> v {[](int i) {
    return static_cast<std::uint16_t>(2 * i + 1);
  }};

  // 各要素の最下位4ビットのパターンを繰り返す
  simd::vec<std::uint16_t, 4> r = simd::bit_repeat(v, 4);

  for (int i = 0; i < v.size(); ++i) {
    std::println("{:016b} -> {:016b}", v[i], r[i]);
  }
}
```
* simd::bit_repeat[color ff0000]

### 出力
```
0000000000000001 -> 0001000100010001
0000000000000011 -> 0011001100110011
0000000000000101 -> 0101010101010101
0000000000000111 -> 0111011101110111
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
    - C++29で`<bit>`ヘッダにスカラー版の`bit_repeat`が追加された
- [P3772R1 std::simd overloads for bit permutations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3772r1.html)
    - C++29で`std::simd`版のオーバーロードが追加された
