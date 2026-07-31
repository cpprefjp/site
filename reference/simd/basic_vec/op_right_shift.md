# operator>>
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend constexpr basic_vec
  operator>>(const basic_vec& lhs, const basic_vec& rhs) noexcept; // (1)

friend constexpr basic_vec
  operator>>(const basic_vec& v, simd-size-type n) noexcept;       // (2)
```
* simd-size-type[link /reference/simd/simd-size-type.md]

## 概要
[`basic_vec`](../basic_vec.md)オブジェクトの各要素を右ビットシフトする。要素型が整数型である場合に使用できる。

- (1) : 対応する要素同士で、`lhs`の各要素を`rhs`の対応する要素分だけ右シフトする。
- (2) : `v`の各要素を、スカラ値`n`分だけ右シフトする。

いずれも*Hidden friends*として定義される。


## テンプレートパラメータ制約
- (1) : 式`a >> b`（`a`と`b`は`value_type`型）が適格であること。
- (2) : 式`a >> b`（`a`は`value_type`型、`b`は`simd-size-type`型）が適格であること。


## 戻り値
- (1) : `lhs`と`rhs`に右シフトを要素ごとに適用した結果で初期化された[`basic_vec`](../basic_vec.md)オブジェクトを返す。
- (2) : `i`番目の要素を`v[i] >> n`とした[`basic_vec`](../basic_vec.md)オブジェクトを返す。


## 例
```cpp example
#include <simd>
#include <print>
#include <cstdint>

namespace simd = std::simd;

int main()
{
  simd::vec<std::uint8_t, 4> a = std::uint8_t{16};    // {16, 16, 16, 16}
  simd::vec<std::uint8_t, 4> b = [](int i) { return static_cast<std::uint8_t>(i + 1); };  // {1, 2, 3, 4}

  // (1) 要素ごとのシフト量
  simd::vec<std::uint8_t, 4> c = a >> b;

  // (2) スカラのシフト量
  simd::vec<std::uint8_t, 4> e = [](int i) { return static_cast<std::uint8_t>(16 << i); };  // {16, 32, 64, 128}
  simd::vec<std::uint8_t, 4> d = e >> 2;

  for (int i = 0; i < c.size(); ++i) {
    std::println("{:08b} >> {:08b} -> {:08b}", a[i], b[i], c[i]);
  }
  for (int i = 0; i < d.size(); ++i) {
    std::println("{:08b} >> 2 -> {:08b}", e[i], d[i]);
  }
}
```
* simd::vec[color ff0000]
* c.size()[link size.md]
* d.size()[link size.md]

### 出力
```
00010000 >> 00000001 -> 00001000
00010000 >> 00000010 -> 00000100
00010000 >> 00000011 -> 00000010
00010000 >> 00000100 -> 00000001
00010000 >> 2 -> 00000100
00100000 >> 2 -> 00001000
01000000 >> 2 -> 00010000
10000000 >> 2 -> 00100000
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec`](../basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
