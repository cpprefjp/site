# vswscanf
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int vswscanf(const wchar_t* s, const wchar_t* format, va_list arg);
}
```
* va_list[link /reference/cstdarg/va_list.md]

## 概要
可変引数リスト`va_list`を使用し、書式を指定してワイド文字列領域から入力する。


## 戻り値
[`swscanf()`](swscanf.md)と同じ。


## 備考
- この関数は[`va_end`](/reference/cstdarg/va_end.md)マクロを呼び出さないため、呼び出し側で`arg`に対して`va_end`を実行する必要がある
- C++11で、参照するC標準ライブラリがC99へ更新されたことにともなって追加された


## 例
```cpp example
#include <cwchar>
#include <cstdarg>
#include <iostream>

int parse(const wchar_t* s, const wchar_t* format, ...)
{
  std::va_list args;
  va_start(args, format);
  int count = std::vswscanf(s, format, args);
  va_end(args);
  return count;
}

int main()
{
  int a = 0;
  int b = 0;
  int count = parse(L"1 2", L"%d %d", &a, &b);

  std::wcout << count << L": " << a << L' ' << b << std::endl;
}
```
* std::vswscanf[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
2: 1 2
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 5.0 [mark verified]
- [GCC](/implementation.md#gcc): 5.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]


## 関連項目
- [`swscanf`](swscanf.md)
- [`std::vsscanf()`](/reference/cstdio/vsscanf.md): マルチバイト文字列版
