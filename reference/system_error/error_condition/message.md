#message(C++11)
```cpp
string message() const;
```
* string[link /reference/string/basic_string.md]

##概要
エラーメッセージを取得する。


##戻り値
[`category()`](./category.md)`.`[`message`](../error_category/message.md)`(`[`value()`](./value.md)`)`


##例
```cpp
#include <iostream>
#include <system_error>
#include <string>

int main()
{
  std::error_condition ec(static_cast<int>(std::errc::invalid_argument),
                          std::generic_category());

  std::cout << ec.message() << std::endl;
}
```
* message[color ff0000]

###出力
```
Invalid argument
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
