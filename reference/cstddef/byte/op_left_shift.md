# operator<<
* cstddef[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class IntType>
  constexpr byte operator<<(byte b, IntType shift) noexcept;
}
```

## 概要
`byte`型の値を左ビットシフトする。


## 要件
- 型`IntType`は、[`std::is_integral_v`](/reference/type_traits/is_integral.md)`<IntType> == true`であること。そうでない場合、この関数はオーバー�ード解決の候補から除外される


## 効果
以下の式と�価の効果をもつ：

```cpp
return static_cast<byte>(static_cast<unsigned char>(static_cast<unsigned int>(b) << shift));
```


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <cstddef>

int main()
{
  std::byte b{0b0000'0001};
  std::byte result = b << 3;

  assert(static_cast<unsigned char>(result) == 0b0000'1000);
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
