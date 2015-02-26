#operator== (C++11)
* system_error[meta header]

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
`error_code`, `error_condition`の等値比較を行う


##要件
- `error_code == error_code`<br/>`lhs.`[`category()`](./error_code/category.md)` == rhs.`[`category()`](./error_code/category.md)` && lhs.`[`value()`](./error_code/value.md)` == rhs.`[`value()`](./error_code/value.md)
- `error_code == error_condition`<br/>`lhs.`[`category()`](./error_code/category.md)`.`[`equivalent`](./error_category/equivalent.md)`(lhs.`[`value()`](./error_code/value.md)`, rhs) || rhs.`[`category()`](./error_condition/category.md)`.`[`equivalent`](./error_category/equivalent.md)`(lhs, rhs.`[`value()`](./error_condition/value.md)`)`
- `error_condition == error_code`<br/>`rhs.`[`category()`](./error_condition/category.md)`.`[`equivalent`](./error_category/equivalent.md)`(rhs.`[`value()`](./error_condition/value.md)`, lhs) || lhs.`[`category()`](./error_code/category.md)`.`[`equivalent`](./error_category/equivalent.md)`(rhs, lhs.`[`value()`](./error_code/value.md)`)`
- `error_condition == error_condition`<br/>`lhs.`[`category()`](./error_condition/category.md)` == rhs.`[`category()`](./error_condition/category.md)` && lhs.`[`value()`](./error_condition/value.md)` == rhs.`[`value()`](./error_condition/value.md)


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

###出力
```
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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照


