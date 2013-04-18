#message
```cpp
string message() const;
```

##概要

<b>エラーメッセージを取得する。</b>


##戻り値

[`category()`](/reference/system_error/error_code/category.md).[message](/reference/system_error/error_category/message.md)([value()](/reference/system_error/error_code/value.md))

##例

```cpp
#include <iostream>
#include <system_error>
#include <string>

int main()
{
  std::error_code ec(static_cast<int>(std::errc::invalid_argument),
                     std::generic_category());

  std::cout << ec.message() << std::endl;
}
```
* message[color ff0000]

###出力

```cpp
Invalid argument
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) 10.0



##参照


