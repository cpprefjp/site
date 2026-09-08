# wcsncpy
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wchar_t* wcsncpy(wchar_t* s1, const wchar_t* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
文字数を指定して、ワイド文字列をコピーする。


## 効果
`s2`が指す文字列から、最大`n`文字を`s1`が指す配列へコピーする。`s2`の長さが`n`未満である場合、`n`文字になるまでヌル文字が書き込まれる。


## 戻り値
`s1`を返す。


## 備考
- `s2`の長さが`n`以上である場合、コピー先は終端のヌル文字をもたない。この場合、文字列としてそのまま扱った場合、動作は未定義である
- コピー元とコピー先の領域が重なっている場合、動作は未定義である
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  wchar_t buffer[8] = {};

  // 元の文字列が短い場合、残りはヌル文字で埋められる
  std::wcsncpy(buffer, L"abc", 7);

  std::wcout << buffer << std::endl;
}
```
* std::wcsncpy[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
abc
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcscpy`](wcscpy.md)
- [`std::strncpy()`](/reference/cstring/strncpy.md): マルチバイト文字列版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
