# operator basic_string_view
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
operator basic_string_view<charT, traits>() const noexcept;           // (1) C++17
constexpr operator basic_string_view<charT, traits>() const noexcept; // (1) C++20
```

## 概要
[`std::basic_string_view`](/reference/string_view/basic_string_view.md)型に変換する。


## 戻り値
以下と等価：

```cpp
return std::basic_string_view<charT, traits>(data(), size());
```
* data()[link data.md]
* size()[link size.md]


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = "Hello World";
  std::string_view sv = s;

  std::cout << sv.substr(0, 5) << std::endl;
  std::cout << s << std::endl;
}
```
* sv.substr[link /reference/string_view/basic_string_view/substr.md]

### 出力
```
Hello
Hello World
```

## 参照
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
