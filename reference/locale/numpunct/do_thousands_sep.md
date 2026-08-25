# do_thousands_sep
* locale[meta header]
* std[meta namespace]
* numpunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual char_type do_thousands_sep() const; // (1) C++98
```

## 概要
桁区切りとして使用する文字を取得する。[`thousands_sep()`](thousands_sep.md)から呼び出される仮想関数である。


## 戻り値
桁のグループを区切る文字として使用する文字を返す。

規格が要求する特殊化（`numpunct<char>`と`numpunct<wchar_t>`）は、`','`もしくは`L','`を返す。

## バージョン
### 言語
- C++98


## 関連項目
- [`numpunct::thousands_sep`](thousands_sep.md)
