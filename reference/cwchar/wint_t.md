# wint_t
* cwchar[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  typedef implementation-defined wint_t; // C++98
  using wint_t = implementation-defined; // C++17
}
```
* implementation-defined[italic]

## 概要
ワイド文字の値と、ファイル終端を表す`WEOF`を、いずれも表現できる整数型。

`wchar_t`型のすべての値と`WEOF`を区別して保持できる必要があるため、`wchar_t`より広い型となることがある。ワイド文字を1文字ずつ入出力する関数の戻り値や引数として使用される。


## 備考
- C++17より前の規格では、`<cwchar>`の内容はC言語の`<wchar.h>`と同じであるとだけ規定されており、宣言は明示されていなかった。C++17で、C標準ライブラリのヘッダに対する宣言の一覧が規格へ追加された
- 整数昇格によって値が変化しない型でなければならない
- `wchar_t`が符号なし型である場合、`wint_t`も符号なし型となる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  // getwchar()の戻り値はwint_t型であり、WEOFと比較できる
  std::wint_t c = std::btowc('a');

  std::wcout << (c != WEOF) << std::endl;
  std::wcout << (c == L'a') << std::endl;
}
```
* std::wint_t[color ff0000]
* std::btowc[link btowc.md]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
1
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`btowc`](btowc.md)
- [`fgetwc`](fgetwc.md)
