# PRIbN, PRIBN
* cinttypes[meta header]
* macro[meta id-type]
* cpp26[meta cpp]

```cpp
// N はビット幅 (8, 16, 32, 64 など)
#define PRIbN implementation-defined
#define PRIBN implementation-defined
// PRIbLEASTN / PRIbFASTN / PRIbMAX / PRIbPTR とその大文字版も同様
```

## 概要
[`<cstdint>`](/reference/cstdint.md)の固定幅整数型を、[`std::printf`](/reference/cstdio/printf.md)系関数で**2進数**として出力するための変換指定子を表すマクロ。`"%" PRIb16` のように文字列リテラルと連結して書式文字列を構成する。

- `PRIb`*N* : `0b`プレフィックス (`#`フラグ使用時) の小文字形式
- `PRIB`*N* : `0B`プレフィックス (`#`フラグ使用時) の大文字形式

C23で`<inttypes.h>`に追加されたマクロであり、C++26で`<cinttypes>`に取り込まれた。

対象とする整数型に応じて、以下のマクロが定義される (*N*は`8`/`16`/`32`/`64`などのビット幅)。

| マクロ | 対象の型 |
|--------|----------|
| `PRIb`*N*, `PRIB`*N*             | `int`*N*`_t` / `uint`*N*`_t` |
| `PRIbLEAST`*N*, `PRIBLEAST`*N*   | `int_least`*N*`_t` / `uint_least`*N*`_t` |
| `PRIbFAST`*N*, `PRIBFAST`*N*     | `int_fast`*N*`_t` / `uint_fast`*N*`_t` |
| `PRIbMAX`, `PRIBMAX`             | `intmax_t` / `uintmax_t` |
| `PRIbPTR`, `PRIBPTR`             | `intptr_t` / `uintptr_t` |


## 例
```cpp example
#include <cinttypes>
#include <cstdint>
#include <cstdio>

int main()
{
  std::uint16_t x = 10;

  // 小文字版: 0b プレフィックス
  std::printf("%#" PRIb16 "\n", x);

  // 大文字版: 0B プレフィックス
  std::printf("%#" PRIB16 "\n", x);
}
```
* PRIb16[color ff0000]
* PRIB16[color ff0000]
* std::printf[link /reference/cstdio/printf.md]

### 出力
```
0b1010
0B1010
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`SCNbN`](scnb.md): 固定幅整数型を2進数として入力するための変換指定子


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、これらのマクロが`<cinttypes>`に追加された
