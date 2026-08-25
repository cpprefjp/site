# do_narrow
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
protected:
  virtual char
    do_narrow(charT c,
              char dfault) const;  // (1) C++98

  virtual const charT*
    do_narrow(const charT* low,
              const charT* high,
              char dfault,
              char* dest) const;   // (2) C++98
```

## 概要
指定された`charT`型の文字に該当する`char`型の文字を取得する。[`narrow()`](narrow.md)から呼び出される仮想関数である。


## 効果
`charT`型の値、もしくはその列から、対応する`char`型の値へ、最も単純で妥当な変換を適用する。

- (2) : 範囲`[low, high)`の各文字`*p`を変換し、結果（単純な変換が得られない場合は`dfault`）を`dest[p - low]`へ格納する


## 戻り値
- (1) : 変換した値。単純な変換が得られない場合は`dfault`
- (2) : `high`


## 備考
基本文字集合に含まれる任意の文字`c`について、変換は[`do_widen`](do_widen.md)`(do_narrow(c, 0)) == c`を満たす。

また、任意の数字文字`c`について、式`(do_narrow(c, dfault) - '0')`はその文字の数字としての値に評価される。

## バージョン
### 言語
- C++98


## 関連項目
- [`ctype::narrow`](narrow.md)
- [`ctype::do_widen`](do_widen.md)
