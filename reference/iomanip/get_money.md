# get_money
* iomanip[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class moneyT>
  unspecified get_money(moneyT& mon, bool intl = false); // (1) C++11
}
```
* unspecified[italic]

## 概要
金額書式から入力する。

`intl`に`true`を指定した場合は国際通貨表記 (`JPY`のような通貨記号) 、`false`を指定した場合は各国内での通貨表記 (`¥`のような通貨記号) として解析する。


## 要件
型`moneyT`は、`long double`もしくは[`basic_string`](/reference/string/basic_string.md)の特殊化のいずれかであること。


## 戻り値
未規定の型のオブジェクトを返す。`in`を[`basic_istream`](/reference/istream/basic_istream.md)`<CharT, Traits>`型のオブジェクトとして、式`in >> get_money(mon, intl)`は以下の関数`f`を`f(in, mon, intl)`と呼び出したかのように振る舞う：

```cpp
template <class CharT, class Traits, class moneyT>
void f(basic_ios<CharT, Traits>& str, moneyT& mon, bool intl)
{
  using Iter     = istreambuf_iterator<CharT, Traits>;
  using MoneyGet = money_get<CharT, Iter>;

  ios_base::iostate err = ios_base::goodbit;
  const MoneyGet& mg = use_facet<MoneyGet>(str.getloc());

  mg.get(Iter(str.rdbuf()), Iter(), intl, str, err, mon);

  if (ios_base::goodbit != err)
    str.setstate(err);
}
```
* basic_ios[link /reference/ios/basic_ios.md]
* istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* money_get[link /reference/locale/money_get.md]
* use_facet[link /reference/locale/use_facet.md]
* str.getloc()[link /reference/ios/ios_base/getloc.md]
* str.rdbuf()[link /reference/ios/basic_ios/rdbuf.md]
* mg.get[link /reference/locale/money_get/get.md]
* ios_base[link /reference/ios/ios_base.md]
* goodbit[link /reference/ios/ios_base/type-iostate.md]
* str.setstate[link /reference/ios/basic_ios/setstate.md]

式`in >> get_money(mon, intl)`は、[`basic_istream`](/reference/istream/basic_istream.md)`<CharT, Traits>&`型を持ち、その値は`in`である。


## 備考
解析される金額は、通貨の最小単位 (日本円なら円、米ドルならセント) を単位とする値である。小数点の位置や通貨記号の有無は、ストリームに設定されているロケールの[`moneypunct`](/reference/locale/moneypunct.md)ファセットによって決まる。

この関数は書式化入力関数として振る舞う。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <sstream>
#include <string>

int main()
{
  // Cロケールでは通貨記号がなく、小数点以下の桁数は0となる
  std::istringstream ss("123456 987");

  // long doubleで受け取る
  long double value = 0;
  ss >> std::get_money(value);
  std::cout << value << std::endl;

  // 文字列で受け取る
  std::string digits;
  ss >> std::get_money(digits);
  std::cout << digits << std::endl;
}
```
* std::get_money[color ff0000]

### 出力
```
123456
987
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`put_money`](put_money.md)
- [`money_get`](/reference/locale/money_get.md)
- [`moneypunct`](/reference/locale/moneypunct.md)
