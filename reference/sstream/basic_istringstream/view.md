# view
* sstream[meta header]
* std[meta namespace]
* basic_istringstream[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
basic_string_view<CharT, Traits> view() const noexcept;
```
* basic_string_view[link /reference/string_view/basic_string_view.md]

## 概要
文字列ビューオブジェクトの取得を行う。

## 戻り値
`rdbuf()->view()`

## 例
```cpp example
#include <iostream>
#include <sstream>
#include <string_view>

int main()
{
  std::istringstream ss("Hello World");
  
  std::string_view sv = ss.view();
  
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