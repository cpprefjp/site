# BOOL_WIDTH
* climits[meta header]
* macro[meta id-type]
* cpp26[meta cpp]

```cpp
#define BOOL_WIDTH 1
```

## 概要
`bool`型の幅 (値ビット数) を表す。`#if`などのプリプロセッサディレクティブで使用できる。

`bool`型は値として`0`と`1`のみを持つため値ビットは1個であり、このマクロの値は規格によって正確に`1`と定められている (ストレージサイズである`sizeof(bool) * `[`CHAR_BIT`](char_bit.md)とは異なる)。

C23で`<limits.h>`に追加されたマクロであり、C++26で`<climits>`に取り込まれた。


## 例
```cpp example
#include <climits>
#include <iostream>

int main()
{
  std::cout << BOOL_WIDTH << '\n';
}
```
* BOOL_WIDTH[color ff0000]

### 出力
```
1
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 17 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、このマクロが`<climits>`に追加された
