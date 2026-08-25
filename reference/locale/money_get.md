# money_get
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, class InputIterator = istreambuf_iterator<charT> >
  class money_get : public locale::facet;
}
```
* istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* locale::facet[link /reference/locale/locale/facet.md]

## 概要
`money_get`は、入力ストリームから金額を読み取り、解析するためのロケールファセットである。

書式は[`moneypunct`](moneypunct.md)ファセットから取得した情報によって決まる。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| [`(constructor)`](money_get/op_constructor.md) | コンストラクタ |
| [`get`](money_get/get.md) | 金額の解析 |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` | このファセットを識別するためのID |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------|
| [`(destructor)`](money_get/op_destructor.md) | デストラクタ |
| [`do_get`](money_get/do_get.md) | 金額の解析 (virtual) |

## メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `iter_type` | 入力のイテレータ型 `InputIterator` |
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
  std::istringstream iss{"105623"};

  // ストリームのロケールからmoney_getファセットを取得する
  const auto& facet = std::use_facet<std::money_get<char>>(iss.getloc());

  std::ios_base::iostate err = std::ios_base::goodbit;
  long double units = 0;

  facet.get(std::istreambuf_iterator<char>{iss},
            std::istreambuf_iterator<char>{},
            false, iss, err, units);

  std::cout << units << std::endl;
}
```
* std::money_get[color ff0000]
* std::use_facet[link use_facet.md]
* iss.getloc()[link /reference/ios/ios_base/getloc.md]
* facet.get[link money_get/get.md]
* std::istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* std::ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* std::ios_base::goodbit[link /reference/ios/ios_base/type-iostate.md]

#### 出力
```
105623
```

### ロケール依存の通貨フォーマットを解析する
金額の書式は、[`get()`](money_get/get.md)へ渡すストリームのロケールに設定された[`std::moneypunct`](/reference/locale/moneypunct.md)ファセットから取得される。そのため、名前付きロケールを指定するだけで、各国の通貨の書式で書かれた文字列を解析できる。

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
* std::money_get[color ff0000]
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
- [`money_put`](money_put.md)
- [`moneypunct`](moneypunct.md)
- [`money_base`](money_base.md)
- [`locale`](locale.md)
