# operator^
* cstddef[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  constexpr byte operator^(byte l, byte r) noexcept;
}
```

## 概要
`byte`型の値をビット排他的論理和する。


## 効果
以下の式と同等の効果をもつ：

```cpp
return byte(static_cast<unsigned char>(l) ^ static_cast<unsigned char>(r));
```


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <cstddef>

int main()
{
  std::byte a{0b0000'0011};
  std::byte b{0b0000'0101};

  std::byte result = a ^ b;

  assert(static_cast<unsigned char>(result) == 0b0000'0110);
}
```

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
