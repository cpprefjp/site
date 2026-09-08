# wcsstr
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  const wchar_t* wcsstr(const wchar_t* s1, const wchar_t* s2); // (1)
  wchar_t* wcsstr(wchar_t* s1, const wchar_t* s2);            // (2)
}
```

## 概要
ワイド文字列から部分文字列を検索する。


## 戻り値
`s1`が指す文字列の中で最初に現れる`s2`の並びを指すポインタを返す。見つからない場合はヌルポインタを返す。`s2`が空文字列である場合は`s1`を返す。


## 備考
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  const wchar_t* s = L"hello world";
  const wchar_t* p = std::wcsstr(s, L"wor");

  std::wcout << (p - s) << std::endl;
}
```
* std::wcsstr[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
6
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcschr`](wcschr.md)
- [`std::strstr()`](/reference/cstring/strstr.md): マルチバイト文字列版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
