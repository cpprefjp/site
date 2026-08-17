# strcat
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  char* strcat(char* s1, const char* s2);
}
```

## 概要
文字列を結合する。


## 効果
`s2`が指す文字列を、終端のヌル文字を含めて`s1`が指す文字列の末尾に連結する。`s1`の終端ヌル文字が`s2`の先頭文字で上書きされる。

コピー元とコピー先の領域が重なっている場合、動作は未定義である。


## 戻り値
`s1`を返す。


## 備考
- この関数は、フリースタンディング処理系でも使用できる。
- `s1`が指す配列は、連結後の文字列を終端のヌル文字まで格納できる十分な大きさを持っていなければならない。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  char s[12] = "hello";

  std::strcat(s, " world");

  std::cout << s << std::endl;
}
```
* std::strcat[color ff0000]

### 出力
```
hello world
```


## バージョン
### 言語
- C++98


## 関連項目
- [`strncat`](strncat.md): 文字列を結合する（上限サイズ指定）
- [`strcpy`](strcpy.md): 文字列をコピーする


## 参照
- [P2338R4 Freestanding Library: Character primitives and the C library](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2338r4.html)
    - C++26で、この関数がフリースタンディング処理系で使用可能になった
