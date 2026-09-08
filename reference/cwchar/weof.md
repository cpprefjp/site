# WEOF
* cwchar[meta header]
* macro[meta id-type]

```cpp
#define WEOF unspecified
```
* unspecified[italic]

## 概要
ワイド文字ストリームの終端を表す定数。

[`fgetwc()`](fgetwc.md)などのワイド文字入力関数が、入力の終端に達した場合やエラーが発生した場合に返す値である。`wchar_t`型のどの値とも異なる`wint_t`型の値をもつ。


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  // btowc()は変換できない場合にWEOFを返す
  std::wcout << (std::btowc(EOF) == WEOF) << std::endl;
}
```
* WEOF[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wint_t`](wint_t.md)
- [`fgetwc`](fgetwc.md)
