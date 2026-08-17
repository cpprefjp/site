# strcmp
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int strcmp(const char* s1, const char* s2);
}
```

## 概要
文字列を比較する。


## 効果
`s1`が指す文字列と`s2`が指す文字列を比較する。各文字は`unsigned char`として比較される。


## 戻り値
2つの文字列で最初に異なる文字について、`s1`側の文字が`s2`側の文字より大きい場合は正の整数、小さい場合は負の整数を返す。2つの文字列が等しい場合は`0`を返す。


## 備考
- この関数は、フリースタンディング処理系でも使用できる。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  std::cout << std::boolalpha;
  std::cout << (std::strcmp("abc", "abc") == 0) << std::endl;
  std::cout << (std::strcmp("abc", "abd") < 0) << std::endl;
}
```
* std::strcmp[color ff0000]

### 出力
```
true
true
```


## バージョン
### 言語
- C++98


## 関連項目
- [`strncmp`](strncmp.md): 文字列を比較する（上限サイズ指定）
- [`strcoll`](strcoll.md): 文字列を比較する（ロケール依存）
- [`memcmp`](memcmp.md): メモリデータを比較する


## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
