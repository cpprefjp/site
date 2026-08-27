# isblank
* locale[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class charT>
  bool isblank(charT c, const locale& loc); // (1) C++11
}
```

## 概要
`locale`を引数で指定できる`isblank()`関数。
文字`c`がブランク文字であるかどうかを、ロケールに基いて判定する。

ブランク文字とは、テキストの1行を単語に区切るために使われる、空白文字の一種である。`"C"`ロケールでは、半角スペースと水平タブがこれにあたる。


## 戻り値
`std::`[`use_facet`](use_facet.md)`<std::`[`ctype`](ctype.md)`<charT>>(loc).is(std::`[`ctype_base`](ctype_base.md)`::blank, c)`を返す。


## 備考
`locale`を引数に取らない`isblank()`関数は、[`<cctype>`](/reference/cctype.md)ヘッダに存在する。


## 例
```cpp example
#include <locale>
#include <iostream>

int main()
{
  std::locale l = std::locale::classic();

  std::cout << std::boolalpha << std::isblank(' ', l) << std::endl;
  std::cout << std::isblank('a', l) << std::endl;
}
```
* std::isblank[color ff0000]
* std::locale[link locale.md]
* classic()[link locale/classic.md]

### 出力
```
true
false
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 実装例
```cpp
template <class charT>
bool isblank(charT c, const locale& loc)
{
  return std::use_facet<std::ctype<charT>>(loc).is(std::ctype_base::blank, c);
}
```

## 関連項目
- [`ctype`](ctype.md)
- [`ctype_base`](ctype_base.md)
- [`isblank - <cctype>`](/reference/cctype/isblank.md)

## 参照
- [LWG Issue 2019. `isblank` not supported by `std::locale`](https://cplusplus.github.io/LWG/issue2019)
    - C++11で、`ctype_base::blank`が追加されたにもかかわらず、対応する`std::isblank`が`<locale>`に用意されていなかったため、追加された
