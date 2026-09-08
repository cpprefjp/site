# wcscpy
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wchar_t* wcscpy(wchar_t* s1, const wchar_t* s2);
}
```

## 概要
ワイド文字列をコピーする。


## 効果
`s2`が指す文字列を、終端のヌル文字を含めて`s1`が指す配列へコピーする。


## 戻り値
`s1`を返す。


## 備考
- コピー先の領域は、終端のヌル文字を含む文字列全体を格納できる大きさでなければならない。不足している場合の動作は未定義である
- コピー元とコピー先の領域が重なっている場合、動作は未定義である
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  wchar_t buffer[16];
  std::wcscpy(buffer, L"hello");

  std::wcout << buffer << std::endl;
}
```
* std::wcscpy[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
hello
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcsncpy`](wcsncpy.md): 文字数を指定してコピーする
- [`std::strcpy()`](/reference/cstring/strcpy.md): マルチバイト文字列版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
