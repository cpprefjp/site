# vsprintf
* cstdio[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int vsprintf(char* buffer, const char* format, va_list arg);
}
```
* va_list[link /reference/cstdarg/va_list.md]

## 概要
可変引数リスト`va_list`を使用し、書式を指定して文字列領域に出力する。

引数を`...`で受け取る[`sprintf()`](sprintf.md)と異なり、[`va_list`](/reference/cstdarg/va_list.md)としてまとめられた可変引数を受け取る。可変引数を受け取る自作の関数から、書式付き出力を行いたい場合に使用する。


## 戻り値
[`sprintf()`](sprintf.md)と同じ。


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
  std::vsprintf(buffer, format, args);
  va_end(args);
  std::printf("%s", buffer);
}

int main()
{
  log_message("%s: %d\n", "count", 42);
}
```
* std::vsprintf[color ff0000]
* std::va_list[link /reference/cstdarg/va_list.md]
* va_start[link /reference/cstdarg/va_start.md]
* va_end[link /reference/cstdarg/va_end.md]
* std::printf[link printf.md]

### 出力
```
count: 42
```


## 関連項目
- [`sprintf`](sprintf.md)
