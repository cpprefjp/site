# fwprintf
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int fwprintf(FILE* stream, const wchar_t* format, ...);
}
```
* FILE[link /reference/cstdio/file.md]

## 概要
書式を指定して、ファイルストリームへワイド文字列を出力する。


## 戻り値
書き込んだ文字数を返す。出力エラーが発生した場合は負の値を返す。


## 例
```cpp example
#include <cwchar>
#include <cstdio>

int main()
{
  std::fwprintf(stdout, L"%ls: %d\n", L"count", 42);
}
```
* std::fwprintf[color ff0000]

### 出力
```
count: 42
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wprintf`](wprintf.md)
- [`std::fprintf()`](/reference/cstdio/fprintf.md): マルチバイト文字列版
