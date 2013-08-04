#make_error_code(C++11)
```cpp
namespace std {
  error_code make_error_code(future_errc e) noexcept;
}
```
* error_code[link /reference/system_error/error_code.md]
* future_errc[link /reference/future/future_errc.md]

##概要
`future_errc`から`error_code`を生成する


##戻り値
[`error_code`](/reference/system_error/error_code.md)`(static_cast<int>(e), `[`future_category`](./future_category.md)`())`


##例外
投げない


##例
```cpp
#include <iostream>
#include <future>
#include <string>

int main()
{
  std::error_code ec = std::make_error_code(std::future_errc::broken_promise);

  std::cout << "category : " << ec.category().name() << std::endl;
  std::cout << "value : " << ec.value() << std::endl;
  std::cout << "message : " << ec.message() << std::endl;
}
```
* make_error_code[color ff0000]

###出力例
```
category : future
value : 4
message : Broken promise
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0


##参照


