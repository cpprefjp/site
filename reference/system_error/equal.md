#operator==
```cpp
namespace std {

  bool operator==(const error_code& lhs, const error_code& rhs) noexcept;
  bool operator==(const error_code& lhs, const error_condition& rhs) noexcept;
  bool operator==(const error_condition& lhs, const error_code& rhs) noexcept;
  bool operator==(const error_condition& lhs, const error_condition& rhs) noexcept;

}
```
* error_code[link /reference/system_error/error_code.md]
* error_condition[link /reference/system_error/error_condition.md]

##概要

<b>error_code, error_conditionの等値比較を行う</b>


##要件

- `error_code == error_code``lhs.[category()](/reference/system_error/error_code/category.md) == rhs.[category()](/reference/system_error/error_code/category.md) && lhs.[value()](/reference/system_error/error_code/value.md) == rhs.[value()](/reference/system_error/error_code/value.md)`
- `error_code == error_condition``lhs.[category()](/reference/system_error/error_code/category.md).[equivalent](/reference/system_error/error_category/equivalent.md)(lhs.[value()](/reference/system_error/error_code/value.md), rhs) || rhs.[category()](/reference/system_error/error_condition/category.md).[equivalent](/reference/system_error/error_category/equivalent.md)(lhs, rhs.[value()](/reference/system_error/error_condition/value.md))`
- `error_condition == error_code``rhs.[category()](/reference/system_error/error_condition/category.md).[equivalent](/reference/system_error/error_category/equivalent.md)(rhs.[value()](/reference/system_error/error_condition/value.md), lhs) || lhs.[category()](/reference/system_error/error_code/category.md).[equivalent](/reference/system_error/error_category/equivalent.md)(rhs, lhs.[value()](/reference/system_error/error_code/value.md))`
- `error_condition == error_condition``lhs.[category()](/reference/system_error/error_condition/category.md) == rhs.[category()](/reference/system_error/error_condition/category.md) && lhs.[value()](/reference/system_error/error_condition/value.md) == rhs.[value()](/reference/system_error/error_condition/value.md)`


##例外

投げない


##例

```cpp
#include <iostream>
#include <system_error>

int main()
{
  std::error_code ec1 = std::make_error_code(std::errc::invalid_argument);
  std::error_code ec2 = std::make_error_code(std::errc::permission_denied);
  std::error_condition ed1 = std::make_error_condition(std::errc::invalid_argument);
  std::error_condition ed2 = std::make_error_condition(std::errc::permission_denied);

  std::cout << std::boolalpha;

  std::cout << "error_code == error_code : " << (ec1 == ec1) << std::endl;
  std::cout << "error_code == error_code : " << (ec1 == ec2) << std::endl;

  std::cout << "error_code == error_condition : " << (ec1 == ed1) << std::endl;
  std::cout << "error_code == error_condition : " << (ec1 == ed2) << std::endl;

  std::cout << "error_condition == error_condition : " << (ed1 == ed1) << std::endl;
  std::cout << "error_condition == error_condition : " << (ed1 == ed2) << std::endl;

}
```
* ==[color ff0000]
* ==[color ff0000]
* ==[color ff0000]
* ==[color ff0000]
* ==[color ff0000]
* ==[color ff0000]

###出力

```cpp
error_code == error_code : true
error_code == error_code : false
error_code == error_condition : true
error_code == error_condition : false
error_condition == error_condition : true
error_condition == error_condition : false
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0



##参照


