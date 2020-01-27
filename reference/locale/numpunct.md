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
(ここに、クラスの概要を記載する)

### メンバ関数

| 名前 | 説明 |
|----------------------------|--------------------------------------------------------------------|
| `(constructor)` | コンストラクタ |
| `decimal_point` | 小数点の文�を取得する |
| `thousands_sep` | 桁区切りの文�を取得する |
| `grouping` | 何桁で区切るかの、桁数のシーケンスを取得する |
| `truename` | `true`を表す文�列を取得する |
| `falsename` | `false`を表す文�列を取得する |

### 静的メンバ関数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` |  |

### protectedメンバ関数

| 名前 | 説明 |
|-------------------------------|--------------------------------------------------------------------|
| `(destructor)` | デストラクタ |
| `do_decima_point` | 小数点の文�を取得する |
| `do_thousands_sep` | 桁区切りの文�を取得する |
| `do_grouping` | 何桁で区切るかの、桁数のシーケンスを取得する |
| `do_truename` | `true`を表す文�列を取得する |
| `do_falsename` | `false`を表す文�列を取得する |

### メンバ型

| 名前 | 説明 |
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `char_type` | 文�型 `charT` |
| `string_type` | 文�列型 [`basic_string`](/reference/string/basic_string.md)`<charT>` |

### 例

```cpp example
#include <iostream>
#include <locale>

void print_punct(std::locale&& loc)
{
  std::cout << loc.name() << std::endl;

  const std::numpunct<char>& punct = std::use_facet<std::numpunct<char> >(loc);

  // 小数点文�
  std::cout << punct.decimal_point() << std::endl;

  // 桁区切り文�
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
* loc.name()[link locale/name.md.nolink]
* std::use_facet[link use_facet.md.nolink]
* punct.decimal_point()[link numpunct/decimal_point.md.nolink]
* punct.thousands_sep()[link numpunct/thousands_sep.md.nolink]
* punct.grouping()[link numpunct/grouping.md.nolink]

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

### 参照

