# swap
* spanstream[meta header]
* std[meta namespace]
* basic_spanbuf[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
void swap(basic_spanbuf& rhs);
```

## 概要
値を交換する。

## 効果
`basic_streambuf<CharT, Traits>::swap(rhs)`を呼び出し、`mode`と内部の文字列バッファを`rhs`と交換する。

## 例
```cpp example
#include <iostream>
#include <span>
#include <spanstream>

int main()
{
  char buf1[32] = "first";
  char buf2[32] = "second";
  std::spanbuf sb1{std::span<char>(buf1)};
  std::spanbuf sb2{std::span<char>(buf2)};
  
  // スワップ
  sb1.swap(sb2);
  
  std::cout << sb1.span().data() << std::endl;
  std::cout << sb2.span().data() << std::endl;
}
```
* sb1.swap(sb2);[color ff0000]
* std::spanbuf[link /reference/spanstream/basic_spanbuf.md]
* std::span<char>[link /reference/span/span.md]
* span()[link span.md]
* data()[link /reference/span/span/data.md]

### 出力
```
second
first
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
