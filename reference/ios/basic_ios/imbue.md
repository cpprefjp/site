# imbue
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
locale imbue(const locale& loc);
```
* locale[link ../../locale/locale.md]

## 概要
�ケールを�定する。


## 効果
[`ios_base`](../ios_base.md)`::`[`imbue`](../ios_base/imbue.md)`(loc)` を呼び出した後、[`rdbuf`](rdbuf.md)`() != 0` であれば、[`rdbuf`](rdbuf.md)`()->`[`pubimbue`](../../streambuf/basic_streambuf/pubimbue.md)`(loc)` を呼び出す。


## 戻り値
[`ios_base`](../ios_base.md)`::`[`imbue`](../ios_base/imbue.md)`(loc)` の戻り値


## 備考
[`ios_base`](../ios_base.md)`::`[`imbue`](../ios_base/imbue.md)`()` は仮想関数ではないため、[`ios_base`](../ios_base.md) へのポインタや参照経由で `imbue()` を呼び出した場合には本関数ではなく [`ios_base`](../ios_base.md)`::`[`imbue`](../ios_base/imbue.md)`()` が呼び出される。


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  std::cout.imbue(std::locale::classic());
  std::cout << 1234.5 << '\n';
  std::cout.imbue(std::locale("en_US"));
  std::cout << 1234.5 << '\n';
  std::cout.imbue(std::locale("de_DE"));
  std::cout << 1234.5 << '\n';

  // ios_base への参照経由で呼び出すと、ストリームバッファの�ケールは変更されない
  std::ios_base& base = std::cout;
  base.imbue(std::locale::classic());
  std::cout << std::cout.rdbuf()->getloc().name() << '\n';
}
```
* imbue[color ff0000]
* std::locale[link ../../locale/locale.md]
* classic[link ../../locale/locale/classic.md.nolink]
* std::ios_base[link ../ios_base.md]
* rdbuf[link rdbuf.md]
* getloc[link ../../streambuf/basic_streambuf/getloc.md]
* name[link ../../locale/locale/name.md.nolink]

### 出力例
```
1234.5
1,234.5
1.234,5
de_DE
```

なお、�ケールの名称（ここでは `en_US` と `de_DE`）は環境依�のため、上記の例は動作しないこともある。  
その場合でも、�ケールの名称を当該環境で適切なものに変更すれば動作するはずである。  
また、2 行目・3 行目の出力は�ケール依�のため、たとえこれらの�ケールが使用できたとしても上記のようには出力されない可能性もある（が、一般的にはこのように出力される）。


## バージョン
### 言語
- C++98

## 参照
- [`ios_base`](../ios_base.md)`::`[`getloc`](../ios_base/getloc.md)
- [`ios_base`](../ios_base.md)`::`[`imbue`](../ios_base/imbue.md)
- [`basic_streambuf`](../../streambuf/basic_streambuf.md)`::`[`getloc`](../../streambuf/basic_streambuf/getloc.md)
- [`basic_streambuf`](../../streambuf/basic_streambuf.md)`::`[`pubimbue`](../../streambuf/basic_streambuf/pubimbue.md)
- [`locale`](../../locale/locale.md)
