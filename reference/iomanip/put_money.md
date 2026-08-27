# put_money
* iomanip[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class moneyT>
  unspecified put_money(const moneyT& mon, bool intl = false); // (1) C++11
}
```
* unspecified[italic]

## 概要
金額書式で出力する。

`intl`に`true`を指定した場合は国際通貨表記 (`JPY`のような通貨記号) 、`false`を指定した場合は各国内での通貨表記 (`¥`のような通貨記号) として出力する。


## 要件
型`moneyT`は、`long double`もしくは[`basic_string`](/reference/string/basic_string.md)の特殊化のいずれかであること。


## 戻り値
未規定の型のオブジェクトを返す。`out`を[`basic_ostream`](/reference/ostream/basic_ostream.md)`<CharT, Traits>`型のオブジェクトとして、式`out << put_money(mon, intl)`は以下の関数`f`を`f(out, mon, intl)`と呼び出したかのように振る舞う：

```cpp
template <class CharT, class Traits, class moneyT>
void f(basic_ios<CharT, Traits>& str, const moneyT& mon, bool intl)
{
  using Iter     = ostreambuf_iterator<CharT, Traits>;
  using MoneyPut = money_put<CharT, Iter>;

  const MoneyPut& mp = use_facet<MoneyPut>(str.getloc());
  const Iter end = mp.put(Iter(str.rdbuf()), intl, str, str.fill(), mon);

  if (end.failed())
    str.setstate(ios_base::badbit);
}
```
* basic_ios[link /reference/ios/basic_ios.md]
* ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* money_put[link /reference/locale/money_put.md]
* use_facet[link /reference/locale/use_facet.md]
* str.getloc()[link /reference/ios/ios_base/getloc.md]
* str.rdbuf()[link /reference/ios/basic_ios/rdbuf.md]
* str.fill()[link /reference/ios/basic_ios/fill.md]
* mp.put[link /reference/locale/money_put/put.md]
* end.failed()[link /reference/iterator/ostreambuf_iterator/failed.md]
* ios_base[link /reference/ios/ios_base.md]
* badbit[link /reference/ios/ios_base/type-iostate.md]
* str.setstate[link /reference/ios/basic_ios/setstate.md]

式`out << put_money(mon, intl)`は、[`basic_ostream`](/reference/ostream/basic_ostream.md)`<CharT, Traits>&`型を持ち、その値は`out`である。


## 備考
出力する金額は、通貨の最小単位 (日本円なら円、米ドルならセント) を単位とする値として渡す。小数点の位置や通貨記号の有無は、ストリームに設定されているロケールの[`moneypunct`](/reference/locale/moneypunct.md)ファセットによって決まる。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <string>

int main()
{
  // Cロケールでは通貨記号がなく、小数点以下の桁数は0となる

  // long doubleで指定する
  std::cout << std::put_money(123456.0L) << std::endl;

  // 文字列で指定する
  std::cout << std::put_money(std::string("987")) << std::endl;

  // 国際通貨表記で出力する
  std::cout << std::put_money(123456.0L, true) << std::endl;
}
```
* std::put_money[color ff0000]

### 出力
```
123456
987
123456
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
- [`get_money`](get_money.md)
- [`money_put`](/reference/locale/money_put.md)
- [`moneypunct`](/reference/locale/moneypunct.md)
