# do_curr_symbol
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual string_type do_curr_symbol() const; // (1) C++98
```

## 概要
通貨記号を取得する。[`curr_symbol()`](curr_symbol.md)から呼び出される仮想関数である。


## 戻り値
通貨を識別する記号として使用する文字列を返す。

2つめのテンプレートパラメータが`true`である特殊化では、通常これは4文字である（ISO 4217で規定される3文字のコードと、それに続く空白）。

## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::curr_symbol`](curr_symbol.md)
