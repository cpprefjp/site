# numpunct
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT>
  class numpunct : public locale::facet;
}
```
* locale::facet[link /reference/locale/locale/facet.md]

## 概要
`numpunct`は、数値の入出力における区切り文字や真偽値の名前といった、句読点に関する情報を提供するロケールファセットである。

[`num_get`](num_get.md)と[`num_put`](num_put.md)は、このファセットから取得した情報を使って数値の解析・書式化を行う。

## メンバ関数

| 名前 | 説明 |
|----------------------------|--------------------------------------------------------------------|
| [`(constructor)`](numpunct/op_constructor.md) | コンストラクタ |
| [`decimal_point`](numpunct/decimal_point.md) | 小数点の文字を取得する |
| [`thousands_sep`](numpunct/thousands_sep.md) | 桁区切りの文字を取得する |
| [`grouping`](numpunct/grouping.md) | 何桁で区切るかの、桁数のシーケンスを取得する |
| [`truename`](numpunct/truename.md) | `true`を表す文字列を取得する |
| [`falsename`](numpunct/falsename.md) | `false`を表す文字列を取得する |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` | このファセットを識別するためのID |

### protectedメンバ関数

| 名前 | 説明 |
|-------------------------------|--------------------------------------------------------------------|
| [`(destructor)`](numpunct/op_destructor.md) | デストラクタ |
| [`do_decimal_point`](numpunct/do_decimal_point.md) | 小数点の文字を取得する |
| [`do_thousands_sep`](numpunct/do_thousands_sep.md) | 桁区切りの文字を取得する |
| [`do_grouping`](numpunct/do_grouping.md) | 何桁で区切るかの、桁数のシーケンスを取得する |
| [`do_truename`](numpunct/do_truename.md) | `true`を表す文字列を取得する |
| [`do_falsename`](numpunct/do_falsename.md) | `false`を表す文字列を取得する |

## メンバ型

| 名前 | 説明 |
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `string_type` | 文字列型 [`std::basic_string`](/reference/string/basic_string.md)`<charT>` |

## 例

```cpp example
#include <iostream>
#include <locale>

void print_punct(std::locale&& loc)
{
  std::cout << loc.name() << std::endl;

  const std::numpunct<char>& punct = std::use_facet<std::numpunct<char> >(loc);

  // 小数点文字
  std::cout << punct.decimal_point() << std::endl;

  // 桁区切り文字
  std::cout << punct.thousands_sep() << std::endl;

  // 何桁で区切るかの、桁数のシーケンス
  std::cout << static_cast<int>(punct.grouping()[0]) << std::endl;

  std::cout << std::endl;
}

int main()
{
  // 日本語
  print_punct(std::locale("Japanese"));

  // ドイツ語
  print_punct(std::locale("German"));
}
```
* std::numpunct[color ff0000]
* std::locale[link locale.md]
* loc.name()[link locale/name.md]
* std::use_facet[link use_facet.md]
* punct.decimal_point()[link numpunct/decimal_point.md]
* punct.thousands_sep()[link numpunct/thousands_sep.md]
* punct.grouping()[link numpunct/grouping.md]

### 出力例
```
Japanese_Japan.932
.
,
3

German_Germany.1252
,
.
3
```

## バージョン
### 言語
- C++98


## 関連項目
- [`numpunct_byname`](numpunct_byname.md)
- [`num_get`](num_get.md)
- [`num_put`](num_put.md)
- [`locale`](locale.md)
