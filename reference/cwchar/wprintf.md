# wprintf
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int wprintf(const wchar_t* format, ...);
}
```

## 概要
書式を指定して、標準出力へワイド文字列を出力する。


## 戻り値
書き込んだ文字数を返す。出力エラーが発生した場合は負の値を返す。


## 備考
- 書式指定の規則は[`std::printf()`](/reference/cstdio/printf.md)と同じだが、書式文字列と`%s`・`%c`の扱いがワイド文字になる


## 例
```cpp example
#include <cwchar>

int main()
{
  std::wprintf(L"%ls: %d\n", L"count", 42);
}
```
* std::wprintf[color ff0000]

### 出力
```
count: 42
```


## バージョン
### 言語
- C++98


## 関連項目
- [`fwprintf`](fwprintf.md)
- [`swprintf`](swprintf.md)
- [`std::printf()`](/reference/cstdio/printf.md): マルチバイト文字列版
