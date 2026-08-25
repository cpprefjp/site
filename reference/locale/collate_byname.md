# collate_byname
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT>
  class collate_byname : public collate<charT>;
}
```
* collate[link /reference/locale/collate.md]

## 概要
`collate_byname`は、名前で指定したロケールの文字列の照合を提供する、[`collate`](/reference/locale/collate.md)の派生クラスである。

[`collate`](/reference/locale/collate.md)の仮想関数を、[`locale(const char*)`](locale/op_constructor.md)で同じ名前を指定して構築したロケールのファセットと等価な意味論で実装する。

このクラスは[`collate`](/reference/locale/collate.md)が提供するインタフェースをそのまま継承しており、独自のメンバ関数は持たない。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| [`(constructor)`](collate_byname/op_constructor.md) | コンストラクタ |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------|
| [`(destructor)`](collate_byname/op_destructor.md) | デストラクタ |

## メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `string_type` | 文字列型 [`std::basic_string`](/reference/string/basic_string.md)`<charT>` |

## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  // ファセットのデストラクタはprotectedであるため、
  // newで確保してlocaleに所有権を渡す
  std::locale loc{std::locale::classic(), new std::collate_byname<char>{"C"}};

  std::cout << std::boolalpha
            << std::has_facet<std::collate<char>>(loc) << std::endl;
}
```
* std::collate_byname[color ff0000]
* std::locale[link locale.md]
* std::locale::classic()[link locale/classic.md]
* std::has_facet[link has_facet.md]
* std::collate[link collate.md]

### 出力
```
true
```


## バージョン
### 言語
- C++98


## 関連項目
- [`collate`](/reference/locale/collate.md)
- [`locale`](locale.md)
