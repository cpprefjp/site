# localeconv
* clocale[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  lconv* localeconv();
}
```
* lconv[link lconv.md]

## 概要
現在のロケールにおける、数値と通貨の書式設定の情報を取得する。


## 戻り値
現在のロケールの情報が設定された[`lconv`](lconv.md)構造体へのポインタを返す。


## 備考
- 返されたポインタが指すオブジェクトを、プログラムから書き換えてはならない
- 返されたポインタが指すオブジェクトの内容は、後続の[`setlocale()`](setlocale.md)の呼び出しや、他の`localeconv()`の呼び出しによって上書きされる可能性がある
- この関数の呼び出しは、[`setlocale()`](setlocale.md)の呼び出しとデータ競合を起こす可能性がある
- C++の機能としては、同じ情報が[`std::numpunct`](/reference/locale/numpunct.md)と[`std::moneypunct`](/reference/locale/moneypunct.md)のファセットとして提供される


## 例
```cpp example
#include <clocale>
#include <iostream>

int main()
{
  std::setlocale(LC_ALL, "C");

  const std::lconv* lc = std::localeconv();

  std::cout << "decimal_point: " << lc->decimal_point << std::endl;
  std::cout << "frac_digits: " << static_cast<int>(lc->frac_digits) << std::endl;
}
```
* std::localeconv[color ff0000]
* std::lconv[link lconv.md]
* std::setlocale[link setlocale.md]

### 出力
```
decimal_point: .
frac_digits: 127
```

`frac_digits`が`CHAR_MAX`（多くの処理系では`127`）である場合、Cロケールのようにその項目が利用できないことを表す。


## バージョン
### 言語
- C++98


## 関連項目
- [`lconv`](lconv.md)
- [`setlocale`](setlocale.md)
