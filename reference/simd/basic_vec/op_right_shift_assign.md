# operator>>=
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend constexpr basic_vec&
  operator>>=(basic_vec& lhs, const basic_vec& rhs) noexcept; // (1)
friend constexpr basic_vec&
  operator>>=(basic_vec& lhs, simd-size-type n) noexcept;     // (2)
```
* simd-size-type[link /reference/simd/simd-size-type.md]
* basic_vec[color ff0000]

## 概要
[`basic_vec`](../basic_vec.md)オブジェクトの各要素を右ビットシフトし、その結果を左辺に代入する。

- (1) : 各要素を、`rhs`の対応する要素が示すビット数だけ右シフトする
- (2) : 全要素を`n`ビットだけ右シフトする

[`simd-size-type`](/reference/simd/simd-size-type.md)は、要素の添字を表現できる符号付き整数型の説明専用の別名である。

## テンプレートパラメータ制約
- (1) : `value_type`型の値`a`, `b`に対して、式`a >> b`が有効であること
- (2) : `value_type`型の値`a`と[`simd-size-type`](/reference/simd/simd-size-type.md)型の値`b`に対して、式`a >> b`が有効であること

## 効果
- (1) : `lhs`と`rhs`に対して、右ビットシフトを要素ごとの演算として適用する
- (2) : 以下と等価である

    ```cpp
    return operator>>(lhs, basic_vec(n));
    ```

## 戻り値
`lhs`

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
  simd::vec<std::uint8_t, 4> a = [](int i) { return static_cast<std::uint8_t>((i + 1) * 8); };  // {8, 16, 24, 32}

  simd::vec<std::uint8_t, 4> a0 = a;  // 演算前の値
  a >>= 1; // 全要素を1ビット右シフト（1/2倍）

  for (int i = 0; i < a.size(); ++i) {
    std::println("{:08b} >> 1 -> {:08b}", a0[i], a[i]);
  }
}
```
* a >>= 1[color ff0000]
* a.size()[link size.md]

### 出力
```
00001000 >> 1 -> 00000100
00010000 >> 1 -> 00001000
00011000 >> 1 -> 00001100
00100000 >> 1 -> 00010000
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec::operator>>`](op_right_shift.md)
- [`std::simd::basic_vec`](../basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
