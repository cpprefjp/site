# do_decimal_point
* locale[meta header]
* std[meta namespace]
* numpunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual char_type do_decimal_point() const; // (1) C++98
```

## 概要
小数点として使用する文字を取得する。[`decimal_point()`](decimal_point.md)から呼び出される仮想関数である。


## 戻り値
小数点の基数区切りとして使用する文字を返す。

規格が要求する特殊化（`numpunct<char>`と`numpunct<wchar_t>`）は、`'.'`もしくは`L'.'`を返す。

## バージョン
### 言語
- C++98


## 関連項目
- [`numpunct::decimal_point`](decimal_point.md)
