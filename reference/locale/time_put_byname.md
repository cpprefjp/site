# time_put_byname
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, class OutputIterator = ostreambuf_iterator<charT> >
  class time_put_byname : public time_put<charT, OutputIterator>;
}
```
* ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* time_put[link /reference/locale/time_put.md]

## 概要
`time_put_byname`は、名前で指定したロケールの日時の出力を提供する、[`time_put`](/reference/locale/time_put.md)の派生クラスである。

[`time_put`](/reference/locale/time_put.md)の仮想関数を、[`locale(const char*)`](locale/op_constructor.md)で同じ名前を指定して構築したロケールのファセットと等価な意味論で実装する。

このクラスは[`time_put`](/reference/locale/time_put.md)が提供するインタフェースをそのまま継承しており、独自のメンバ関数は持たない。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| [`(constructor)`](time_put_byname/op_constructor.md) | コンストラクタ |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------|
| [`(destructor)`](time_put_byname/op_destructor.md) | デストラクタ |

## メンバ型

| 名前 | 説明 |
|-----------------------------------------------------------------------|----------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `iter_type` | 出力のイテレータ型 `OutputIterator` |

## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  // ファセットのデストラクタはprotectedであるため、
  // newで確保してlocaleに所有権を渡す
  std::locale loc{std::locale::classic(), new std::time_put_byname<char>{"C"}};

  std::cout << std::boolalpha
            << std::has_facet<std::time_put<char>>(loc) << std::endl;
}
```
* std::time_put_byname[color ff0000]
* std::locale[link locale.md]
* std::locale::classic()[link locale/classic.md]
* std::has_facet[link has_facet.md]
* std::time_put[link time_put.md]

### 出力
```
true
```


## バージョン
### 言語
- C++98


## 関連項目
- [`time_put`](/reference/locale/time_put.md)
- [`locale`](locale.md)
