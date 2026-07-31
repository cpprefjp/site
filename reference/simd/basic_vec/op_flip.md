# operator~
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr basic_vec operator~() const noexcept;
```

## 概要
各要素をビット反転する。要素型`T`が整数型である場合にのみ使用できる。


## テンプレートパラメータ制約
`value_type`の値`a`に対して式`~a`が有効であること。


## 戻り値
各要素`i`（`i`は`0`から`size() - 1`まで）を`~(*this)[i]`とした`basic_vec`オブジェクトを返す。


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
  simd::vec<std::uint8_t, 4> a = [](int i) { return static_cast<std::uint8_t>(i); };  // {0, 1, 2, 3}

  // 各要素をビット反転する
  simd::vec<std::uint8_t, 4> b = ~a;  // {0xff, 0xfe, 0xfd, 0xfc}

  for (int i = 0; i < b.size(); ++i) {
    std::println("{:08b} -> {:08b}", a[i], b[i]);
  }
}
```
* ~a[color ff0000]
* simd::vec[link ../basic_vec.md]
* b.size()[link size.md]
* b[i][link op_at.md]

### 出力
```
00000000 -> 11111111
00000001 -> 11111110
00000010 -> 11111101
00000011 -> 11111100
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec::operator!`](op_not.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
