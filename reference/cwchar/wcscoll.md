# wcscoll
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int wcscoll(const wchar_t* s1, const wchar_t* s2);
}
```

## 概要
現在のロケールの照合順序に従って、2つのワイド文字列を比較する。


## 戻り値
照合順序において`s1`が`s2`より大きい場合は正の値、等しい場合は`0`、小さい場合は負の値を返す。


## 備考
- 文字コードの値で比較する[`wcscmp()`](wcscmp.md)と異なり、`LC_COLLATE`カテゴリのロケールに従って比較する


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  std::wcout << (std::wcscoll(L"abc", L"abc") == 0) << std::endl;
}
```
* std::wcscoll[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcscmp`](wcscmp.md)
- [`wcsxfrm`](wcsxfrm.md)
- [`std::strcoll()`](/reference/cstring/strcoll.md): マルチバイト文字列版
