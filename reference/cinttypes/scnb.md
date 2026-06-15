# SCNbN
* cinttypes[meta header]
* macro[meta id-type]
* cpp26[meta cpp]

```cpp
// N はビット幅 (8, 16, 32, 64 など)
#define SCNbN implementation-defined
```

## 概要
[`<cstdint>`](/reference/cstdint.md)の固定幅整数型を、[`std::scanf`](/reference/cstdio/scanf.md)系関数で**2進数**として入力するための変換指定子を表すマクロ。`"%" SCNb16` のように文字列リテラルと連結して書式文字列を構成する。

C23で`<inttypes.h>`に追加されたマクロであり、C++26で`<cinttypes>`に取り込まれた。

対象とする整数型に応じて、以下のマクロが定義される (*N*は`8`/`16`/`32`/`64`などのビット幅)。

| マクロ | 対象の型 |
|--------|----------|
| `SCNb`*N*       | `int`*N*`_t` / `uint`*N*`_t` |
| `SCNbLEAST`*N*  | `int_least`*N*`_t` / `uint_least`*N*`_t` |
| `SCNbFAST`*N*   | `int_fast`*N*`_t` / `uint_fast`*N*`_t` |
| `SCNbMAX`       | `intmax_t` / `uintmax_t` |
| `SCNbPTR`       | `intptr_t` / `uintptr_t` |


## 例
```cpp example
#include <cinttypes>
#include <cstdint>
#include <cstdio>

int main()
{
  std::uint16_t x = 0;
  std::sscanf("1101", "%" SCNb16, &x); // "1101"を2進数として解釈する
  std::printf("%d\n", x);
}
```
* SCNb16[color ff0000]
* std::sscanf[link /reference/cstdio/sscanf.md.nolink]
* std::printf[link /reference/cstdio/printf.md]

### 出力
```
13
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`PRIbN`, `PRIBN`](prib.md): 固定幅整数型を2進数として出力するための変換指定子


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、これらのマクロが`<cinttypes>`に追加された
