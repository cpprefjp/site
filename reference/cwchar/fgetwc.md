# fgetwc
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wint_t fgetwc(FILE* stream);
}
```
* FILE[link /reference/cstdio/file.md]
* wint_t[link wint_t.md]

## 概要
ファイルストリームから1文字入力する。


## 戻り値
読み込んだ文字を[`wint_t`](wint_t.md)型で返す。入力の終端に達した場合、またはエラーが発生した場合は`WEOF`を返す。


## 例
```cpp example
#include <cwchar>
#include <cstdio>
#include <iostream>

int main()
{
  std::FILE* fp = std::fopen("test.txt", "w+");
  std::fputws(L"abc", fp);
  std::rewind(fp);

  std::wint_t c = std::fgetwc(fp);
  std::wcout << (c == L'a') << std::endl;

  std::fclose(fp);
}
```
* std::fgetwc[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`getwc`](getwc.md)
- [`fgetws`](fgetws.md)
- [`std::fgetc()`](/reference/cstdio/fgetc.md): マルチバイト文字列版
