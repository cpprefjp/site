#default_error_condition
```cpp
virtual error_condition default_error_condition(int ev) const noexcept;
```

##概要

<b>パラメータevと自身のerror_categoryから成るerror_conditionを生成して返す</b>


##戻り値

`error_condition(ev, *this)`

##例外

投げない


##例

```cpp
#include <iostream>
#include <system_error>
#include <string>
#include <cerrno>
```

int main()
{
  const std::error_category& cat = std::generic_category();
  std::error_condition ed = cat.<color=ff0000>default_error_condition</color>(ENOTDIR);

  std::cout << ed.value() << std::endl;
  std::cout << ed.message() << std::endl;
}




###出力

```cpp
20
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