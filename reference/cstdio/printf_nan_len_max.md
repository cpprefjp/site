# _PRINTF_NAN_LEN_MAX
* cstdio[meta header]
* macro[meta id-type]
* cpp26[meta cpp]

```cpp
#define _PRINTF_NAN_LEN_MAX implementation-defined
```

## 概要
`printf`系関数がNaN (非数) を出力する際に生成しうる、最大の文字数を表す整数定数。

`%f`・`%e`・`%g`などの浮動小数点変換でNaNを出力する場合、処理系は`nan`や`nan(n-char-sequence)`形式の文字列を生成する。このマクロは、その文字列の最大長を表す。出力先バッファのサイズを決定する際に利用できる。

C23で`<stdio.h>`に追加されたマクロであり、C++26で`<cstdio>`に取り込まれた。


## 備考
- 規格上、値は`3`以上であることが規定されている


## 例
```cpp example
#include <cstdio>
#include <cmath>

int main()
{
  // NaNを出力するのに十分なバッファを確保する
  char buf[_PRINTF_NAN_LEN_MAX + 1];

  std::snprintf(buf, sizeof(buf), "%f", NAN);
  std::printf("%s\n", buf);
}
```
* _PRINTF_NAN_LEN_MAX[color ff0000]
* std::snprintf[link /reference/cstdio/snprintf.md.nolink]
* NAN[link /reference/cmath/nan.md]

### 出力例
```
nan
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.html)
    - C++26がC23を参照するようになり、このマクロが`<cstdio>`に追加された
