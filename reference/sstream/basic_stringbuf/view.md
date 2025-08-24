# view
* sstream[meta header]
* std[meta namespace]
* basic_stringbuf[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
basic_string_view<CharT, Traits> view() const noexcept;
```

## 概要
文字列ビューオブジェクトの取得を行う。

## 戻り値
バッファが初期化されている場合、[`gptr()`](/reference/streambuf/basic_streambuf/gptr.md)と[`egptr()`](/reference/streambuf/basic_streambuf/egptr.md)の間の文字列を指す`basic_string_view`オブジェクトを返す。  
それ以外の場合、[`pbase()`](/reference/streambuf/basic_streambuf/pbase.md)と[`epptr()`](/reference/streambuf/basic_streambuf/epptr.md)の間の文字列を指す`basic_string_view`オブジェクトを返す。

## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string_view>

int main()
{
  std::stringbuf buf("Hello World");
  
  std::string_view sv = buf.view();
  
  std::cout << sv.substr(0, 5) << std::endl;  // "Hello"
}
```
* substr[link /reference/string_view/basic_string_view/substr.md]

### 出力
```
Hello
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 12 [mark verified]
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [P0408R7 Efficient Access to `basic_stringbuf`'s Buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0408r7.pdf)
