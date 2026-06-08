# UINT_FAST8_WIDTH
* cstdint[meta header]
* macro[meta id-type]
* cpp26[meta cpp]

```cpp
#define UINT_FAST8_WIDTH implementation-defined
```

## 概要
[`uint_fast8_t`](uint_fast8_t.md)型の幅 (値ビット数) を表す。`#if`などのプリプロセッサディレクティブで使用できる。

幅 (width) とは、その型が値の表現に使用するビット数であり、符号付き整数型では符号ビットを含む。パディングビットを含むストレージサイズ (`sizeof` × [`CHAR_BIT`](/reference/climits/char_bit.md)) とは異なる場合がある。

C23で`<stdint.h>`に追加されたマクロであり、C++26で`<cstdint>`に取り込まれた。


## 例
```cpp example
#include <cstdint>
#include <iostream>

int main()
{
  std::cout << UINT_FAST8_WIDTH << '\n';
}
```
* UINT_FAST8_WIDTH[color ff0000]

### 出力例
```
8
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 17 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.html)
    - C++26がC23を参照するようになり、このマクロが`<cstdint>`に追加された
