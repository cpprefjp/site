#operator=
```cpp
template <class ErrorCodeEnum>
error_code& operator=(ErrorCodeEnum e) noexcept;
```

##概要

<b>エラー値を代入する。</b>


##要件

`[is_error_code_enum](/reference/system_error/is_error_code_enum.md)<ErrorCodeEnum>::value == true`であること。

`false`だった場合、この関数はオーバーロード解決から除外される。


##効果

`*this = [make_error_code](/reference/system_error/make_error_code.md)(e)`

##戻り値

`*this`

##例外

投げない


##例

```cpp
#include <iostream>
#include <system_error>

namespace std {
  template <>
  struct is_error_code_enum<std::errc> : std::true_type {};
}

int main()
{
  std::error_code ec;

  ec = std::errc::invalid_argument;

  if (ec) {
    std::cout << "error" << std::endl;
  }
  else {
    std::cout << "success" << std::endl;
  }

  std::cout << ec.value() << std::endl;
  std::cout << ec.category().name() << std::endl;
}
```
* =[color ff0000]

###出力

```cpp
error
22
generic
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 



##参照


