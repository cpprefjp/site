#make_error_condition
```cpp
namespace std {
  error_condition make_error_condition(errc e) noexcept;

}
```
* error_condition[link /reference/system_error/error_condition.md]
* errc[link /reference/system_error/errc.md]

##概要

<b>[errc](/reference/system_error/errc.md)型の列挙値から[error_condition](/reference/system_error/error_condition.md)オブジェクトを生成する</b>



##戻り値

[`error_condition`](/reference/system_error/error_condition.md)(static_cast<int>(e), [generic_category()](/reference/system_error/generic_category.md))

##例外

投げない


##例

```cpp
#include <iostream>
#include <system_error>
#include <string>

int main()
{
  std::error_condition ec = std::make_error_condition(std::errc::invalid_argument);

  std::cout << "category : " << ec.category().name() << std::endl;
  std::cout << "value : " << ec.value() << std::endl;
  std::cout << "message : " << ec.message() << std::endl;
}
```
* make_error_condition[color ff0000]

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


