# do_negative_sign
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual string_type do_negative_sign() const; // (1) C++98
```

## 概要
負の金額を表す記号を取得する。[`negative_sign()`](negative_sign.md)から呼び出される仮想関数である。


## 戻り値
負の金額を示すために使用する文字列を返す。

## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::negative_sign`](negative_sign.md)
