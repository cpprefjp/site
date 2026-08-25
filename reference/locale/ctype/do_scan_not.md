# do_scan_not
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
protected:
  virtual const charT*
    do_scan_not(mask m,
                const charT* low,
                const charT* high) const; // (1) C++98
```
* mask[link /reference/locale/ctype_base.md]

## 概要
文字列中の、指定した分類に該当しない最初の文字を取得する。[`scan_not()`](scan_not.md)から呼び出される仮想関数である。


## 効果
バッファ内で、分類`m`に該当しない文字を検索する。


## 戻り値
範囲`[low, high)`内で、[`is(m, *p)`](is.md)が`false`を返すような最小のポインタ`p`。そのような文字がない場合は`high`。

## バージョン
### 言語
- C++98


## 関連項目
- [`ctype::scan_not`](scan_not.md)
