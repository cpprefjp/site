# swprintf
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int swprintf(wchar_t* s, size_t n, const wchar_t* format, ...);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
書式と文字数の上限を指定して、ワイド文字列領域へ出力する。


## 戻り値
書き込んだ文字数（終端のヌル文字を含まない）を返す。`n`文字以内に収まらなかった場合は負の値を返す。


## 備考
- マルチバイト文字列版の[`std::sprintf()`](/reference/cstdio/sprintf.md)と異なり、この関数は文字数の上限`n`を引数にとる。上限を超えた場合の戻り値は、必要だった文字数ではなく負の値である点が[`std::snprintf()`](/reference/cstdio/snprintf.md)と異なる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  wchar_t buffer[16];
  int len = std::swprintf(buffer, 16, L"%d-%d", 12, 34);

  std::wcout << buffer << L' ' << len << std::endl;
}
```
* std::swprintf[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
12-34 5
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wprintf`](wprintf.md)
- [`std::snprintf()`](/reference/cstdio/snprintf.md): マルチバイト文字列版
