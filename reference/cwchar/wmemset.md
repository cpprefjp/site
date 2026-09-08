# wmemset
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wchar_t* wmemset(wchar_t* s, wchar_t c, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
指定した文字数のワイド文字を、指定した文字で埋める。


## 効果
`s`が指す領域の先頭`n`文字を、`c`で埋める。


## 戻り値
`s`を返す。


## 備考
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  wchar_t buffer[8] = {};
  std::wmemset(buffer, L'x', 5);

  std::wcout << buffer << std::endl;
}
```
* std::wmemset[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
xxxxx
```


## バージョン
### 言語
- C++98


## 関連項目
- [`std::memset()`](/reference/cstring/memset.md): バイト単位版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
