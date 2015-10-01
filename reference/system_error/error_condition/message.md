#message
* system_error[meta header]
* std[meta namespace]
* error_condition[meta class]
* function[meta id-type]
* cpp11[meta cpp]

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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照
