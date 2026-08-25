# do_thousands_sep
* locale[meta header]
* std[meta namespace]
* moneypunct[meta class]
* function[meta id-type]

```cpp
protected:
  virtual charT do_thousands_sep() const; // (1) C++98
```

## 概要
桁区切りの文字を取得する。[`thousands_sep()`](thousands_sep.md)から呼び出される仮想関数である。


## 戻り値
[`do_grouping()`](do_grouping.md)が桁区切りのパターンを指定する場合に使用する、桁グループの区切り文字を返す。

米国の一般的なロケールでは`','`である。

## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct::thousands_sep`](thousands_sep.md)
