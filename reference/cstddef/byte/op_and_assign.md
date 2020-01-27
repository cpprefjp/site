# operator&=
* cstddef[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  constexpr byte& operator&=(byte& l, byte r) noexcept;
}
```

## 概要
`byte`型のオブジェクトに対して、ビット論理積の複合代入をする。


## 効果
以下の式と�価の効果をもつ：

```cpp
return l = l & r;
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

  a &= b;

  assert(static_cast<unsigned char>(a) == 0b0000'0001);
}
```

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 5.0
- [GCC](/implementation.md#gcc): 7.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2950. `std::byte` operations are misspecified](https://wg21.cmeerw.net/lwg/issue2950)
