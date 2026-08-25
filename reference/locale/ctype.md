# ctype
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT>
  class ctype : public locale::facet, public ctype_base;

  template <>
  class ctype<char> : public locale::facet, public ctype_base;
}
```
* locale::facet[link /reference/locale/locale/facet.md]
* ctype_base[link /reference/locale/ctype_base.md]

## 概要
`ctype`は、文字の分類（英字・数字・空白など）と、大文字小文字の変換、および`char`型と`charT`型の相互変換を提供するロケールファセットである。C言語の[`<cctype>`](/reference/cctype.md)の機能をカプセル化したものである。

[`basic_istream`](/reference/istream/basic_istream.md)のメンバ関数は、入力の解析における文字の分類にこのファセットを使用する。

`ctype<char>`に対しては、`char`型に対するメンバ関数をインライン実装できるようにするための特殊化が提供される。この特殊化は分類テーブルを直接持ち、[`table()`](ctype/table.md)と[`classic_table()`](ctype/classic_table.md)を追加のメンバ関数として持つ。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|----------------------------------------------------------------------------------------------------------|
| [`(constructor)`](ctype/op_constructor.md) | コンストラクタ |
| [`is`](ctype/is.md) | 文字の分類を判定する |
| [`scan_is`](ctype/scan_is.md) | 文字列中の、指定した分類に該当する最初の文字を取得する |
| [`scan_not`](ctype/scan_not.md) | 文字列中の、指定した分類に該当しない最初の文字を取得する |
| [`toupper`](ctype/toupper.md) | 大文字に変換する |
| [`tolower`](ctype/tolower.md) | 小文字に変換する |
| [`widen`](ctype/widen.md) | 指定された`char`型の文字に該当する`charT`型の文字を取得する |
| [`narrow`](ctype/narrow.md) | 指定された`charT`型の文字に該当する`char`型の文字を取得する |

### 静的メンバ変数

| 名前 | 説明 |
|--------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` | このファセットを識別するためのID |


### `ctype<char>`の特殊化にのみ存在するメンバ

| 名前 | 説明 |
|------|------|
| [`table`](ctype/table.md) | 文字の分類テーブルを取得する |
| [`classic_table`](ctype/classic_table.md) | `"C"`ロケールにおける文字の分類テーブルを取得する (static) |
| `static const std::size_t table_size;` | 分類テーブルの要素数。値は処理系定義であり、`256`以上であることが規定されている |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|----------------------------------------------------------------------------------------------------------|
| [`(destructor)`](ctype/op_destructor.md) | デストラクタ |
| [`do_is`](ctype/do_is.md) | 文字の分類を判定する |
| [`do_scan_is`](ctype/do_scan_is.md) | 文字列中の、指定した分類に該当する最初の文字を取得する |
| [`do_scan_not`](ctype/do_scan_not.md) | 文字列中の、指定した分類に該当しない最初の文字を取得する |
| [`do_toupper`](ctype/do_toupper.md) | 大文字に変換する |
| [`do_tolower`](ctype/do_tolower.md) | 小文字に変換する |
| [`do_widen`](ctype/do_widen.md) | 指定された`char`型の文字に該当する`charT`型の文字を取得する |
| [`do_narrow`](ctype/do_narrow.md) | 指定された`charT`型の文字に該当する`char`型の文字を取得する |

## メンバ型

| 名前 | 説明 |
|------------------------|------------------------------|
| `char_type` | 文字型 `charT` |

## 例
```cpp example
#include <iostream>
#include <locale>
#include <string>

int main()
{
  const auto& ct = std::use_facet<std::ctype<char>>(std::locale::classic());

  std::cout << std::boolalpha;

  // 文字の分類を判定する
  std::cout << ct.is(std::ctype_base::digit, '5') << std::endl;

  // 大文字へ変換する
  std::string s = "abc";
  ct.toupper(&s[0], &s[0] + s.size());
  std::cout << s << std::endl;
}
```
* std::ctype[color ff0000]
* ct.is[link ctype/is.md]
* ct.toupper[link ctype/toupper.md]
* std::ctype_base::digit[link ctype_base.md]
* std::use_facet[link use_facet.md]
* std::locale::classic()[link locale/classic.md]

### 出力
```
true
ABC
```


## バージョン
### 言語
- C++98


## 関連項目
- [`ctype_byname`](ctype_byname.md)
- [`ctype_base`](ctype_base.md)
- [`locale`](locale.md)
- [`std::isalpha`](isalpha.md)
