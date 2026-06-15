# strndup
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  char* strndup(const char* s, size_t size);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
文字列を、上限サイズを指定して複製する。

C23で`<string.h>`に追加された関数であり、C++26で`<cstring>`に取り込まれた。


## 効果
[`std::malloc()`](/reference/cstdlib/malloc.md)を呼び出したときと同様に確保した領域に、`s`が指す配列の先頭から最大`size`文字、もしくは最初のヌル文字までのいずれか短いほうで初期化した文字列を作成する。

`s`が指す配列の先頭`size`文字にヌル文字が含まれない場合、複製の末尾にヌル文字が付加される。


## 戻り値
作成した文字列の先頭文字へのポインタを返す。

返されたポインタは[`std::free()`](/reference/cstdlib/free.md)に渡すことができる。

領域を確保できなかった場合、ヌルポインタを返す。


## 例
```cpp example
#include <cstring>
#include <cstdlib>
#include <iostream>

int main()
{
  char* p = std::strndup("hello world", 5);
  std::cout << p << std::endl;
  std::free(p);
}
```
* std::strndup[color ff0000]
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
- [`strdup`](strdup.md): 文字列を複製する
- [`std::free()`](/reference/cstdlib/free.md): 確保したメモリを解放する


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、この関数が`<cstring>`に追加された
