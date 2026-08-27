# ctype_byname
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT>
  class ctype_byname : public ctype<charT>;
}
```
* ctype[link /reference/locale/ctype.md]

## 概要
`ctype_byname`は、名前で指定したロケールの文字の分類を提供する、[`ctype`](/reference/locale/ctype.md)の派生クラスである。

[`ctype`](/reference/locale/ctype.md)の仮想関数を、[`locale(const char*)`](locale/op_constructor.md)で同じ名前を指定して構築したロケールのファセットと等価な意味論で実装する。

このクラスは[`ctype`](/reference/locale/ctype.md)が提供するインタフェースをそのまま継承しており、独自のメンバ関数は持たない。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| [`(constructor)`](ctype_byname/op_constructor.md) | コンストラクタ |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------|
| [`(destructor)`](ctype_byname/op_destructor.md) | デストラクタ |

## メンバ型

| 名前 | 説明 |
|-------------------|--------------------------------------------------------|
| `mask` | ビットマスク型 `ctype<charT>::mask` |

## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  // ファセットのデストラクタはprotectedであるため、
  // newで確保してlocaleに所有権を渡す
  std::locale loc{std::locale::classic(), new std::ctype_byname<char>{"C"}};

  std::cout << std::boolalpha
            << std::has_facet<std::ctype<char>>(loc) << std::endl;
}
```
* std::ctype_byname[color ff0000]
* std::locale[link locale.md]
* std::locale::classic()[link locale/classic.md]
* std::has_facet[link has_facet.md]
* std::ctype[link ctype.md]

### 出力
```
true
```


## バージョン
### 言語
- C++98


## 関連項目
- [`ctype`](/reference/locale/ctype.md)
- [`locale`](locale.md)


## 参照
- [LWG Issue 1298. Missing specialization of `ctype_byname<char>`](https://cplusplus.github.io/LWG/issue1298)
    - C++11で、`char`に対する明示的特殊化の宣言が削除された。特殊化の内容が規定されておらず、基本テンプレートで足りるため
