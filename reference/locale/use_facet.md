# use_facet
* locale[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Facet>
  const Facet& use_facet(const locale& loc);
}
```

## 概要
ロケール`loc`が保持している、テンプレート引数で指定した型`Facet`のファセットへの参照を取得する。


## 戻り値
ロケール`loc`が保持している型`Facet`のファセットへの参照。

返される参照、およびそれが指すファセットは、少なくとも`loc`とそのコピーが存在する間は有効である。


## 例外
[`has_facet`](has_facet.md)`<Facet>(loc)`が`false`の場合、[`std::bad_cast`](/reference/typeinfo/bad_cast.md)例外を送出する。


## 例
```cpp example
#include <locale>
#include <iostream>

int main()
{
  std::locale l = std::locale::classic();

  // "C"ロケールのctype<char>ファセットを取得し、大文字変換する
  const std::ctype<char>& ct = std::use_facet<std::ctype<char>>(l);
  std::cout << ct.toupper('a') << std::endl;
}
```
* std::use_facet[color ff0000]
* std::locale[link locale.md]
* classic()[link locale/classic.md]
* std::ctype[link ctype.md]
* toupper[link ctype/toupper.md.nolink]

### 出力
```
A
```

## バージョン
### 言語
- C++03

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2003 [mark verified], 2005 [mark verified], 2008 [mark verified], 2010 [mark verified], 2012 [mark verified]


## 関連項目
- [`has_facet`](has_facet.md)
- [`locale`](locale.md)
- [`locale::facet`](locale/facet.md)
