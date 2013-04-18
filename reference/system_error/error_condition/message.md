#message
```cpp
string message() const;
```

##概要

<b>エラーメッセージを取得する。</b>


##戻り値

[`category()`](/reference/system_error/error_condition/category.md).[message](/reference/system_error/error_category/message.md)([value()](/reference/system_error/error_condition/value.md))

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

```cpp
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
- [Visual C++](/implementation#visual_cpp.md) 10.0<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```