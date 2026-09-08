# wcscspn
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t wcscspn(const wchar_t* s1, const wchar_t* s2);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
ワイド文字列の先頭から、指定した集合に含まれない文字が続く長さを取得する。


## 戻り値
`s1`が指す文字列の先頭から、`s2`が指す文字列に含まれない文字だけが並んでいる部分の長さを返す。


## 備考
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  // 先頭から "lo" に含まれない文字が続く長さ
  std::wcout << std::wcscspn(L"hello", L"lo") << std::endl;
}
```
* std::wcscspn[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
2
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcsspn`](wcsspn.md)
- [`wcspbrk`](wcspbrk.md)
- [`std::strcspn()`](/reference/cstring/strcspn.md): マルチバイト文字列版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
