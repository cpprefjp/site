#default_error_condition (C++11)
```cpp
virtual error_condition default_error_condition(int ev) const noexcept;
```

##概要
パラメータ`ev`と自身の`error_category`から成る`error_condition`を生成して返す


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

int main()
{
  const std::error_category& cat = std::generic_category();
  std::error_condition ed = cat.default_error_condition(ENOTDIR);

  std::cout << ed.value() << std::endl;
  std::cout << ed.message() << std::endl;
}
```
* default_error_condition[color ff0000]

###出力
```
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
- [Visual C++](/implementation#visual_cpp.md) 10.0


##参照
