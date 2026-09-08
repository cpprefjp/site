# wcscmp
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int wcscmp(const wchar_t* s1, const wchar_t* s2);
}
```

## 概要
2つのワイド文字列を比較する。


## 戻り値
`s1`が`s2`より大きい場合は正の値、等しい場合は`0`、小さい場合は負の値を返す。

比較は、`wchar_t`の値どうしの大小によって、先頭から順に行われる。


## 備考
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  std::wcout << (std::wcscmp(L"abc", L"abc") == 0) << std::endl;
  std::wcout << (std::wcscmp(L"abc", L"abd") < 0) << std::endl;
}
```
* std::wcscmp[color ff0000]
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
- [`wcsncmp`](wcsncmp.md): 文字数を指定して比較する
- [`wcscoll`](wcscoll.md): ロケールに従って比較する
- [`std::strcmp()`](/reference/cstring/strcmp.md): マルチバイト文字列版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
