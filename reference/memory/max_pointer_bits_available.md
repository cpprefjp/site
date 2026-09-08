# max_pointer_bits_available
* memory[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  inline constexpr unsigned int max_pointer_bits_available = see below; // (1) C++29
}
```

## 概要
ポインタタギングに使用できるビット数の、処理系定義の上限値。

[`pointer_tag_pair`](pointer_tag_pair.md)の`BitsRequested`はこの値以下でなければならない。


## 備考
- この値が非0であることは、無効なポインタ値に対する（動作が処理系定義である）非算術操作が、[`from_tagged()`](pointer_tag_pair/from_tagged.md)による復元を保証するのに十分な情報を保存することを示す
- ポインタタギングをサポートしない処理系ではこの値は0となりうる。すべての処理系で最低1ビットが使用できる保証はない


## 例
```cpp
#include <memory>
#include <iostream>

int main()
{
  std::cout << std::max_pointer_bits_available << std::endl;
}
```
* std::max_pointer_bits_available[color ff0000]

### 出力例
```
3
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`pointer_bits_available`](pointer_bits_available.md)
- [`pointer_tag_pair`](pointer_tag_pair.md)


## 参照
- [P3125R6 constexpr pointer tagging](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3125r6.html)
