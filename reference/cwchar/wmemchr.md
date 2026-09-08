# wmemchr
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  const wchar_t* wmemchr(const wchar_t* s, wchar_t c, size_t n); // (1)
  wchar_t* wmemchr(wchar_t* s, wchar_t c, size_t n);            // (2)
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
指定した文字数の中からワイド文字を検索する。


## 戻り値
`s`が指す領域の先頭`n`文字の中で、最初に現れる`c`を指すポインタを返す。見つからない場合はヌルポインタを返す。


## 備考
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  const wchar_t* s = L"hello";
  const wchar_t* p = std::wmemchr(s, L'l', 5);

  std::wcout << (p - s) << std::endl;
}
```
* std::wmemchr[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
2
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcschr`](wcschr.md)
- [`std::memchr()`](/reference/cstring/memchr.md): バイト単位版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
