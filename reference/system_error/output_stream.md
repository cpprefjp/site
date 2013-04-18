#operator<<
```cpp
namespace std {

  template <class charT, class traits>
  basic_ostream<charT,traits>&
    operator<<(basic_ostream<charT,traits>& os, const error_code& ec);

}
```
* error_code[link /reference/system_error/error_code.md]

##概要

<b>左辺のbasic_ostreamオブジェクトにerror_codeオブジェクトを出力する</b>


##効果

`os << ec.[category()](/reference/system_error/error_code/category.md).[name()](/reference/system_error/error_category/name.md) << ’:’ << ec.[value()](/reference/system_error/error_code/value.md)`

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
* <<[color ff0000]

###出力

```cpp
generic:22
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