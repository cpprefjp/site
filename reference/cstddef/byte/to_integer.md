# to_integer
* cstddef[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class IntType>
  constexpr IntType to_integer(byte b) noexcept;
}
```

## 概要
`byte`型の値を任意の整数型に変換する。


## 要件
- 型`IntType`は、[`std::is_integral_v`](/reference/type_traits/is_integral.md)`<IntType> == true`であること。そうでない場合、この関数はオーバーロード解決の候補から除外される


## 効果
以下の式と等価の効果をもつ：

```cpp
return IntType(b);
```


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <cstddef>
#include <cstdint>

int main()
{
  std::byte x{0b0000'1010};

  std::uint8_t result_u8 = std::to_integer<std::uint8_t>(x);
  assert(result_u8 == 0b0000'1010);

  unsigned char result_uc = std::to_integer<unsigned char>(x);
  assert(result_uc == 0b0000'1010);
}
```
* std::to_integer[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 5.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
