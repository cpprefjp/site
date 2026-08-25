# numpunct_byname
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT>
  class numpunct_byname : public numpunct<charT>;
}
```
* numpunct[link /reference/locale/numpunct.md]

## 概要
`numpunct_byname`は、名前で指定したロケールの数値の区切り文字に関する情報を提供する、[`numpunct`](/reference/locale/numpunct.md)の派生クラスである。

[`numpunct`](/reference/locale/numpunct.md)の仮想関数を、[`locale(const char*)`](locale/op_constructor.md)で同じ名前を指定して構築したロケールのファセットと等価な意味論で実装する。

このクラスは[`numpunct`](/reference/locale/numpunct.md)が提供するインタフェースをそのまま継承しており、独自のメンバ関数は持たない。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| [`(constructor)`](numpunct_byname/op_constructor.md) | コンストラクタ |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------|
| [`(destructor)`](numpunct_byname/op_destructor.md) | デストラクタ |

## メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `string_type` | 文字列型 [`std::basic_string`](/reference/string/basic_string.md)`<charT>` |

## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  // ファセットのデストラクタはprotectedであるため、
  // newで確保してlocaleに所有権を渡す
  std::locale loc{std::locale::classic(), new std::numpunct_byname<char>{"C"}};

  std::cout << std::boolalpha
            << std::has_facet<std::numpunct<char>>(loc) << std::endl;
}
```
* std::numpunct_byname[color ff0000]
* std::locale[link locale.md]
* std::locale::classic()[link locale/classic.md]
* std::has_facet[link has_facet.md]
* std::numpunct[link numpunct.md]

### 出力
```
true
```


## バージョン
### 言語
- C++98


## 関連項目
- [`numpunct`](/reference/locale/numpunct.md)
- [`locale`](locale.md)
