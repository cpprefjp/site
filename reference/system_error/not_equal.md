#operator!=
```cpp
namespace std {
  bool operator!=(const error_code& lhs, const error_code& rhs) noexcept;
  bool operator!=(const error_code& lhs, const error_condition& rhs) noexcept;
  bool operator!=(const error_condition& lhs, const error_code& rhs) noexcept;
  bool operator!=(const error_condition& lhs, const error_condition& rhs) noexcept;
}
```
* error_code[link ./error_code.md]
* error_condition[link ./error_condition.md]

##概要
`error_code`, `error_condition`の非等値比較を行う


##戻り値
`!(lhs `[`==`](./equal.md)` rhs)`


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

  std::cout << "error_code != error_code : " << (ec1 != ec1) << std::endl;
  std::cout << "error_code != error_code : " << (ec1 != ec2) << std::endl;

  std::cout << "error_code != error_condition : " << (ec1 != ed1) << std::endl;
  std::cout << "error_code != error_condition : " << (ec1 != ed2) << std::endl;

  std::cout << "error_condition != error_condition : " << (ed1 != ed1) << std::endl;
  std::cout << "error_condition != error_condition : " << (ed1 != ed2) << std::endl;

}
```

###出力
```
error_code != error_code : false
error_code != error_code : true
error_code != error_condition : false
error_code != error_condition : true
error_condition != error_condition : false
error_condition != error_condition : true
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
[`operator==()`](/reference/system_error/equal.md)


