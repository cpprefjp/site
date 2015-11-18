#make_error_code
* future[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

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
[`error_code`](/reference/system_error/error_code.md)`(static_cast<int>(e),` [`future_category`](future_category.md)`())`


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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照


