#message
```cpp
virtual string message(int ev) const = 0;
```

##概要

<b>エラーコードに対応するメッセージを取得する</b>


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

  std::string message = cat.message(ENOTDIR);
  std::cout << message << std::endl;
}
```
* message[color ff0000]

###出力

```cpp
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
- [Visual C++](/implementation#visual_cpp.md) 10.0<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```