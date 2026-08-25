# do_neg_format
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual pattern do_neg_format() const; // (1) C++98
```
* pattern[link /reference/locale/money_base.md]

## 概要
負の金額を出力するためのフォーマットを取得する。[`neg_format()`](neg_format.md)から呼び出される仮想関数である。


## 戻り値
[`money_base::pattern`](/reference/locale/money_base.md)型のオブジェクト。

規格が要求する特殊化（`moneypunct<char>`、`moneypunct<wchar_t>`、`moneypunct<char, true>`、`moneypunct<wchar_t, true>`）は、`{ symbol, sign, none, value }`で初期化されたオブジェクトを返す。


## 備考
[`do_curr_symbol()`](do_curr_symbol.md)が返す国際通貨記号は、通常それ自体に空白を含む（たとえば`"USD "`）。

## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::neg_format`](neg_format.md)
- [`money_base`](/reference/locale/money_base.md)
