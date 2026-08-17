# strncpy
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  char* strncpy(char* s1, const char* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
文字列を、上限サイズを指定してコピーする。


## 効果
`s2`が指す配列から`s1`が指す配列へ、最大`n`バイトをコピーする。`s2`の終端ヌル文字の後ろにあるバイトはコピーされない。

`s2`の長さ (終端ヌル文字を含まない) が`n`未満である場合、`s1`の残りのバイトはヌル文字で埋められる。

`s2`の長さ (終端ヌル文字を含まない) が`n`以上である場合、`s1`にはヌル文字が付加されない。

コピー元とコピー先の領域が重なっている場合、動作は未定義である。


## 戻り値
`s1`を返す。


## 備考
- この関数は、フリースタンディング処理系でも使用できる。
- コピー元の長さが`n`以上の場合、コピー先はヌル終端されないため、文字列として扱う際には注意が必要である。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  char dst[8] = {};

  // 最大8バイトをコピーする。"hello"は5文字なので、残りはヌル文字で埋められる
  std::strncpy(dst, "hello", sizeof(dst));

  std::cout << dst << std::endl;
}
```
* std::strncpy[color ff0000]

### 出力
```
hello
```


## バージョン
### 言語
- C++98


## 関連項目
- [`strcpy`](strcpy.md): 文字列をコピーする
- [`strncat`](strncat.md): 文字列を結合する（上限サイズ指定）
- [`strndup`](strndup.md): 文字列を複製する（上限サイズ指定）


## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
