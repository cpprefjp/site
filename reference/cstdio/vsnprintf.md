# vsnprintf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int vsnprintf(char* buffer, size_t n, const char* format, va_list arg);
}
```
* size_t[link /reference/cstddef/size_t.md]
* va_list[link /reference/cstdarg/va_list.md]

## 概要
可変引数リスト`va_list`を使用し、書式と文字数の上限を指定して文字列領域に出力する。

引数を`...`で受け取る[`snprintf()`](snprintf.md)と異なり、[`va_list`](/reference/cstdarg/va_list.md)としてまとめられた可変引数を受け取る。可変引数を受け取る自作の関数から、書式付き出力を行いたい場合に使用する。


## 戻り値
[`snprintf()`](snprintf.md)と同じ。


## 備考
- この関数は[`va_end`](/reference/cstdarg/va_end.md)マクロを呼び出さないため、呼び出し側で`arg`に対して`va_end`を実行する必要がある


## 例
```cpp example
#include <cstdio>
#include <cstdarg>

// 可変引数を受け取り、書式付きで出力する関数
void log_message(const char* format, ...)
{
  char buffer[64];

  std::va_list args;
  va_start(args, format);
  std::vsnprintf(buffer, sizeof(buffer), format, args);
  va_end(args);
  std::printf("%s", buffer);
}

int main()
{
  log_message("%s: %d\n", "count", 42);
}
```
* std::vsnprintf[color ff0000]
* std::va_list[link /reference/cstdarg/va_list.md]
* va_start[link /reference/cstdarg/va_start.md]
* va_end[link /reference/cstdarg/va_end.md]
* std::printf[link printf.md]

### 出力
```
count: 42
```


## 処理系
- [Clang](/implementation.md#clang): 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]

### 備考
- 動作確認した範囲での最小バージョンを記載している。Clangは3.4（Compiler Explorerで利用できる最古のバージョン）、Visual C++は2019（同左）で動作を確認しており、それ以前のバージョンでも使用できる可能性がある


## 関連項目
- [`snprintf`](snprintf.md)
