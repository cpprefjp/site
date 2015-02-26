#operator<< (C++11)
* system_error[meta header]

```cpp
namespace std {
  template <class charT, class traits>
  basic_ostream<charT,traits>&
    operator<<(basic_ostream<charT,traits>& os, const error_code& ec);
}
```
* error_code[link ./error_code.md]

##概要
左辺の`basic_ostream`オブジェクトに`error_code`オブジェクトを出力する


##効果
`os << ec.`[`category()`](./error_code/category.md)`.`[`name()`](./error_category/name.md)` << ’:’ << ec.`[`value()`](./error_code/value.md)


##戻り値
`os`

##例
```cpp
#include <iostream>
#include <system_error>

int main()
{
  std::error_code ec = std::make_error_code(std::errc::invalid_argument);

  std::cout << ec << std::endl;
}
```

###出力
```
generic:22
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照
