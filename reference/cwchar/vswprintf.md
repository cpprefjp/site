# vswprintf
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int vswprintf(wchar_t* s, size_t n, const wchar_t* format, va_list arg);
}
```
* size_t[link /reference/cstddef/size_t.md]
* va_list[link /reference/cstdarg/va_list.md]

## 概要
可変引数リスト`va_list`を使用し、書式と文字数の上限を指定してワイド文字列領域へ出力する。


## 戻り値
[`swprintf()`](swprintf.md)と同じ。


## 備考
- この関数は[`va_end`](/reference/cstdarg/va_end.md)マクロを呼び出さないため、呼び出し側で`arg`に対して`va_end`を実行する必要がある


## 例
```cpp example
#include <cwchar>
#include <cstdarg>
#include <iostream>

void format_to(wchar_t* buffer, std::size_t n, const wchar_t* format, ...)
{
  std::va_list args;
  va_start(args, format);
  std::vswprintf(buffer, n, format, args);
  va_end(args);
}

int main()
{
  wchar_t buffer[16];
  format_to(buffer, 16, L"%d-%d", 12, 34);

  std::wcout << buffer << std::endl;
}
```
* std::vswprintf[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
12-34
```


## バージョン
### 言語
- C++98


## 関連項目
- [`swprintf`](swprintf.md)
- [`std::vsnprintf()`](/reference/cstdio/vsnprintf.md): マルチバイト文字列版
