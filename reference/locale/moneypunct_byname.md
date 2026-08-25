# moneypunct_byname
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, bool International = false>
  class moneypunct_byname : public moneypunct<charT, International>;
}
```
* moneypunct[link /reference/locale/moneypunct.md]

## 概要
`moneypunct_byname`は、名前で指定したロケールの金額のフォーマットを提供する、[`moneypunct`](/reference/locale/moneypunct.md)の派生クラスである。

[`moneypunct`](/reference/locale/moneypunct.md)の仮想関数を、[`locale(const char*)`](locale/op_constructor.md)で同じ名前を指定して構築したロケールのファセットと等価な意味論で実装する。

このクラスは[`moneypunct`](/reference/locale/moneypunct.md)が提供するインタフェースをそのまま継承しており、独自のメンバ関数は持たない。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| [`(constructor)`](moneypunct_byname/op_constructor.md) | コンストラクタ |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------|
| [`(destructor)`](moneypunct_byname/op_destructor.md) | デストラクタ |

## メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `pattern` | 金額のフォーマット型 [`money_base`](/reference/locale/money_base.md)`::pattern` |
| `string_type` | 文字列型 [`std::basic_string`](/reference/string/basic_string.md)`<charT>` |

## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  // ファセットのデストラクタはprotectedであるため、
  // newで確保してlocaleに所有権を渡す
  std::locale loc{std::locale::classic(), new std::moneypunct_byname<char>{"C"}};

  std::cout << std::boolalpha
            << std::has_facet<std::moneypunct<char>>(loc) << std::endl;
}
```
* std::moneypunct_byname[color ff0000]
* std::locale[link locale.md]
* std::locale::classic()[link locale/classic.md]
* std::has_facet[link has_facet.md]
* std::moneypunct[link moneypunct.md]

### 出力
```
true
```


## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct`](/reference/locale/moneypunct.md)
- [`locale`](locale.md)
