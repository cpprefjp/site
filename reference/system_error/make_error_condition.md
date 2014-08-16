#make_error_condition (C++11)
```cpp
namespace std {
  error_condition make_error_condition(errc e) noexcept;
}
```
* error_condition[link ./error_condition.md]
* errc[link ./errc.md]

##概要
[`errc`](./errc.md)型の列挙値から[`error_condition`](./error_condition.md)オブジェクトを生成する


##戻り値
[`error_condition`](./error_condition.md)`(static_cast<int>(e), `[`generic_category()`](./generic_category.md)`)`


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
```
category : generic
value : 22
message : Invalid argument
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照


