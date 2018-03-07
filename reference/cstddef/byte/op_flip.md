# operator~
* cstddef[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  constexpr byte operator~(byte b) noexcept;
}
```

## 概要
`byte`型の値をビット反転する。


## 効果
以下の式と同等の効果をもつ：

```cpp
return byte(~static_cast<unsigned char>(b));
```


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <cstddef>
#include <climits>

int main()
{
  static_assert(CHAR_BIT == 8);

  std::byte x{0b0000'0011};
  std::byte result = ~x;

  assert(static_cast<unsigned char>(result) == 0b1111'1100);
}
```
* CHAR_BIT[link /reference/climits/char_bit.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 5.0
- [GCC, C++17 mode](/implementation.md#gcc): 7.1
- [Visual C++](/implementation.md#visual_cpp): ??
