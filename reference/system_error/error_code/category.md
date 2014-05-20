#category (C++11)
```cpp
const error_category& category() const noexcept;
```
* error_category[link ../error_category.md]

##概要
包含しているエラーカテゴリへの参照を返す


##戻り値
包含しているエラーカテゴリへの参照


##例外
投げない


##例
```cpp
#include <iostream>
#include <system_error>

int main()
{
  std::error_code ec(static_cast<int>(std::errc::invalid_argument),
                     std::generic_category());

  const std::error_category& cat = ec.category();
  std::cout << cat.name() << std::endl;
}
```
* category()[color ff0000]

###出力
```
generic
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
