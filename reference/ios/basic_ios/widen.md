# widen
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
char_type widen(char c) const;
```

## 概要
`char` 型の文�を `char_type` 型の文�に変換する。


## 戻り値
[`use_facet`](../../locale/use_facet.md.nolink)`<`[`ctype`](../../locale/ctype.md)`<char_type>(`[`getloc`](../ios_base/getloc.md)`()).`[`widen`](../../locale/ctype/widen.md.nolink)`(c)`


## 備考
ストリームに�定されている�ケールに従って、`char` 型の文� `c` を対応する `char_type` 型の文�に変換する。
詳細は [`ctype`](../../locale/ctype.md)`::`[`widen`](../../locale/ctype/widen.md.nolink) を参照。


## 例
```cpp example
#include <iostream>

int main()
{
  const wchar_t c1 = std::wcout.widen('0');
  const wchar_t c2 = std::wcout.widen('\\');
  std::wcout << c1 << L", " << c2 << L'\n';
}
```
* std::wcout[link ../../iostream/wcout.md.nolink]
* widen[color ff0000]

### 出力
```
0, \
```

## バージョン
### 言語
- C++98

## 参照
- [`basic_ios`](../basic_ios.md)`::`[`narrow`](narrow.md)
- [`ios_base`](../ios_base.md)`::`[`imbue`](../ios_base/imbue.md)
- [`ios_base`](../ios_base.md)`::`[`getloc`](../ios_base/getloc.md)
- [`ctype`](../../locale/ctype.md)
- [`ctype`](../../locale/ctype.md)`::`[`narrow`](../../locale/ctype/narrow.md.nolink)
- [`ctype`](../../locale/ctype.md)`::`[`widen`](../../locale/ctype/widen.md.nolink)
- [`use_facet`](../../locale/use_facet.md.nolink)
- [`locale`](../../locale/locale.md)
