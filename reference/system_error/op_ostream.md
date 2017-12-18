# operator<<
* system_error[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class charT, class traits>
  basic_ostream<charT,traits>&
    operator<<(basic_ostream<charT,traits>& os, const error_code& ec);
}
```
* error_code[link error_code.md]
* basic_ostream[link /reference/ostream/basic_ostream.md]

## 概要
左辺の`basic_ostream`オブジェクトに`error_code`オブジェクトを出力する


## 効果
```cpp
os << ec.category().name() << ':' << ec.value();
```
* category()[link error_code/category.md]
* name()[link error_category/name.md]
* value()[link error_code/value.md]


## 戻り値
`os`


## 例
```cpp example
#include <iostream>
#include <system_error>

int main()
{
  std::error_code ec = std::make_error_code(std::errc::invalid_argument);

  std::cout << ec << std::endl;
}
```
* std::error_code[link error_code.md]
* std::make_error_code[link make_error_code.md]
* std::errc::invalid_argument[link errc.md]

### 出力
```
generic:22
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010


## 参照
