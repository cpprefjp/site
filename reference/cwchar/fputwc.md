# fputwc
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wint_t fputwc(wchar_t c, FILE* stream);
}
```
* FILE[link /reference/cstdio/file.md]
* wint_t[link wint_t.md]

## 概要
ファイルストリームに1文字出力する。


## 戻り値
書き込んだ文字を返す。エラーが発生した場合は`WEOF`を返す。


## 例
```cpp example
#include <cwchar>
#include <cstdio>

int main()
{
  std::fputwc(L'a', stdout);
  std::fputwc(L'\n', stdout);
}
```
* std::fputwc[color ff0000]

### 出力
```
a
```


## バージョン
### 言語
- C++98


## 関連項目
- [`putwc`](putwc.md)
- [`fputws`](fputws.md)
- [`std::fputc()`](/reference/cstdio/fputc.md): マルチバイト文字列版
