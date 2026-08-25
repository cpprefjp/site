# do_hash
* locale[meta header]
* std[meta namespace]
* collate[meta class]
* function[meta id-type]

```cpp
protected:
  virtual long do_hash(const charT* low, const charT* high) const; // (1) C++98
```

## 概要
文字範囲のハッシュ値を求める。[`hash()`](hash.md)から呼び出される仮想関数である。


## 戻り値
整数値。この値は、[`do_compare()`](do_compare.md)に渡したときに`0`（等しい）を返すような他の任意の文字列に対して[`hash()`](hash.md)を呼び出した結果と等しい。

## バージョン
### 言語
- C++98


## 関連項目
- [`collate::hash`](hash.md)
- [`collate::do_compare`](do_compare.md)
