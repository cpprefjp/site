#name(C++11)
```cpp
const char* name() const noexcept;
```

##概要
カテゴリの名前を取得する


##戻り値
エラーの分類を示す文字列を返す


##例外
投げない


##例
```cpp
#include <iostream>
#include <system_error>

int main()
{
  const std::error_category& generic_cat = std::generic_category();
  std::cout << generic_cat.name() << std::endl;

  const std::error_category& system_cat = std::system_category();
  std::cout << system_cat.name() << std::endl;
}
```
* name[color ff0000]
* generic_category()[link ../generic_category.md]
* system_category()[link ../system_category.md]

###出力
```
generic
system
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
