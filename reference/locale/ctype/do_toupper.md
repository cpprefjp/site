# do_toupper
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
protected:
  virtual charT
    do_toupper(charT c) const;                       // (1) C++98

  virtual const charT*
    do_toupper(charT* low, const charT* high) const; // (2) C++98
```

## 概要
大文字に変換する。[`toupper()`](toupper.md)から呼び出される仮想関数である。


## 効果
1文字、もしくは文字列を大文字に変換する。

- (2) : 範囲`[low, high)`の各文字`*p`のうち、対応する大文字が存在するものを、その文字で置き換える


## 戻り値
- (1) : 対応する大文字が存在することが分かっている場合はその文字。そうでない場合は実引数`c`
- (2) : `high`


## バージョン
### 言語
- C++98


## 関連項目
- [`ctype::toupper`](toupper.md)
