#default_error_condition (C++11)
* system_error[meta header]
* std[meta namespace]
* error_category[meta class]

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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) 10.0


##参照
