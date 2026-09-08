# putwchar
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  wint_t putwchar(wchar_t c);
}
```
* wint_t[link wint_t.md]

## 概要
標準出力に1文字出力する。


## 戻り値
書き込んだ文字を返す。エラーが発生した場合は`WEOF`を返す。


## 例
```cpp example
#include <cwchar>

int main()
{
  std::putwchar(L'a');
  std::putwchar(L'\n');
}
```
* std::putwchar[color ff0000]

### 出力
```
a
```


## バージョン
### 言語
- C++98


## 関連項目
- [`putwc`](putwc.md)
- [`fputwc`](fputwc.md)
- [`std::putchar()`](/reference/cstdio/putchar.md): マルチバイト文字列版
