# wcstok
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wchar_t* wcstok(wchar_t* s1, const wchar_t* s2, wchar_t** ptr);
}
```

## 概要
ワイド文字列を、区切り文字によって分割する。


## 効果
最初の呼び出しでは`s1`に対象の文字列を渡し、2回目以降は`s1`にヌルポインタを渡すことで、続きのトークンを取り出す。`s2`には区切り文字の集合を指定する。`ptr`には、呼び出しをまたいで状態を保持するための`wchar_t*`オブジェクトのアドレスを渡す。


## 戻り値
取り出したトークンの先頭を指すポインタを返す。取り出せるトークンがない場合はヌルポインタを返す。


## 備考
- 対象の文字列は書き換えられる（区切り文字がヌル文字に置き換えられる）ため、文字列リテラルを渡してはならない
- C標準ライブラリの`wcstok`と異なり、C++では状態を`ptr`で受け取るため、複数のスレッドから安全に使用できる
- この関数は、C++26からフリースタンディング処理系でも使用できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  wchar_t str[] = L"a,b,c";
  wchar_t* ptr = nullptr;

  for (wchar_t* token = std::wcstok(str, L",", &ptr);
       token != nullptr;
       token = std::wcstok(nullptr, L",", &ptr)) {
    std::wcout << token << std::endl;
  }
}
```
* std::wcstok[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
a
b
c
```


## バージョン
### 言語
- C++98


## 関連項目
- [`std::strtok()`](/reference/cstring/strtok.md): マルチバイト文字列版

## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
