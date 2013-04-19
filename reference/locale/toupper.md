#toupper
```cpp
namespace std {
```

  template<class charT> charT toupper(charT c, const locale& loc);

}




##概要

localeを実引数で指定できるtoupper。


##要件



##戻り値

std::use_facet<std::ctype<charT>>(loc).toupper(c)を返す。


##備考

localeを引数に取らないtoupperは、<cctype>に存在する。


##例

```cpp
#include <locale>

#include <iostream>
```

int main()

{

  std::locale l = std::locale::classic();


  std::cout << std::toupper('a', l) << std::endl;

}




###出力

```cpp
A
```

##バージョン


###言語


- C++03



###処理系


- [Clang](/implementation#clang.md): 1.9, 2.9, 3.1

- [GCC](/implementation#gcc.md): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.2, 4.6.3, 4.7.0

- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.5, 4.5.2, 4.6.3, 4.7.0

- [ICC](/implementation#icc.md): 10.1, 11.0, 11.1, 12.0

- [Visual C++](/implementation#visual_cpp.md) 7.1, 8.0, 9.0, 10.0, 11.0




##実装例

```cpp
template<class charT> charT toupper(charT c, const locale& loc)

{

  return<span style='line-height:normal'> </span>std::use_facet<std::ctype<charT>>(loc).toupper(c);

}
```

##参照


