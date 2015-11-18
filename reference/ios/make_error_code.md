#make_error_code
* ios[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  error_code make_error_code(io_errc e);          // C++11
  error_code make_error_code(io_errc e) noexcept; // C++14
}
```
* error_code[link /reference/system_error/error_code.md]
* io_errc[link ./io_errc.md]

##概要
`io_errc`から`error_code`を生成する


##戻り値
[`error_code`](/reference/system_error/error_code.md)`(static_cast<int>(e),` [`iostream_category`](iostream_category.md)`())`


##例外
投げない


##例
```cpp
#include <iostream> // 自動的に<ios>もインクルードされる
#include <string>

int main()
{
  std::error_code ec = std::make_error_code(std::io_errc::stream);

  std::cout << "category : " << ec.category().name() << std::endl;
  std::cout << "value : " << ec.value() << std::endl;
  std::cout << "message : " << ec.message() << std::endl;
}
```
* make_error_code[color ff0000]

###出力例
```
category : iostream
value : 1
message : iostream stream error
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0


##参照
- [LWG Issue 2087. iostream_category() and noexcept](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2087)

