# iswalnum
* cwctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int iswalnum(wint_t wc);
}
```
* wint_t[link /reference/cwchar/wint_t.md]


## 概要
ワイド文字`wc`が英数字であるかを判定する。判定は、ロケールの[`LC_CTYPE`](/reference/clocale/lc_ctype.md)カテゴリの影響を受ける。


## 戻り値
`wc`が英数字であると判定されれば非ゼロの値を、そうでなければ`0`を返す。


## 例
```cpp example
#include <cwctype>
#include <iostream>

int main()
{
  std::cout << std::boolalpha;
  std::cout << (std::iswalnum(L'a') != 0) << std::endl;
  std::cout << (std::iswalnum(L'.') != 0) << std::endl;
}
```
* std::iswalnum[color ff0000]

### 出力
```
true
false
```


## バージョン
### 言語
- C++98


## 関連項目
- [`isalnum`](/reference/cctype/isalnum.md) : 1バイト文字に対する同じ判定
- [`iswctype`](iswctype.md) : 種別を実行時に指定して判定する
