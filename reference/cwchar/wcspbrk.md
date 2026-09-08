# wcspbrk
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  const wchar_t* wcspbrk(const wchar_t* s1, const wchar_t* s2); // (1)
  wchar_t* wcspbrk(wchar_t* s1, const wchar_t* s2);            // (2)
}
```

## 概要
ワイド文字列から、指定した集合に含まれる文字を検索する。


## 戻り値
`s1`が指す文字列の中で、`s2`が指す文字列に含まれるいずれかの文字が最初に現れる位置を指すポインタを返す。見つからない場合はヌルポインタを返す。


## 備考
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  const wchar_t* s = L"hello";

  // 'l'と'o'のどちらかが最初に現れる位置
  const wchar_t* p = std::wcspbrk(s, L"lo");

  std::wcout << (p - s) << std::endl;
}
```
* std::wcspbrk[color ff0000]
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
- [`wcscspn`](wcscspn.md)
- [`std::strpbrk()`](/reference/cstring/strpbrk.md): マルチバイト文字列版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
