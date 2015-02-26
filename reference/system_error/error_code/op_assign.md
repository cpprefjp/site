#operator= (C++11)
* system_error[meta header]
* std[meta namespace]

```cpp
template <class ErrorCodeEnum>
error_code& operator=(ErrorCodeEnum e) noexcept;
```

##概要
エラー値を代入する。


##要件
[`is_error_code_enum`](../is_error_code_enum.md)`<ErrorCodeEnum>::value == true`であること。 
`false`だった場合、この関数はオーバーロード解決から除外される。


##効果
`*this = `[`make_error_code`](../make_error_code.md)`(e)`


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

###出力
```
error
22
generic
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 


##参照


