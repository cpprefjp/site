# towlower
* cwctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wint_t towlower(wint_t wc);
}
```
* wint_t[link /reference/cwchar/wint_t.md]


## 概要
ワイド文字`wc`を小文字に変換する。変換は、ロケールの[`LC_CTYPE`](/reference/clocale/lc_ctype.md)カテゴリの影響を受ける。


## 戻り値
現在のロケールで`wc`に対応する小文字が定義されていれば、その文字を返す。そうでなければ`wc`をそのまま返す。


## 例
```cpp example
#include <cwctype>
#include <iostream>

int main()
{
  std::wcout << static_cast<wchar_t>(std::towlower(L'A')) << std::endl;

  // 対応する小文字がない文字は変換されない
  std::wcout << static_cast<wchar_t>(std::towlower(L'1')) << std::endl;
}
```
* std::towlower[color ff0000]
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
- [`tolower`](/reference/cctype/tolower.md) : 1バイト文字に対する同じ変換
- [`towupper`](towupper.md) : 逆方向の変換
- [`towctrans`](towctrans.md) : 変換規則を実行時に指定して変換する
