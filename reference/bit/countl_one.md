# countl_one
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr int countl_one(T x) noexcept;
}
```

## 概要
左から連続した1のビットを数える。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 戻り値
値`x`の、最上位ビット (MSB, most significant bit) から開始して連続した1ビットの数を返す。

`x ==` [`std::numeric_limits`](/reference/limits/numeric_limits.md)`<T>::`[`max()`](/reference/limits/numeric_limits/max.md)の場合、符号なし整数型`T`のビット数が返る。


## 例外
投げない


## 備考
- この関数は、ハードウェア機能として提供されている場合がある


## 例
```cpp example
#include <cassert>
#include <bit>
#include <cstdint>

int main()
{
  auto i = static_cast<std::uint32_t>(0b1110'0000'0000'0000'0000'0000'0000'0000u);
  int n = std::countl_one(i);
  assert(n == 3);

  assert(std::countl_one(static_cast<std::uint32_t>(0u)) == 0);
  assert(std::countl_one(static_cast<std::uint32_t>(0b1000'0000'0000'0000'0000'0000'0000'0000u)) == 1);
  assert(std::countl_one(static_cast<std::uint32_t>(0b1111'1111'1111'1111'1111'1111'1111'1111u)) == 32);
}
```
* std::countl_one[color ff0000]

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
