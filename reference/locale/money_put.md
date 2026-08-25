# money_put
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, class OutputIterator = ostreambuf_iterator<charT> >
  class money_put : public locale::facet;
}
```
* ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* locale::facet[link /reference/locale/locale/facet.md]

## 概要
`money_put`は、金額を書式化して出力ストリームへ出力するためのロケールファセットである。

書式は[`moneypunct`](moneypunct.md)ファセットから取得した情報によって決まる。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| [`(constructor)`](money_put/op_constructor.md) | コンストラクタ |
| [`put`](money_put/put.md) | 金額の出力 |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` | このファセットを識別するためのID |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------|
| [`(destructor)`](money_put/op_destructor.md) | デストラクタ |
| [`do_put`](money_put/do_put.md) | 金額の出力 (virtual) |

## メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `iter_type` | 出力のイテレータ型 `OutputIterator` |
| `string_type` | 文字列型 [`std::basic_string`](/reference/string/basic_string.md)`<charT>` |

## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>

int main()
{
  std::ostringstream oss;

  // ストリームのロケールからmoney_putファセットを取得する
  const auto& facet = std::use_facet<std::money_put<char>>(oss.getloc());

  facet.put(std::ostreambuf_iterator<char>{oss}, false, oss, ' ', 105623.0L);

  std::cout << oss.str() << std::endl;
}
```
* std::money_put[color ff0000]
* std::use_facet[link use_facet.md]
* oss.getloc()[link /reference/ios/ios_base/getloc.md]
* facet.put[link money_put/put.md]
* std::ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* oss.str()[link /reference/sstream/basic_ostringstream/str.md]

#### 出力例
```
105623
```

- `"C"`ロケールでは通貨記号も桁区切りも設定されていないため、数字のみが出力される

### 通貨記号と桁区切りを指定する
書式は[`std::moneypunct`](/reference/locale/moneypunct.md)ファセットから取得される。`"C"`ロケールでは通貨記号も桁区切りも設定されていないため、これらを持つファセットをロケールへ組み込む。

```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>
#include <string>

// 通貨記号と桁区切りを持つmoneypunctファセット
struct my_moneypunct : std::moneypunct<char> {
protected:
  char_type do_decimal_point() const override { return '.'; }
  char_type do_thousands_sep() const override { return ','; }
  std::string do_grouping() const override { return "\3"; } // 3桁ごとに区切る
  string_type do_curr_symbol() const override { return "$"; }
  string_type do_negative_sign() const override { return "-"; }
  int do_frac_digits() const override { return 2; }          // 小数点以下2桁

  pattern do_pos_format() const override { return pattern{{symbol, sign, none, value}}; }
  pattern do_neg_format() const override { return pattern{{symbol, sign, none, value}}; }
};

int main()
{
  std::ostringstream oss;
  oss.imbue(std::locale{std::locale::classic(), new my_moneypunct{}});

  const auto& facet = std::use_facet<std::money_put<char>>(oss.getloc());

  // showbaseを設定すると通貨記号が出力される
  oss.setf(std::ios_base::showbase);
  facet.put(std::ostreambuf_iterator<char>{oss}, false, oss, ' ', 105623.0L);
  oss << '\n';

  // showbaseを設定しない場合、通貨記号は出力されない
  oss.unsetf(std::ios_base::showbase);
  facet.put(std::ostreambuf_iterator<char>{oss}, false, oss, ' ', 105623.0L);
  oss << '\n';

  // 負の値にはdo_neg_format()のパターンが使用される
  oss.setf(std::ios_base::showbase);
  facet.put(std::ostreambuf_iterator<char>{oss}, false, oss, ' ', -105623.0L);

  std::cout << oss.str() << std::endl;
}
```
* std::money_put[color ff0000]
* std::moneypunct[link /reference/locale/moneypunct.md]
* do_decimal_point[link /reference/locale/moneypunct/do_decimal_point.md]
* do_thousands_sep[link /reference/locale/moneypunct/do_thousands_sep.md]
* do_grouping[link /reference/locale/moneypunct/do_grouping.md]
* do_curr_symbol[link /reference/locale/moneypunct/do_curr_symbol.md]
* do_negative_sign[link /reference/locale/moneypunct/do_negative_sign.md]
* do_frac_digits[link /reference/locale/moneypunct/do_frac_digits.md]
* do_pos_format[link /reference/locale/moneypunct/do_pos_format.md]
* do_neg_format[link /reference/locale/moneypunct/do_neg_format.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]
* oss.imbue[link /reference/ios/basic_ios/imbue.md]
* oss.getloc()[link /reference/ios/ios_base/getloc.md]
* oss.setf[link /reference/ios/ios_base/setf.md]
* oss.unsetf[link /reference/ios/ios_base/unsetf.md]
* std::ios_base::showbase[link /reference/ios/ios_base/type-fmtflags.md]
* std::ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* oss.str()[link /reference/sstream/basic_ostringstream/str.md]

#### 出力
```
$1,056.23
1,056.23
$-1,056.23
```

- 引数の`105623`は最小単位（この例ではセント）での金額であり、[`do_frac_digits()`](/reference/locale/moneypunct/do_frac_digits.md)が`2`であるため`1,056.23`と表示される

### 通貨記号を末尾に置く（日本円の例）
通貨記号の位置は[`do_pos_format()`](/reference/locale/moneypunct/do_pos_format.md)・[`do_neg_format()`](/reference/locale/moneypunct/do_neg_format.md)が返すパターンで決まる。`value`より後ろに`symbol`を置くことで、「1,000円」のように値の後ろへ通貨記号を出力できる。

```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>
#include <string>

// 日本円のmoneypunctファセット
struct jpy_moneypunct : std::moneypunct<char> {
protected:
  char_type do_thousands_sep() const override { return ','; }
  std::string do_grouping() const override { return "\3"; }
  string_type do_curr_symbol() const override { return "円"; }
  string_type do_negative_sign() const override { return "-"; }
  int do_frac_digits() const override { return 0; } // 円に補助単位はない

  // 値の後ろに通貨記号を置く
  pattern do_pos_format() const override { return pattern{{sign, value, none, symbol}}; }
  pattern do_neg_format() const override { return pattern{{sign, value, none, symbol}}; }
};

int main()
{
  std::ostringstream oss;
  oss.imbue(std::locale{std::locale::classic(), new jpy_moneypunct{}});
  oss.setf(std::ios_base::showbase);

  const auto& facet = std::use_facet<std::money_put<char>>(oss.getloc());

  facet.put(std::ostreambuf_iterator<char>{oss}, false, oss, ' ', 105623.0L);
  oss << '\n';
  facet.put(std::ostreambuf_iterator<char>{oss}, false, oss, ' ', -105623.0L);

  std::cout << oss.str() << std::endl;
}
```
* std::money_put[color ff0000]
* std::moneypunct[link /reference/locale/moneypunct.md]
* do_thousands_sep[link /reference/locale/moneypunct/do_thousands_sep.md]
* do_grouping[link /reference/locale/moneypunct/do_grouping.md]
* do_curr_symbol[link /reference/locale/moneypunct/do_curr_symbol.md]
* do_negative_sign[link /reference/locale/moneypunct/do_negative_sign.md]
* do_frac_digits[link /reference/locale/moneypunct/do_frac_digits.md]
* do_pos_format[link /reference/locale/moneypunct/do_pos_format.md]
* do_neg_format[link /reference/locale/moneypunct/do_neg_format.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]
* oss.imbue[link /reference/ios/basic_ios/imbue.md]
* oss.getloc()[link /reference/ios/ios_base/getloc.md]
* oss.setf[link /reference/ios/ios_base/setf.md]
* std::ios_base::showbase[link /reference/ios/ios_base/type-fmtflags.md]
* std::ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* oss.str()[link /reference/sstream/basic_ostringstream/str.md]

#### 出力
```
105,623円
-105,623円
```

- [`do_frac_digits()`](/reference/locale/moneypunct/do_frac_digits.md)が`0`であるため、引数の値がそのまま円単位の金額として扱われる

### ロケールによって通貨を切り替える
金額の書式は、[`put()`](money_put/put.md)へ渡すストリームのロケールに設定された[`std::moneypunct`](/reference/locale/moneypunct.md)ファセットから取得される。そのため、名前付きロケールを指定するだけで、同じ値を各国の通貨の書式で出力できる。

```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>
#include <string>
#include <stdexcept>

// 書式化の処理自体はロケールに依存しない
std::string format_money(const std::locale& loc, long double units)
{
  std::ostringstream oss;
  oss.imbue(loc);
  oss.setf(std::ios_base::showbase);

  const auto& facet = std::use_facet<std::money_put<char>>(oss.getloc());
  facet.put(std::ostreambuf_iterator<char>{oss}, false, oss, ' ', units);

  return oss.str();
}

int main()
{
  for (const char* name : {"en_US.UTF-8", "ja_JP.UTF-8", "de_DE.UTF-8"}) {
    try {
      // 同じ値を、ロケールごとの通貨の書式で出力する
      std::string s = format_money(std::locale{name}, 105623.0L);
      std::cout << name << " : " << s << std::endl;
    }
    catch (const std::runtime_error&) {
      // 指定した名前のロケールが利用できない場合
      std::cout << name << " : not available" << std::endl;
    }
  }
}
```
* std::money_put[color ff0000]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* oss.imbue[link /reference/ios/basic_ios/imbue.md]
* oss.getloc()[link /reference/ios/ios_base/getloc.md]
* oss.setf[link /reference/ios/ios_base/setf.md]
* std::ios_base::showbase[link /reference/ios/ios_base/type-fmtflags.md]
* std::ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* oss.str()[link /reference/sstream/basic_ostringstream/str.md]

#### 出力例
```
en_US.UTF-8 : $1,056.23
ja_JP.UTF-8 : ￥105,623
de_DE.UTF-8 : 1.056,23 €
```

- 米ドルとユーロは補助単位を持つため小数点以下2桁で表示され、日本円は[`frac_digits()`](/reference/locale/moneypunct/frac_digits.md)が`0`であるため`105623`がそのまま円単位の金額として表示される
- ドイツのロケールでは桁区切りと小数点が米国と逆であり、通貨記号は値の後ろに置かれる
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`money_get`](money_get.md)
- [`moneypunct`](moneypunct.md)
- [`money_base`](money_base.md)
- [`locale`](locale.md)
