# wcsncat
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wchar_t* wcsncat(wchar_t* s1, const wchar_t* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
文字数を指定して、ワイド文字列を連結する。


## 効果
`s1`が指す文字列の末尾へ、`s2`が指す文字列から最大`n`文字を連結する。連結後の末尾には、必ずヌル文字が書き込まれる。


## 戻り値
`s1`を返す。


## 備考
- 連結先の領域は、連結後の文字列と終端のヌル文字を格納できる大きさでなければならない
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  wchar_t buffer[16] = L"hello";
  std::wcsncat(buffer, L" world", 3);

  std::wcout << buffer << std::endl;
}
```
* std::wcsncat[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
hello wo
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcscat`](wcscat.md)
- [`std::strncat()`](/reference/cstring/strncat.md): マルチバイト文字列版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
