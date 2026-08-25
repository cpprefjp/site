# iscntrl
* locale[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class charT>
  bool iscntrl(charT c, const locale& loc);
}
```

## 概要
`locale`を引数で指定できる`iscntrl()`関数。
文字`c`が制御文字であるかどうかを、ロケールに基いて判定する。


## 戻り値
`std::`[`use_facet`](use_facet.md)`<std::`[`ctype`](ctype.md)`<charT>>(loc).is(std::`[`ctype_base`](ctype_base.md)`::cntrl, c)`を返す。


## 備考
`locale`を引数に取らない`iscntrl()`関数は、[`<cctype>`](/reference/cctype.md)ヘッダに存在する。


## 例
```cpp example
#include <locale>
#include <iostream>

int main()
{
  std::locale l = std::locale::classic();

  std::cout << std::boolalpha << std::iscntrl('\n', l) << std::endl;
}
```
* std::iscntrl[color ff0000]
* std::locale[link locale.md]
* classic()[link locale/classic.md]

### 出力
```
true
```

## バージョン
### 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2003 [mark verified], 2005 [mark verified], 2008 [mark verified], 2010 [mark verified], 2012 [mark verified]

## 実装例
```cpp
template <class charT>
bool iscntrl(charT c, const locale& loc)
{
  return std::use_facet<std::ctype<charT>>(loc).is(std::ctype_base::cntrl, c);
}
```

## 関連項目
- [`ctype`](ctype.md)
- [`iscntrl - <cctype>`](/reference/cctype/iscntrl.md)
