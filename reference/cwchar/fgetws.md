# fgetws
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wchar_t* fgetws(wchar_t* s, int n, FILE* stream);
}
```
* FILE[link /reference/cstdio/file.md]

## 概要
ファイルストリームから、最大N文字を読み込む。


## 戻り値
成功した場合は`s`を返す。1文字も読み込まずに終端へ達した場合、またはエラーが発生した場合はヌルポインタを返す。


## 備考
- 改行文字を読み込んだ時点で読み込みが終了し、その改行文字も`s`へ格納される
- 読み込んだ内容の末尾には、必ずヌル文字が書き込まれる


## 例
```cpp example
#include <cwchar>
#include <cstdio>
#include <iostream>

int main()
{
  std::FILE* fp = std::fopen("test.txt", "w+");
  std::fputws(L"abc\ndef\n", fp);
  std::rewind(fp);

  wchar_t buffer[16];
  std::fgetws(buffer, 16, fp);
  std::wcout << buffer;

  std::fclose(fp);
}
```
* std::fgetws[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
abc
```


## バージョン
### 言語
- C++98


## 関連項目
- [`fgetwc`](fgetwc.md)
- [`fputws`](fputws.md)
- [`std::fgets()`](/reference/cstdio/fgets.md): マルチバイト文字列版
