# LLONG_WIDTH
* climits[meta header]
* macro[meta id-type]
* cpp26[meta cpp]

```cpp
#define LLONG_WIDTH implementation-defined
```

## 概要
`long long`型の幅 (値ビット数) を表す。`#if`などのプリプロセッサディレクティブで使用できる。

幅 (width) とは、その型が値の表現に使用するビット数であり、符号付き整数型では符号ビットを含む。パディングビットを含むストレージサイズ (`sizeof` × [`CHAR_BIT`](/reference/climits/char_bit.md)) とは異なる場合がある。

C23で`<limits.h>`に追加されたマクロであり、C++26で`<climits>`に取り込まれた。


## 例
```cpp example
#include <climits>
#include <iostream>

int main()
{
  std::cout << LLONG_WIDTH << '\n';
}
```
* LLONG_WIDTH[color ff0000]

### 出力例
```
64
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
    - C++26がC23を参照するようになり、このマクロが`<climits>`に追加された
