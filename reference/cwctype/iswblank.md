# iswblank
* cwctype[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int iswblank(wint_t wc);
}
```
* wint_t[link /reference/cwchar/wint_t.md]


## 概要
ワイド文字`wc`が空白類文字 (スペースと水平タブ)であるかを判定する。判定は、ロケールの[`LC_CTYPE`](/reference/clocale/lc_ctype.md)カテゴリの影響を受ける。


## 戻り値
`wc`が空白類文字 (スペースと水平タブ)であると判定されれば非ゼロの値を、そうでなければ`0`を返す。


## 例
```cpp example
#include <cwctype>
#include <iostream>

int main()
{
  std::cout << std::boolalpha;
  std::cout << (std::iswblank(L' ') != 0) << std::endl;
  std::cout << (std::iswblank(L'a') != 0) << std::endl;
}
```
* std::iswblank[color ff0000]

### 出力
```
true
false
```


## バージョン
### 言語
- C++11


## 関連項目
- [`isblank`](/reference/cctype/isblank.md) : 1バイト文字に対する同じ判定
- [`iswctype`](iswctype.md) : 種別を実行時に指定して判定する
