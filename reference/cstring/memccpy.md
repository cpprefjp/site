# memccpy
* cstring[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  void* memccpy(void* s1, const void* s2, int c, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
メモリデータを、指定した文字が現れるまでコピーする。

C23で`<string.h>`に追加された関数であり、C++26で`<cstring>`に取り込まれた。

この関数はフリースタンディング環境でも提供される。


## 効果
`s2`が指すオブジェクトから`s1`が指すオブジェクトへ、文字`c` (`unsigned char`に変換される) が最初に現れてコピーされるまで、もしくは`n`バイトをコピーするまで、いずれか早いほうまでバイトをコピーする。

コピー元とコピー先の領域が重なっている場合、動作は未定義である。


## 戻り値
コピー先`s1`において、コピーされた文字`c`の次の位置を指すポインタを返す。

`s2`の先頭`n`バイトに文字`c`が見つからなかった場合、ヌルポインタを返す。


## 例
```cpp example
#include <cstring>
#include <iostream>

int main()
{
  const char src[] = "abc/def";
  char dst[8] = {};

  // '/'が現れるまでコピーする
  char* p = static_cast<char*>(std::memccpy(dst, src, '/', sizeof(dst)));

  std::cout << dst << std::endl;
  std::cout << (p != nullptr ? "found" : "not found") << std::endl;
}
```
* std::memccpy[color ff0000]

### 出力
```
abc/
found
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- `memcpy`: メモリデータをコピーする
- `memmove`: メモリデータをコピーする（領域重複可）


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.html)
    - C++26がC23を参照するようになり、この関数が`<cstring>`に追加された
