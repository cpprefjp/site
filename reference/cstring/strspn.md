# strspn
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t strspn(const char* s1, const char* s2);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
文字列の先頭から、指定した文字集合の文字だけが続く長さを求める。


## 効果
`s1`が指す文字列の先頭から、`s2`が指す文字列に含まれる文字だけで構成される部分の長さを求める。


## 戻り値
`s2`に含まれない文字が最初に現れる位置までの文字数を返す。`s1`が`s2`に含まれる文字だけで構成される場合は、`s1`の長さ (終端のヌル文字を含まない) を返す。


## 備考
- この関数は、フリースタンディング処理系でも使用できる。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  // 先頭から'a'または'b'だけが続く長さを求める
  std::size_t n = std::strspn("aabbcc", "ab");

  std::cout << n << std::endl;
}
```
* std::strspn[color ff0000]

### 出力
```
4
```


## バージョン
### 言語
- C++98


## 関連項目
- [`strcspn`](strcspn.md): 指定した文字が現れるまでの長さを求める
- [`strpbrk`](strpbrk.md): 指定した文字が現れる位置を求める


## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
