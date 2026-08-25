# do_frac_digits
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual int do_frac_digits() const; // (1) C++98
```

## 概要
金額の小数桁数を取得する。[`frac_digits()`](frac_digits.md)から呼び出される仮想関数である。


## 戻り値
小数の基数区切りより後ろの桁数を返す。

米国の一般的なロケールでは`2`である。

## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::frac_digits`](frac_digits.md)
