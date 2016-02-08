#リテラル演算子のスペースを省略可能とする
* cpp14[meta cpp]

##概要
リテラル演算子を定義する際に、これまでは以下のように、`operator""`とサフィックス名の間に、ひとつ以上のスペースが必要だった。

```cpp
ReturnType operator"" _suffix(const char*);
```

このスペースが不要となった：

```cpp
ReturnType operator""_suffix(const char*); // OK
```


##例
```cpp
#include <iostream>
#include <string>

namespace my_namespace {
inline namespace literals {
  std::string operator""_s(const char* str, std::size_t length)
  {
    return std::string(str, length);
  }
}}

int main()
{
  using namespace my_namespace::literals;

  auto x = "hello"_s; // xの型はstd::string
  std::cout << x << std::endl;
}
```

###出力
```
hello
```


##関連項目
- [C++11 ユーザー定義リテラル](/lang/cpp11/user_defined_literals.md)


##参照
- [CWG Issue 1473. Syntax of literal-operator-id](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1473)

