# putwc
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wint_t putwc(wchar_t c, FILE* stream);
}
```
* FILE[link /reference/cstdio/file.md]
* wint_t[link wint_t.md]

## 概要
ファイルストリームに1文字出力する。


## 戻り値
書き込んだ文字を返す。エラーが発生した場合は`WEOF`を返す。


## 備考
- [`fputwc()`](fputwc.md)と等価だが、この関数はマクロとして実装されることがあり、`stream`が複数回評価される可能性がある


## 例
```cpp example
#include <cwchar>
#include <cstdio>

int main()
{
  std::putwc(L'a', stdout);
  std::putwc(L'\n', stdout);
}
```
* std::putwc[color ff0000]

### 出力
```
a
```


## バージョン
### 言語
- C++98


## 関連項目
- [`fputwc`](fputwc.md)
- [`putwchar`](putwchar.md)
- [`std::putc()`](/reference/cstdio/putc.md): マルチバイト文字列版
