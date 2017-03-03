#translate_nocase
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
char_type translate_nocase(char_type c) const;
```


##概要
与えられた文字列と大文字・小文字を区別せずに同等な文字列を取得する。


##戻り値
```cpp
use_facet<ctype<char_type>>(getloc()).tolower(c)
```
* use_facet[link /reference/locale/use_facet.md.nolink]
* ctype[link /reference/locale/ctype.md]
* getloc[link getloc.md]
* tolower[link /reference/locale/ctype/tolower.md.nolink]


##例
```cpp
#include <iostream>
#include <regex>

int main()
{
  std::regex_traits<char> traits;

  char c = traits.translate_nocase('A');
  std::cout << c << std::endl;
}
```
* translate_nocase[color ff0000]

###出力
```
a
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

