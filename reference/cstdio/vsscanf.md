# vsscanf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  int vsscanf(const char* buffer, const char* format, va_list arg);
}
```
* va_list[link /reference/cstdarg/va_list.md]

## 概要
可変引数リスト`va_list`を使用し、書式を指定して文字列領域から入力する。

引数を`...`で受け取る[`sscanf()`](sscanf.md)と異なり、[`va_list`](/reference/cstdarg/va_list.md)としてまとめられた可変引数を受け取る。可変引数を受け取る自作の関数から、書式付き入力を行いたい場合に使用する。


## 戻り値
[`sscanf()`](sscanf.md)と同じ。


## 備考
- この関数は[`va_end`](/reference/cstdarg/va_end.md)マクロを呼び出さないため、呼び出し側で`arg`に対して`va_end`を実行する必要がある
- C++17で、参照するC標準ライブラリがC99からC11へ更新されたことにともなって追加された


## 例
```cpp example
#include <cstdio>
#include <cstdarg>

// 可変引数を受け取り、文字列を解析する関数
int parse(const char* input, const char* format, ...)
{
  std::va_list args;
  va_start(args, format);
  int count = std::vsscanf(input, format, args);
  va_end(args);
  return count;
}

int main()
{
  int year = 0;
  int month = 0;
  int day = 0;
  int count = parse("2026-09-08", "%d-%d-%d", &year, &month, &day);

  std::printf("%d: %d/%d/%d\n", count, year, month, day);
}
```
* std::vsscanf[color ff0000]
* std::va_list[link /reference/cstdarg/va_list.md]
* va_start[link /reference/cstdarg/va_start.md]
* va_end[link /reference/cstdarg/va_end.md]
* std::printf[link printf.md]

### 出力
```
3: 2026/9/8
```


## 処理系
- [Clang](/implementation.md#clang): 5.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]

### 備考
- Visual C++は2019（Compiler Explorerで利用できる最古のバージョン）で動作を確認しており、それ以前のバージョンでも使用できる可能性がある


## 関連項目
- [`sscanf`](sscanf.md)


## 参照
- [P0063R3 C++17 should refer to C11 instead of C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
    - C++17で、`vfscanf`・`vscanf`・`vsscanf`が追加された
