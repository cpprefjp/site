# wmemcpy
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wchar_t* wmemcpy(wchar_t* s1, const wchar_t* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
指定した文字数のワイド文字をコピーする。


## 効果
`s2`が指す領域から`n`文字を、`s1`が指す領域へコピーする。ヌル文字も通常の文字としてコピーされる。


## 戻り値
`s1`を返す。


## 備考
- 2つの領域が重なっている場合、動作は未定義である。重なりうる場合は[`wmemmove()`](wmemmove.md)を使用する
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  wchar_t buffer[8] = {};
  std::wmemcpy(buffer, L"hello", 5);

  std::wcout << buffer << std::endl;
}
```
* std::wmemcpy[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
hello
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wmemmove`](wmemmove.md)
- [`std::memcpy()`](/reference/cstring/memcpy.md): バイト単位版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
