# wscanf
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int wscanf(const wchar_t* format, ...);
}
```

## 概要
書式を指定して、標準入力からワイド文字列を入力する。


## 戻り値
代入に成功した項目の数を返す。最初の変換が行われる前に入力が終端に達した場合は`WEOF`を返す。


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  int a = 0;
  int count = std::wscanf(L"%d", &a);

  std::wcout << count << L' ' << a << std::endl;
}
```
* std::wscanf[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力例
```
1 42
```


## バージョン
### 言語
- C++98


## 関連項目
- [`fwscanf`](fwscanf.md)
- [`swscanf`](swscanf.md)
- [`std::scanf()`](/reference/cstdio/scanf.md): マルチバイト文字列版
