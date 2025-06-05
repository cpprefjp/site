# get_allocator
* sstream[meta header]
* std[meta namespace]
* basic_stringbuf[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
allocator_type get_allocator() const noexcept;
```

## 概要
アロケータを取得する。

## 戻り値
内部の文字列バッファが保持しているアロケータのコピー。

## 例
```cpp example
#include <iostream>
#include <sstream>

int main()
{
  std::stringbuf buf;
  
  auto alloc = buf.get_allocator();
  
  // アロケータの型名を出力（処理系依存）
  std::cout << typeid(alloc).name() << std::endl;
}
```

### 出力例
```
std::allocator<char>
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`'s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)