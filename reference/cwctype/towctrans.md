# towctrans
* cwctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wint_t towctrans(wint_t wc, wctrans_t desc);
}
```
* wint_t[link /reference/cwchar/wint_t.md]
* wctrans_t[link wctrans_t.md]


## 概要
ワイド文字`wc`を、[`wctrans()`](wctrans.md)で取得した変換規則`desc`に従って変換する。

変換規則を実行時に指定できるため、[`towlower()`](towlower.md)・[`towupper()`](towupper.md)では表せない、ロケールが定義する変換も行える。


## 戻り値
変換規則`desc`によって`wc`を変換した結果。


## 例
```cpp example
#include <cwctype>
#include <iostream>

int main()
{
  std::wctrans_t lower = std::wctrans("tolower");

  std::wcout << static_cast<wchar_t>(std::towctrans(L'A', lower)) << std::endl;
  std::wcout << static_cast<wchar_t>(std::towctrans(L'1', lower)) << std::endl;
}
```
* std::towctrans[color ff0000]
* std::wctrans_t[link wctrans_t.md]
* std::wctrans[link wctrans.md]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
a
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wctrans`](wctrans.md)
- [`wctrans_t`](wctrans_t.md)
- [`iswctype`](iswctype.md)
