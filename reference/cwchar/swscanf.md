# swscanf
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int swscanf(const wchar_t* s, const wchar_t* format, ...);
}
```

## 概要
書式を指定して、ワイド文字列領域から入力する。


## 戻り値
代入に成功した項目の数を返す。最初の変換が行われる前に入力が終端に達した場合は`WEOF`を返す。


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  int year = 0;
  int month = 0;
  int day = 0;
  int count = std::swscanf(L"2026-09-08", L"%d-%d-%d", &year, &month, &day);

  std::wcout << count << L": " << year << L'/' << month << L'/' << day << std::endl;
}
```
* std::swscanf[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
3: 2026/9/8
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wscanf`](wscanf.md)
- [`std::sscanf()`](/reference/cstdio/sscanf.md): マルチバイト文字列版
