# time_get_byname
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, class InputIterator = istreambuf_iterator<charT> >
  class time_get_byname : public time_get<charT, InputIterator>;
}
```
* istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* time_get[link /reference/locale/time_get.md]

## 概要
`time_get_byname`は、名前で指定したロケールの日時の解析を提供する、[`time_get`](/reference/locale/time_get.md)の派生クラスである。

[`time_get`](/reference/locale/time_get.md)の仮想関数を、[`locale(const char*)`](locale/op_constructor.md)で同じ名前を指定して構築したロケールのファセットと等価な意味論で実装する。

このクラスは[`time_get`](/reference/locale/time_get.md)が提供するインタフェースをそのまま継承しており、独自のメンバ関数は持たない。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| [`(constructor)`](time_get_byname/op_constructor.md) | コンストラクタ |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------|
| [`(destructor)`](time_get_byname/op_destructor.md) | デストラクタ |

## メンバ型

| 名前 | 説明 |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dateorder` | 日付の表記順を表す列挙型 [`time_base`](/reference/locale/time_base.md)`::dateorder` |
| `iter_type` | 入力のイテレータ型 `InputIterator` |

## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  // ファセットのデストラクタはprotectedであるため、
  // newで確保してlocaleに所有権を渡す
  std::locale loc{std::locale::classic(), new std::time_get_byname<char>{"C"}};

  std::cout << std::boolalpha
            << std::has_facet<std::time_get<char>>(loc) << std::endl;
}
```
* std::time_get_byname[color ff0000]
* std::locale[link locale.md]
* std::locale::classic()[link locale/classic.md]
* std::has_facet[link has_facet.md]
* std::time_get[link time_get.md]

### 出力
```
true
```


## バージョン
### 言語
- C++98


## 関連項目
- [`time_get`](/reference/locale/time_get.md)
- [`locale`](locale.md)
