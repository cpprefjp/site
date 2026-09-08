# wcslen
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t wcslen(const wchar_t* s);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
ワイド文字列の長さを取得する。


## 効果
`s`が指す文字列の長さを求める。


## 戻り値
`s`が指す文字列の、終端のヌル文字より前にある文字の個数を返す。


## 備考
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  std::wcout << std::wcslen(L"hello") << std::endl;
}
```
* std::wcslen[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
5
```


## バージョン
### 言語
- C++98


## 関連項目
- [`std::strlen()`](/reference/cstring/strlen.md): マルチバイト文字列版
- [`std::char_traits::length`](/reference/string/char_traits/length.md)

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
