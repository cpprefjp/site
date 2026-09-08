# wmemmove
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wchar_t* wmemmove(wchar_t* s1, const wchar_t* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
領域が重なっていてもよい形で、指定した文字数のワイド文字をコピーする。


## 効果
`s2`が指す領域から`n`文字を、`s1`が指す領域へコピーする。2つの領域が重なっていても、`s2`の内容をいったん一時領域へ複製したかのように正しくコピーされる。


## 戻り値
`s1`を返す。


## 備考
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  wchar_t buffer[8] = L"abcdef";

  // 領域が重なっていても正しくコピーされる
  std::wmemmove(buffer + 1, buffer, 5);

  std::wcout << buffer << std::endl;
}
```
* std::wmemmove[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
aabcde
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wmemcpy`](wmemcpy.md)
- [`std::memmove()`](/reference/cstring/memmove.md): バイト単位版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
