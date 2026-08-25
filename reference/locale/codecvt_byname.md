# codecvt_byname
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class internT, class externT, class stateT>
  class codecvt_byname : public codecvt<internT, externT, stateT>;
}
```
* codecvt[link codecvt.md]

## 概要
`codecvt_byname`は、名前で指定したロケールの文字コード変換を提供する、[`codecvt`](/reference/locale/codecvt.md)の派生クラスである。

[`codecvt`](/reference/locale/codecvt.md)の仮想関数を、[`locale(const char*)`](locale/op_constructor.md)で同じ名前を指定して構築したロケールのファセットと等価な意味論で実装する。

このクラスは[`codecvt`](/reference/locale/codecvt.md)が提供するインタフェースをそのまま継承しており、独自のメンバ関数は持たない。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| [`(constructor)`](codecvt_byname/op_constructor.md) | コンストラクタ |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------|
| [`(destructor)`](codecvt_byname/op_destructor.md) | デストラクタ |

## 例
```cpp example
#include <iostream>
#include <locale>
#include <cwchar>

int main()
{
  using codecvt_t = std::codecvt<wchar_t, char, std::mbstate_t>;

  // ファセットのデストラクタはprotectedであるため、
  // newで確保してlocaleに所有権を渡す
  std::locale loc{std::locale::classic(),
                  new std::codecvt_byname<wchar_t, char, std::mbstate_t>{"C"}};

  std::cout << std::boolalpha << std::has_facet<codecvt_t>(loc) << std::endl;
}
```
* std::codecvt_byname[color ff0000]
* std::locale[link locale.md]
* std::locale::classic()[link locale/classic.md]
* std::has_facet[link has_facet.md]
* std::codecvt[link codecvt.md]

### 出力
```
true
```


## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt`](/reference/locale/codecvt.md)
- [`locale`](locale.md)
