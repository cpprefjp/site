# swap
* sstream[meta header]
* std[meta namespace]
* basic_stringbuf[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(basic_stringbuf& rhs);                     // (1) C++11
void swap(basic_stringbuf& rhs) noexcept(see below); // (1) C++17
```

## 概要
値を交換する。

## 効果
`basic_streambuf<CharT, Traits>::swap(rhs)`を呼び出し、`mode`と内部の文字列バッファを`rhs`と交換する。

## 例外
- C++17 : 実装が例外を投げない場合、この関数は`noexcept`が指定される。

## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string>

int main()
{
  std::stringbuf buf1("first");
  std::stringbuf buf2("second");
  
  buf1.swap(buf2);
  
  std::cout << buf1.str() << std::endl;
  std::cout << buf2.str() << std::endl;
}
```
* str()[link str.md]

### 出力
```
second
first
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
