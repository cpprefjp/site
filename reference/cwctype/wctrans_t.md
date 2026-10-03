# wctrans_t
* cwctype[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  typedef implementation-defined wctrans_t; // C++98
  using wctrans_t = implementation-defined; // C++17
}
```
* implementation-defined[italic]

## 概要
ワイド文字の変換規則を表すスカラ型。

[`wctrans()`](wctrans.md)が返す値を保持し、[`towctrans()`](towctrans.md)に渡して変換に使用する。これにより、[`towlower()`](towlower.md)・[`towupper()`](towupper.md)では表せない、ロケールが定義する変換も行える。


## 備考
- C++17より前の規格では、`<cwctype>`の内容はC言語の`<wctype.h>`と同じであるとだけ規定されており、宣言は明示されていなかった。C++17で、C標準ライブラリのヘッダに対する宣言の一覧が規格へ追加された


## 例
```cpp example
#include <cwctype>
#include <iostream>

int main()
{
  // 「大文字へ変換する」規則を取得する
  std::wctrans_t upper = std::wctrans("toupper");

  std::wcout << static_cast<wchar_t>(std::towctrans(L'a', upper)) << std::endl;
}
```
* std::wctrans_t[color ff0000]
* std::wctrans[link wctrans.md]
* std::towctrans[link towctrans.md]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
A
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wctrans`](wctrans.md)
- [`towctrans`](towctrans.md)
- [`wctype_t`](wctype_t.md)
