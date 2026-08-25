# do_compare
* locale[meta header]
* std[meta namespace]
* collate[meta class]
* function[meta id-type]

```cpp
protected:
  virtual int
    do_compare(const charT* low1, const charT* high1,
               const charT* low2, const charT* high2) const; // (1) C++98
```

## 概要
文字列を比較する。[`compare()`](compare.md)から呼び出される仮想関数である。


## 戻り値
1つめの文字列が2つめの文字列より大きい場合は`1`、小さい場合は`-1`、そうでない場合は`0`。

規格が要求する特殊化（`collate<char>`と`collate<wchar_t>`）は、辞書順比較を行う。

## バージョン
### 言語
- C++98


## 関連項目
- [`collate::compare`](compare.md)
- [`lexicographical_compare`](/reference/algorithm/lexicographical_compare.md)
