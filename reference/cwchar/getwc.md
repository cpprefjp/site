# getwc
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wint_t getwc(FILE* stream);
}
```
* FILE[link /reference/cstdio/file.md]
* wint_t[link wint_t.md]

## 概要
ファイルストリームから1文字入力する。


## 戻り値
読み込んだ文字を[`wint_t`](wint_t.md)型で返す。入力の終端に達した場合、またはエラーが発生した場合は`WEOF`を返す。


## 備考
- [`fgetwc()`](fgetwc.md)と等価だが、この関数はマクロとして実装されることがあり、`stream`が複数回評価される可能性がある


## 例
```cpp example
#include <cwchar>
#include <cstdio>
#include <iostream>

int main()
{
  std::wint_t c = std::getwc(stdin);
  std::wcout << (c != WEOF) << std::endl;
}
```
* std::getwc[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力例
```
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`fgetwc`](fgetwc.md)
- [`getwchar`](getwchar.md)
- [`std::getc()`](/reference/cstdio/getc.md): マルチバイト文字列版
