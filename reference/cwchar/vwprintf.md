# vwprintf
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int vwprintf(const wchar_t* format, va_list arg);
}
```
* va_list[link /reference/cstdarg/va_list.md]

## 概要
可変引数リスト`va_list`を使用し、書式を指定して標準出力へワイド文字列を出力する。


## 戻り値
[`wprintf()`](wprintf.md)と同じ。


## 備考
- この関数は[`va_end`](/reference/cstdarg/va_end.md)マクロを呼び出さないため、呼び出し側で`arg`に対して`va_end`を実行する必要がある


## 例
```cpp example
#include <cwchar>
#include <cstdarg>

void log_message(const wchar_t* format, ...)
{
  std::va_list args;
  va_start(args, format);
  std::vwprintf(format, args);
  va_end(args);
}

int main()
{
  log_message(L"%ls: %d\n", L"count", 42);
}
```
* std::vwprintf[color ff0000]

### 出力
```
count: 42
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wprintf`](wprintf.md)
- [`std::vprintf()`](/reference/cstdio/vprintf.md): マルチバイト文字列版
