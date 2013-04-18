#operator<
```cpp
namespace std {

  bool operator<(const error_code& lhs, const error_code& rhs) noexcept;
  bool operator<(const error_condition& lhs, const error_condition& rhs) noexcept;
}
```
* error_code[link /reference/system_error/error_code.md]
* error_condition[link /reference/system_error/error_condition.md]

##概要

<b>error_code, error_conditionにおいて、左辺が右辺より小さいかの比較を行う。</b>


##戻り値

`lhs.category() < rhs.category() || lhs.category() == rhs.category() && lhs.value() < rhs.value()`

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

  std::cout << "error_code < error_code : " << (ec1 < ec2) << std::endl;
  std::cout << "error_condition < error_condition : " << (ed1 < ed2) << std::endl;
}
```
* <[color ff0000]
* <[color ff0000]

###出力

```cpp
error_code < error_code : false
error_condition < error_condition : false
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```