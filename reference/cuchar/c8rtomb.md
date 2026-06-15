# c8rtomb
* cuchar[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  size_t c8rtomb(char* s, char8_t c8, mbstate_t* ps);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
UTF-8文字 (`char8_t`) を、マルチバイト文字に変換する。

C23で`<uchar.h>`に追加された関数であり、C++26で`<cuchar>`に取り込まれた。


## 効果
`s`がヌルポインタの場合、内部バッファを`buf`として`c8rtomb(buf, u8'\0', ps)`の呼び出しと等価である。

`s`がヌルポインタでない場合、`c8`によって与えられた (もしくは完成した) 文字に対応するマルチバイト文字の表現に必要なバイト数を判定し、その表現を`s`が指す配列に格納する。`c8`が完全な文字を表していない場合は何も格納しない。格納されるバイト数は最大で[`MB_CUR_MAX`](/reference/cstdlib/mb_cur_max.md)である。

`c8`がヌル文字の場合、初期シフト状態へ戻すために必要なシフトシーケンスに続けてヌルバイトが格納される。


## 戻り値
配列に格納したバイト数 (シフトシーケンスを含む) を返す。

`c8`が有効な文字でない場合、エンコードエラーとなり、`errno`に`EILSEQ`が格納され`(size_t)(-1)`を返す。このとき変換状態は未規定となる。


## 例
```cpp example
#include <cuchar>
#include <print>

int main()
{
  char buf[8] = {};
  std::mbstate_t state{};

  std::size_t r = std::c8rtomb(buf, u8'A', &state);
  std::println("{} {}", r, buf);
}
```
* std::c8rtomb[color ff0000]

### 出力例
```
1 A
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`mbrtoc8`](mbrtoc8.md): マルチバイト文字を、UTF-8文字 (`char8_t`) に変換する


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、この関数が`<cuchar>`に追加された
