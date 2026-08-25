# do_widen
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
protected:
  virtual charT
    do_widen(char c) const;      // (1) C++98

  virtual const char*
    do_widen(const char* low,
             const char* high,
             charT* dest) const; // (2) C++98
```

## 概要
指定された`char`型の文字に該当する`charT`型の文字を取得する。[`widen()`](widen.md)から呼び出される仮想関数である。


## 効果
`char`型の値、もしくはその列から、対応する`charT`型の値へ、最も単純で妥当な変換を適用する。

一意な変換が要求されるのは、基本文字集合に含まれる文字のみである。

- (2) : 範囲`[low, high)`の各文字`*p`を変換し、結果を`dest[p - low]`へ格納する


## 戻り値
- (1) : 変換した値
- (2) : `high`


## 備考
名前付きの`ctype`カテゴリと、その`ctype<char>`ファセット`ctc`、および妥当な[`ctype_base::mask`](/reference/locale/ctype_base.md)の値`M`について、`ctc.is(M, c) || !is(M, do_widen(c))`が`true`となる。すなわち、変換後の文字は、変換前の文字`c`が属さない分類には属さない。


## バージョン
### 言語
- C++98


## 関連項目
- [`ctype::widen`](widen.md)
