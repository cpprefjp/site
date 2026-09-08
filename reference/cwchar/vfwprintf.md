# vfwprintf
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int vfwprintf(FILE* stream, const wchar_t* format, va_list arg);
}
```
* FILE[link /reference/cstdio/file.md]
* va_list[link /reference/cstdarg/va_list.md]

## 概要
可変引数リスト`va_list`を使用し、書式を指定してファイルストリームへワイド文字列を出力する。


## 戻り値
[`fwprintf()`](fwprintf.md)と同じ。


## 備考
- この関数は[`va_end`](/reference/cstdarg/va_end.md)マクロを呼び出さないため、呼び出し側で`arg`に対して`va_end`を実行する必要がある


## 例
```cpp example
#include <cwchar>
#include <cstdarg>
#include <cstdio>

void log_message(const wchar_t* format, ...)
{
  std::va_list args;
  va_start(args, format);
  std::vfwprintf(stdout, format, args);
  va_end(args);
}

int main()
{
  log_message(L"%ls: %d\n", L"count", 42);
}
```
* std::vfwprintf[color ff0000]

### 出力
```
count: 42
```


## バージョン
### 言語
- C++98


## 関連項目
- [`fwprintf`](fwprintf.md)
- [`std::vfprintf()`](/reference/cstdio/vfprintf.md): マルチバイト文字列版
