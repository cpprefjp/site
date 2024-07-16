# countr_one
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr int countr_one(T x) noexcept;
}
```

## 概要
右から連続した1のビットを数える。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 戻り値
値`x`の、最下位ビット (LSB, least significant bit) から開始して連続した1ビットの数を返す。

`x ==` [`std::numeric_limits`](/reference/limits/numeric_limits.md)`<T>::`[`max()`](/reference/limits/numeric_limits/max.md)の場合、符号なし整数型`T`のビット数が返る。


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <bit>
#include <cstdint>

int main()
{
  auto i = static_cast<std::uint32_t>(0b0000'0000'0000'0000'0000'0000'0000'0111u);
  int n = std::countr_one(i);
  assert(n == 3);

  assert(std::countr_one(static_cast<std::uint32_t>(0u)) == 0);
  assert(std::countr_one(static_cast<std::uint32_t>(0b0000'0000'0000'0000'0000'0000'0000'0001u)) == 1);
  assert(std::countr_one(static_cast<std::uint32_t>(0b1111'1111'1111'1111'1111'1111'1111'1111u)) == 32);
}
```
* std::countr_one[color ff0000]
* std::uint32_t[link /reference/cstdint/uint32_t.md]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0553R4 Bit operations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0553r4.html)
