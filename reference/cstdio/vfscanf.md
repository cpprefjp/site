# vfscanf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  int vfscanf(FILE* stream, const char* format, va_list arg);
}
```
* FILE[link file.md]
* va_list[link /reference/cstdarg/va_list.md]

## 概要
可変引数リスト`va_list`を使用し、書式を指定してファイルストリームから入力する。

引数を`...`で受け取る[`fscanf()`](fscanf.md)と異なり、[`va_list`](/reference/cstdarg/va_list.md)としてまとめられた可変引数を受け取る。可変引数を受け取る自作の関数から、書式付き入力を行いたい場合に使用する。


## 戻り値
[`fscanf()`](fscanf.md)と同じ。


## 備考
- この関数は[`va_end`](/reference/cstdarg/va_end.md)マクロを呼び出さないため、呼び出し側で`arg`に対して`va_end`を実行する必要がある
- C++17で、参照するC標準ライブラリがC99からC11へ更新されたことにともなって追加された


## 例
```cpp example
#include <cstdio>
#include <cstdarg>

// 可変引数を受け取り、標準入力を解析する関数
int input_values(const char* format, ...)
{
  std::va_list args;
  va_start(args, format);
  int count = std::vfscanf(stdin, format, args);
  va_end(args);
  return count;
}

int main()
{
  int a = 0;
  int b = 0;
  int count = input_values("%d %d", &a, &b);

  std::printf("%d: %d %d\n", count, a, b);
}
```
* std::vfscanf[color ff0000]
* std::va_list[link /reference/cstdarg/va_list.md]
* va_start[link /reference/cstdarg/va_start.md]
* va_end[link /reference/cstdarg/va_end.md]
* std::printf[link printf.md]

### 出力例
（標準入力に「1 2」を与えた場合）

```
2: 1 2
```


## 処理系
- [Clang](/implementation.md#clang): 5.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]

### 備考
- Visual C++は2019（Compiler Explorerで利用できる最古のバージョン）で動作を確認しており、それ以前のバージョンでも使用できる可能性がある


## 関連項目
- [`fscanf`](fscanf.md)


## 参照
- [P0063R3 C++17 should refer to C11 instead of C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
    - C++17で、`vfscanf`・`vscanf`・`vsscanf`が追加された
