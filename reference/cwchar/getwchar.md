# getwchar
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wint_t getwchar();
}
```
* wint_t[link wint_t.md]

## 概要
標準入力から1文字入力する。


## 戻り値
読み込んだ文字を[`wint_t`](wint_t.md)型で返す。入力の終端に達した場合、またはエラーが発生した場合は`WEOF`を返す。


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  std::wint_t c = std::getwchar();
  std::wcout << (c != WEOF) << std::endl;
}
```
* std::getwchar[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力例
```
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`getwc`](getwc.md)
- [`fgetwc`](fgetwc.md)
- [`std::getchar()`](/reference/cstdio/getchar.md): マルチバイト文字列版
