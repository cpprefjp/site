# wcsncmp
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int wcsncmp(const wchar_t* s1, const wchar_t* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
文字数を指定して、2つのワイド文字列を比較する。


## 戻り値
先頭から最大`n`文字を比較し、`s1`が`s2`より大きい場合は正の値、等しい場合は`0`、小さい場合は負の値を返す。


## 備考
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  // 先頭3文字だけを比較する
  std::wcout << (std::wcsncmp(L"abcXYZ", L"abcDEF", 3) == 0) << std::endl;
}
```
* std::wcsncmp[color ff0000]
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
- [`std::strncmp()`](/reference/cstring/strncmp.md): マルチバイト文字列版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
