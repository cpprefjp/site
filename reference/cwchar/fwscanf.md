# fwscanf
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int fwscanf(FILE* stream, const wchar_t* format, ...);
}
```
* FILE[link /reference/cstdio/file.md]

## 概要
書式を指定して、ファイルストリームからワイド文字列を入力する。


## 戻り値
代入に成功した項目の数を返す。最初の変換が行われる前に入力が終端に達した場合は`WEOF`を返す。


## 例
```cpp example
#include <cwchar>
#include <cstdio>
#include <iostream>

int main()
{
  int a = 0;
  int count = std::fwscanf(stdin, L"%d", &a);

  std::wcout << count << L' ' << a << std::endl;
}
```
* std::fwscanf[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力例
```
1 42
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wscanf`](wscanf.md)
- [`std::fscanf()`](/reference/cstdio/fscanf.md): マルチバイト文字列版
