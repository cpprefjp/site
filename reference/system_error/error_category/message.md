#message
* system_error[meta header]
* std[meta namespace]
* error_category[meta class]
* function[meta id-type]
* cpp11[meta cpp]

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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照
