# strncmp
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int strncmp(const char* s1, const char* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
文字列を、上限サイズを指定して比較する。


## 効果
`s1`が指す配列と`s2`が指す配列を、先頭から最大`n`文字まで比較する。いずれかの文字列で終端ヌル文字に達した場合、そこで比較を終える。各文字は`unsigned char`として比較される。


## 戻り値
比較した範囲で最初に異なる文字について、`s1`側の文字が`s2`側の文字より大きい場合は正の整数、小さい場合は負の整数を返す。比較した範囲が等しい場合は`0`を返す。


## 備考
- この関数は、フリースタンディング処理系でも使用できる。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  std::cout << std::boolalpha;

  // 先頭3文字だけを比較する
  std::cout << (std::strncmp("abcXXX", "abcYYY", 3) == 0) << std::endl;
}
```
* std::strncmp[color ff0000]

### 出力
```
true
```


## バージョン
### 言語
- C++98


## 関連項目
- [`strcmp`](strcmp.md): 文字列を比較する
- [`memcmp`](memcmp.md): メモリデータを比較する


## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
