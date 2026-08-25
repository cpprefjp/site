# moneypunct
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, bool International = false>
  class moneypunct : public locale::facet, public money_base;
}
```
* locale::facet[link /reference/locale/locale/facet.md]
* money_base[link /reference/locale/money_base.md]

## 概要
`moneypunct`は、金額の入出力における書式（通貨記号、小数点、桁区切り、符号、出力順序）に関する情報を提供するロケールファセットである。

[`money_get`](money_get.md)と[`money_put`](money_put.md)は、このファセットから取得した情報を使って金額の解析・書式化を行う。

2つめのテンプレートパラメータ`International`が`true`である特殊化は、国際通貨表現（ISO 4217の3文字コード）の書式を提供する。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|---------------------------------------------------------------------------|-----------------------------------------------------------------------|
| [`(constructor)`](moneypunct/op_constructor.md) | コンストラクタ |
| [`decimal_point`](moneypunct/decimal_point.md) | 小数点の文字を取得する |
| [`thousands_sep`](moneypunct/thousands_sep.md) | 桁区切りの文字を取得する |
| [`grouping`](moneypunct/grouping.md) | 何桁で区切るかの、桁数のシーケンスを取得する |
| [`curr_symbol`](moneypunct/curr_symbol.md) | 通貨記号を取得する |
| [`positive_sign`](moneypunct/positive_sign.md) | 正の金額を表す記号を取得する |
| [`negative_sign`](moneypunct/negative_sign.md) | 負の金額を表す記号を取得する |
| [`frac_digits`](moneypunct/frac_digits.md) | 金額の小数桁数 |
| [`pos_format`](moneypunct/pos_format.md) | 正の金額を出力するためのフォーマットを取得する |
| [`neg_format`](moneypunct/neg_format.md) | 負の金額を出力するためのフォーマットを取得する |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` | このファセットを識別するためのID |
| `static const bool intl = International;` | テンプレートパラメータ`International`の値 |

### protectedメンバ関数

| 名前 | 説明 |
|-------------------------------|-----------------------------------------------------------------------|
| [`(destructor)`](moneypunct/op_destructor.md) | デストラクタ |
| [`do_decimal_point`](moneypunct/do_decimal_point.md) | 小数点の文字を取得する (virtual) |
| [`do_thousands_sep`](moneypunct/do_thousands_sep.md) | 桁区切りの文字を取得する (virtual) |
| [`do_grouping`](moneypunct/do_grouping.md) | 何桁で区切るかの、桁数のシーケンスを取得する (virtual) |
| [`do_curr_symbol`](moneypunct/do_curr_symbol.md) | 通貨記号を取得する (virtual) |
| [`do_positive_sign`](moneypunct/do_positive_sign.md) | 正の金額を表す記号を取得する (virtual) |
| [`do_negative_sign`](moneypunct/do_negative_sign.md) | 負の金額を表す記号を取得する (virtual) |
| [`do_frac_digits`](moneypunct/do_frac_digits.md) | 金額の小数桁数 (virtual) |
| [`do_pos_format`](moneypunct/do_pos_format.md) | 正の金額を出力するためのフォーマットを取得する (virtual) |
| [`do_neg_format`](moneypunct/do_neg_format.md) | 負の金額を出力するためのフォーマットを取得する (virtual) |

## メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `string_type` | 文字列型 [`std::basic_string`](/reference/string/basic_string.md)`<charT>` |

## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const auto& mp = std::use_facet<std::moneypunct<char>>(std::locale::classic());

  std::cout << "decimal_point : [" << mp.decimal_point() << "]" << std::endl;
  std::cout << "thousands_sep : [" << mp.thousands_sep() << "]" << std::endl;
  std::cout << "curr_symbol   : [" << mp.curr_symbol() << "]" << std::endl;
  std::cout << "frac_digits   : " << mp.frac_digits() << std::endl;
}
```
* std::moneypunct[color ff0000]
* std::use_facet[link use_facet.md]
* std::locale::classic()[link locale/classic.md]
* mp.decimal_point()[link moneypunct/decimal_point.md]
* mp.thousands_sep()[link moneypunct/thousands_sep.md]
* mp.curr_symbol()[link moneypunct/curr_symbol.md]
* mp.frac_digits()[link moneypunct/frac_digits.md]

#### 出力例
```
decimal_point : []
thousands_sep : []
curr_symbol   : []
frac_digits   : 0
```

- `"C"`ロケールにおける`moneypunct`の各値は規格に規定がないため、出力は処理系によって異なる

### ロケールによる違い
```cpp example
#include <iostream>
#include <locale>
#include <string>
#include <stdexcept>

std::string to_string(std::money_base::pattern p)
{
  std::string result;
  for (int i = 0; i < 4; ++i) {
    if (i != 0) {
      result += ' ';
    }
    switch (p.field[i]) {
      case std::money_base::none:   result += "none";   break;
      case std::money_base::space:  result += "space";  break;
      case std::money_base::symbol: result += "symbol"; break;
      case std::money_base::sign:   result += "sign";   break;
      case std::money_base::value:  result += "value";  break;
    }
  }
  return result;
}

void print_moneypunct(const char* name)
{
  std::cout << name << std::endl;
  try {
    std::locale loc{name};
    const auto& mp = std::use_facet<std::moneypunct<char>>(loc);

    std::cout << "  curr_symbol   : [" << mp.curr_symbol() << "]" << std::endl;
    std::cout << "  decimal_point : [" << mp.decimal_point() << "]" << std::endl;
    std::cout << "  thousands_sep : [" << mp.thousands_sep() << "]" << std::endl;
    std::cout << "  frac_digits   : " << mp.frac_digits() << std::endl;
    std::cout << "  pos_format    : " << to_string(mp.pos_format()) << std::endl;
  }
  catch (const std::runtime_error&) {
    // 指定した名前のロケールが利用できない場合
    std::cout << "  not available" << std::endl;
  }
}

int main()
{
  print_moneypunct("en_US.UTF-8");
  print_moneypunct("ja_JP.UTF-8");
  print_moneypunct("de_DE.UTF-8");
}
```
* std::moneypunct[color ff0000]
* std::money_base::pattern[link money_base.md]
* std::money_base::none[link money_base.md]
* std::money_base::space[link money_base.md]
* std::money_base::symbol[link money_base.md]
* std::money_base::sign[link money_base.md]
* std::money_base::value[link money_base.md]
* std::use_facet[link use_facet.md]
* std::locale[link locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* mp.decimal_point()[link moneypunct/decimal_point.md]
* mp.thousands_sep()[link moneypunct/thousands_sep.md]
* mp.curr_symbol()[link moneypunct/curr_symbol.md]
* mp.frac_digits()[link moneypunct/frac_digits.md]
* mp.pos_format()[link moneypunct/pos_format.md]

#### 出力例
```
en_US.UTF-8
  curr_symbol   : [$]
  decimal_point : [.]
  thousands_sep : [,]
  frac_digits   : 2
  pos_format    : sign symbol none value
ja_JP.UTF-8
  curr_symbol   : [￥]
  decimal_point : [.]
  thousands_sep : [,]
  frac_digits   : 0
  pos_format    : sign symbol none value
de_DE.UTF-8
  curr_symbol   : [ €]
  decimal_point : [,]
  thousands_sep : [.]
  frac_digits   : 2
  pos_format    : sign value none symbol
```

- 日本円は補助単位を持たないため[`frac_digits()`](moneypunct/frac_digits.md)が`0`であり、米ドルとユーロは`2`となる
- ドイツのロケールでは小数点と桁区切りの文字が米国と逆になっている
- [`pos_format()`](moneypunct/pos_format.md)のパターンでは、米国と日本は`value`より前に`symbol`があるため通貨記号が値の前に置かれ、ドイツは`value`より後ろにあるため値の後ろに置かれる
- ドイツの通貨記号`" €"`のように、記号自体が空白を含むことがある
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct_byname`](moneypunct_byname.md)
- [`money_base`](money_base.md)
- [`money_get`](money_get.md)
- [`money_put`](money_put.md)
- [`locale`](locale.md)
