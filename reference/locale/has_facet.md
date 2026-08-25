# has_facet
* locale[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Facet>
  bool has_facet(const locale& loc) noexcept;
}
```

## 概要
ロケール`loc`が、テンプレート引数で指定した型`Facet`のファセットを保持しているかどうかを判定する。


## 戻り値
ロケール`loc`が型`Facet`のファセットを保持していれば`true`、そうでなければ`false`。


## 例
```cpp example
#include <locale>
#include <iostream>

int main()
{
  std::locale l = std::locale::classic();

  std::cout << std::boolalpha;
  std::cout << std::has_facet<std::ctype<char>>(l) << std::endl;
}
```
* std::has_facet[color ff0000]
* std::locale[link locale.md]
* classic()[link locale/classic.md]
* std::ctype[link ctype.md]

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


## 関連項目
- [`use_facet`](use_facet.md)
- [`locale`](locale.md)
- [`locale::facet`](locale/facet.md)
