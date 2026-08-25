# do_decimal_point
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual charT do_decimal_point() const; // (1) C++98
```

## 概要
小数点の文字を取得する。[`decimal_point()`](decimal_point.md)から呼び出される仮想関数である。


## 戻り値
[`do_frac_digits()`](do_frac_digits.md)が`0`より大きい場合に使用する基数区切り文字を返す。

米国の一般的なロケールでは`'.'`である。

## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::decimal_point`](decimal_point.md)
