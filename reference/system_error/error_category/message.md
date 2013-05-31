#message
```cpp
virtual string message(int ev) const = 0;
```
* string[link /reference/string/basic_string.md]

##概要
エラーコードに対応するメッセージを取得する


##戻り値
エラーコードを説明するメッセージを返す


##例
```cpp
#include <iostream>
#include <system_error>
#include <string>
#include <cerrno>

int main()
{
  const std::error_category& cat = std::generic_category();

  std::string msg = cat.message(ENOTDIR);
  std::cout << msg << std::endl;
}
```
* message[color ff0000]

###出力
```
Not a directory
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
