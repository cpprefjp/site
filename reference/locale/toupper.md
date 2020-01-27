# toupper
* locale[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class charT>
  charT toupper(charT c, const locale& loc);
}
```

## 概要
`locale`を実引数で指定できる`toupper()`関数。 
文�`c`を、�ケールに基いて大文�に変換する。


## 戻り値
`std::use_facet<std::ctype<charT>>(loc).toupper(c)`を返す。


## 備考
`locale`を引数に取らない`toupper()`関数は、`<cctype>`ヘッダに�在する。


## 例
```cpp example
#include <locale>
#include <iostream>

int main()
{
  std::locale l = std::locale::classic();

  std::cout << std::toupper('a', l) << std::endl;
}
```
* std::toupper[color ff0000]
* std::locale[link locale.md]
* classic()[link locale/classic.md.nolink]

### 出力
```
A
```

## バージョン
### 言語
- C++03

### 処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.2, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp): 2003, 2005, 2008, 2010, 2012

## 実装例
```cpp
template<class charT> charT toupper(charT c, const locale& loc)
{
  return std::use_facet<std::ctype<charT>>(loc).toupper(c);
}
```

## 参照


