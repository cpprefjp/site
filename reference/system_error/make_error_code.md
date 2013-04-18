#make_error_code
```cpp
namespace std {

  error_code make_error_code(errc e) noexcept;
}
```
* error_code[link /reference/system_error/error_code.md]
* errc[link /reference/system_error/errc.md]

##概要

<b>[errc](/reference/system_error/errc.md)型の列挙値から[error_code](/reference/system_error/error_code.md)オブジェクトを生成する</b>


##戻り値

[`error_code`](/reference/system_error/error_code.md)(static_cast<int>(e), [generic_category()](/reference/system_error/generic_category.md))

##例外

投げない


##例

```cpp
#include <iostream>
#include <system_error>
#include <string>

int main()
{
  std::error_code ec = std::make_error_code(std::errc::invalid_argument);

  std::cout << "category : " << ec.category().name() << std::endl;
  std::cout << "value : " << ec.value() << std::endl;
  std::cout << "message : " << ec.message() << std::endl;
}
```
* make_error_code[color ff0000]

###出力

```cpp
category : generic
value : 22
message : Invalid argument
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


