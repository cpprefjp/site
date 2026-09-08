# wcschr
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  const wchar_t* wcschr(const wchar_t* s, wchar_t c); // (1)
  wchar_t* wcschr(wchar_t* s, wchar_t c);            // (2)
}
```

## 概要
ワイド文字列から文字を検索する。


## 戻り値
`s`が指す文字列の中で最初に現れる`c`を指すポインタを返す。見つからない場合はヌルポインタを返す。

終端のヌル文字も検索の対象となる。


## 備考
- C++では、引数の`const`性を保った結果を返すために、2つのオーバーロードとして宣言される
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  const wchar_t* s = L"hello";
  const wchar_t* p = std::wcschr(s, L'l');

  std::wcout << (p - s) << std::endl;
  std::wcout << p << std::endl;
}
```
* std::wcschr[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
2
llo
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcsrchr`](wcsrchr.md): 後方から検索する
- [`wcsstr`](wcsstr.md): 部分文字列を検索する
- [`std::strchr()`](/reference/cstring/strchr.md): マルチバイト文字列版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
