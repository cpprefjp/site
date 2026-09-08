# fputws
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int fputws(const wchar_t* s, FILE* stream);
}
```
* FILE[link /reference/cstdio/file.md]

## 概要
ファイルストリームに文字列を出力する。


## 戻り値
成功した場合は非負の値を返す。エラーが発生した場合は`WEOF`を返す。


## 備考
- [`std::fputs()`](/reference/cstdio/fputs.md)と同じく、終端のヌル文字は出力されず、改行も追加されない


## 例
```cpp example
#include <cwchar>
#include <cstdio>

int main()
{
  std::fputws(L"hello\n", stdout);
}
```
* std::fputws[color ff0000]

### 出力
```
hello
```


## バージョン
### 言語
- C++98


## 関連項目
- [`fputwc`](fputwc.md)
- [`fgetws`](fgetws.md)
- [`std::fputs()`](/reference/cstdio/fputs.md): マルチバイト文字列版
