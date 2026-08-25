# do_positive_sign
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual string_type do_positive_sign() const; // (1) C++98
```

## 概要
正の金額を表す記号を取得する。[`positive_sign()`](positive_sign.md)から呼び出される仮想関数である。


## 戻り値
正の金額を示すために使用する文字列を返す。通常これは空文字列である。

## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::positive_sign`](positive_sign.md)
