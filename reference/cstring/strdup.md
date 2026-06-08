# strdup
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  char* strdup(const char* s);
}
```

## 概要
文字列を複製する。

C23で`<string.h>`に追加された関数であり、C++26で`<cstring>`に取り込まれた。


## 効果
[`std::malloc()`](/reference/cstdlib/malloc.md)を呼び出したときと同様に確保した領域に、`s`が指す文字列 (終端のヌル文字を含む) の複製を作成する。


## 戻り値
複製した文字列の先頭文字へのポインタを返す。

返されたポインタは[`std::free()`](/reference/cstdlib/free.md)に渡すことができる。

領域を確保できなかった場合、ヌルポインタを返す。


## 例
```cpp example
#include <cstring>
#include <cstdlib>
#include <iostream>

int main()
{
  char* p = std::strdup("hello");
  std::cout << p << std::endl;
  std::free(p);
}
```
* std::strdup[color ff0000]
* std::free[link /reference/cstdlib/free.md]

### 出力
```
hello
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`strndup`](strndup.md): 文字列を複製する（上限サイズ指定）
- [`std::free()`](/reference/cstdlib/free.md): 確保したメモリを解放する


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.html)
    - C++26がC23を参照するようになり、この関数が`<cstring>`に追加された
