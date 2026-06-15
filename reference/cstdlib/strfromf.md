# strfromf
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  int strfromf(char* s, size_t n, const char* format, float fp);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
`float`型の浮動小数点数を文字列に変換する。

C23で`<stdlib.h>`に追加された関数であり、C++26で`<cstdlib>`に取り込まれた。


## 事前条件
`format`は、文字`%`、アスタリスク`*`を含まない精度指定 (省略可)、および変換指定子`a`・`A`・`e`・`E`・`f`・`F`・`g`・`G`のいずれか1つだけで構成されること。


## 効果
[`std::snprintf`](/reference/cstdio/snprintf.md.nolink)`(s, n, format, fp)`と等価である。


## 戻り値
`n`が十分に大きいと仮定した場合に書き込まれる文字数を、終端のヌル文字を除いて返す。

したがって、ヌル終端された出力が完全に書き込まれたのは、戻り値が非負かつ`n`未満である場合に限られる。


## 例
```cpp example
#include <cstdlib>
#include <print>

int main()
{
  char buf[32];
  std::strfromf(buf, sizeof(buf), "%.2f", 3.14159f);
  std::println("{}", buf);
}
```
* std::strfromf[color ff0000]

### 出力
```
3.14
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`strfromd`](strfromd.md): `double`型を文字列に変換する
- [`strfroml`](strfroml.md): `long double`型を文字列に変換する
- [`std::to_chars`](/reference/charconv/to_chars.md): 数値を文字列に変換する


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、この関数が`<cstdlib>`に追加された
