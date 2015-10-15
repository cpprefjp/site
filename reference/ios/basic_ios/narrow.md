#narrow
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
char narrow(char_type c, char def) const;
```

##概要
`char_type` 型の文字を `char` 型の文字に変換する。


##戻り値
[`use_facet`](../../locale/use_facet.md.nolink)`<`[`ctype`](../../locale/ctype.md)`<char_type>(`[`getloc`](../ios_base/getloc.md)`()).`[`narrow`](../../locale/ctype/narrow.md.nolink)`(c, def)`


##備考
ストリームに設定されているロケールに従って、`char_type` 型の文字 `c` を対応する `char` 型の文字に変換する。変換できなかった場合には `def` を返す。  
詳細は [`ctype`](../../locale/ctype.md)`::`[`narrow`](../../locale/ctype/narrow.md.nolink) を参照。


##例
```cpp
#include <iostream>

int main()
{
  const char c1 = std::wcout.narrow(L'0', '@');
  const char c2 = std::wcout.narrow(L'漢', '@');
  std::cout << c1 << ", " << c2 << '\n';
}
```
* iostream[link ../../iostream.md]
* cout[link ../../iostream/cout.md]
* wcout[link ../../iostream/wcout.md.nolink]
* narrow[color ff0000]

###出力
```
0, @
```

##バージョン
###言語
- C++98

##参照
- [`basic_ios`](../basic_ios.md)`::`[`widen`](widen.md)
- [`ios_base`](../ios_base.md)`::`[`imbue`](../ios_base/imbue.md)
- [`ios_base`](../ios_base.md)`::`[`getloc`](../ios_base/getloc.md)
- [`ctype`](../../locale/ctype.md)
- [`ctype`](../../locale/ctype.md)`::`[`narrow`](../../locale/ctype/narrow.md.nolink)
- [`ctype`](../../locale/ctype.md)`::`[`widen`](../../locale/ctype/widen.md.nolink)
- [`use_facet`](../../locale/use_facet.md.nolink)
- [`locale`](../../locale/locale.md)
