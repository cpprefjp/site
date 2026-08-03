# operator|
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend constexpr basic_vec operator|(const basic_vec& lhs, const basic_vec& rhs) noexcept;
```

## 概要
2つの[`basic_vec`](../basic_vec.md)オブジェクトの対応する要素同士でビットごとの論理和を求める。要素型が整数型である場合に使用できる。

*Hidden friends*として定義される。


## テンプレートパラメータ制約
式`a | b`（`a`と`b`は`value_type`型）が適格であること。


## 戻り値
`lhs`と`rhs`にビット論理和を要素ごとに適用した結果で初期化された[`basic_vec`](../basic_vec.md)オブジェクトを返す。


## 例
```cpp example
#include <simd>
#include <print>
#include <cstdint>

namespace simd = std::simd;

int main()
{
  std::uint8_t av[] = {0b00001100, 0b00001010, 0b00000110, 0b00000101};
  std::uint8_t bv[] = {0b00001010, 0b00000110, 0b00000011, 0b00000100};
  simd::vec<std::uint8_t, 4> a = [&](int i) { return av[i]; };
  simd::vec<std::uint8_t, 4> b = [&](int i) { return bv[i]; };

  simd::vec<std::uint8_t, 4> c = a | b;

  for (int i = 0; i < c.size(); ++i) {
    std::println("{:08b} | {:08b} -> {:08b}", a[i], b[i], c[i]);
  }
}
```
* simd::vec[color ff0000]
* c.size()[link size.md]

### 出力
```
00001100 | 00001010 -> 00001110
00001010 | 00000110 -> 00001110
00000110 | 00000011 -> 00000111
00000101 | 00000100 -> 00000101
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
