# wmemcmp
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int wmemcmp(const wchar_t* s1, const wchar_t* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
指定した文字数のワイド文字を比較する。


## 戻り値
先頭から`n`文字を比較し、`s1`が`s2`より大きい場合は正の値、等しい場合は`0`、小さい場合は負の値を返す。


## 備考
- ヌル文字も通常の文字として比較される
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  std::wcout << (std::wmemcmp(L"abc", L"abd", 2) == 0) << std::endl;
  std::wcout << (std::wmemcmp(L"abc", L"abd", 3) < 0) << std::endl;
}
```
* std::wmemcmp[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
1
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcscmp`](wcscmp.md)
- [`std::memcmp()`](/reference/cstring/memcmp.md): バイト単位版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
