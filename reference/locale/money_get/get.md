# get
* locale[meta header]
* std[meta namespace]
* money_get[meta class]
* function[meta id-type]

```cpp
iter_type
  get(iter_type s,
      iter_type end,
      bool intl,
      ios_base& f,
      ios_base::iostate& err,
      long double& quant) const;  // (1) C++98

iter_type
  get(iter_type s,
      iter_type end,
      bool intl,
      ios_base& f,
      ios_base::iostate& err,
      string_type& quant) const;  // (2) C++98
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]

## 概要
入力イテレータ範囲`[s, end)`から金額を解析する。

- (1) : 解析結果を整数値として`quant`へ格納する
- (2) : 解析結果を数字の列（負の場合は先頭にマイナス符号）として`quant`へ格納する

`intl`が`true`の場合、国際通貨表現（[`moneypunct`](/reference/locale/moneypunct.md)`<charT, true>`）の書式が使用される。


## 戻り値
- (1), (2) : [`do_get(s, end, intl, f, err, quant)`](do_get.md)の戻り値


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>
#include <string>

int main()
{
  std::istringstream iss{"105623"};
  const auto& facet = std::use_facet<std::money_get<char>>(iss.getloc());

  std::ios_base::iostate err = std::ios_base::goodbit;
  long double units = 0;

  facet.get(std::istreambuf_iterator<char>{iss},
            std::istreambuf_iterator<char>{},
            false, iss, err, units);

  // 小数点以下の桁を含む整数値として解釈される
  std::cout << units << std::endl;
}
```
* std::money_get[link /reference/locale/money_get.md]
* get[color ff0000]
* std::use_facet[link /reference/locale/use_facet.md]
* iss.getloc()[link /reference/ios/ios_base/getloc.md]
* std::istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* std::ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* std::ios_base::goodbit[link /reference/ios/ios_base/type-iostate.md]

#### 出力
```
105623
```

### ロケール依存の通貨フォーマットを解析する
金額の書式は、[`get()`](get.md)へ渡すストリームのロケールに設定された[`std::moneypunct`](/reference/locale/moneypunct.md)ファセットから取得される。そのため、名前付きロケールを指定するだけで、各国の通貨の書式で書かれた文字列を解析できる。

```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>
#include <string>
#include <stdexcept>

// 解析の処理自体はロケールに依存しない
long double parse_money(const std::locale& loc, const std::string& text)
{
  std::istringstream iss{text};
  iss.imbue(loc);

  const auto& facet = std::use_facet<std::money_get<char>>(iss.getloc());

  std::ios_base::iostate err = std::ios_base::goodbit;
  long double units = 0;

  facet.get(std::istreambuf_iterator<char>{iss},
            std::istreambuf_iterator<char>{},
            false, iss, err, units);

  if (err & std::ios_base::failbit) {
    throw std::runtime_error("parse failed");
  }
  return units;
}

int main()
{
  const char* names[] = {"en_US.UTF-8", "ja_JP.UTF-8", "de_DE.UTF-8"};
  const char* texts[] = {"$1,056.23", "￥105,623", "1.056,23 €"};

  for (int i = 0; i < 3; ++i) {
    try {
      long double units = parse_money(std::locale{names[i]}, texts[i]);

      // ロケールごとの書式を解析しても、同じ最小単位の整数値が得られる
      std::cout << names[i] << " : " << static_cast<long long>(units) << std::endl;
    }
    catch (const std::runtime_error&) {
      std::cout << names[i] << " : not available" << std::endl;
    }
  }
}
```
* get[color ff0000]
* std::money_get[link /reference/locale/money_get.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale[link /reference/locale/locale.md]
* std::runtime_error[link /reference/stdexcept.md]
* iss.imbue[link /reference/ios/basic_ios/imbue.md]
* iss.getloc()[link /reference/ios/ios_base/getloc.md]
* std::istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* std::ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* std::ios_base::goodbit[link /reference/ios/ios_base/type-iostate.md]
* std::ios_base::failbit[link /reference/ios/ios_base/type-iostate.md]

#### 出力例
```
en_US.UTF-8 : 105623
ja_JP.UTF-8 : 105623
de_DE.UTF-8 : 105623
```

- 米ドルの`$1,056.23`とドイツのユーロの`1.056,23 €`は、桁区切りと小数点の文字も通貨記号の位置も異なるが、いずれも最小単位（セント）での`105623`として解析される
- 日本円の`￥105,623`は[`frac_digits()`](/reference/locale/moneypunct/frac_digits.md)が`0`であるため、`105623`がそのまま円単位の金額として解析される
- 妥当なロケール名は処理系定義である。指定した名前のロケールが利用できない場合、[`std::locale`](/reference/locale/locale.md)のコンストラクタは[`std::runtime_error`](/reference/stdexcept.md)を送出し、上記の例では`not available`が出力される


## バージョン
### 言語
- C++98


## 関連項目
- [`money_get::do_get`](do_get.md)
- [`money_put`](/reference/locale/money_put.md)
- [`moneypunct`](/reference/locale/moneypunct.md)
