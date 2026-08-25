# do_is
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
protected:
  virtual bool
    do_is(mask m,
          charT c) const;    // (1) C++98

  virtual const charT*
    do_is(const charT* low,
          const charT* high,
          mask* vec) const;  // (2) C++98
```
* mask[link /reference/locale/ctype_base.md]

## 概要
文字の分類を判定する。[`is()`](is.md)から呼び出される仮想関数である。


## 効果
1文字、もしくは文字列を分類する。各実引数の文字について、[`ctype_base::mask`](/reference/locale/ctype_base.md)型の値`M`を求める。

- (2) : 範囲`[low, high)`の各文字`*p`について求めた値を、`vec[p - low]`へ格納する


## 戻り値
- (1) : 式`(M & m) != 0`の結果。すなわち、文字が指定された特性を持つ場合は`true`
- (2) : `high`


## バージョン
### 言語
- C++98


## 関連項目
- [`ctype::is`](is.md)
- [`ctype_base`](/reference/locale/ctype_base.md)
