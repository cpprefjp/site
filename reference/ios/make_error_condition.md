#make_error_condition (C++11)
```cpp
namespace std {
  error_condition make_error_condition(io_errc e) noexcept;
}
```
* error_condition[link /reference/system_error/error_condition.md]
* io_errc[link ./future_errc.md]

##概要
`io_errc`から`error_condition`を生成する


##戻り値
[`error_condition`](/reference/system_error/error_condition.md)`(static_cast<int>(e), `[`iostream_category`](./iostream_category.md)`())`


##例外
投げない


##例
```cpp
#include <iostream>
#include <future>

int main()
{
  std::error_condition ec = std::make_error_condition(std::future_errc::broken_promise);

  std::cout << "category : " << ec.category().name() << std::endl;
  std::cout << "value : " << ec.value() << std::endl;
  std::cout << "message : " << ec.message() << std::endl;
}
```
* make_error_condition[color ff0000]

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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md):
- [GCC, C++0x mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 10.0, 11.0


##参照


