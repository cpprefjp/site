# wcsxfrm
* cwchar[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  size_t wcsxfrm(wchar_t* s1, const wchar_t* s2, size_t n);
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
ロケールに従った比較のために、ワイド文字列を変換する。


## 効果
`s2`が指す文字列を、[`wcscmp()`](wcscmp.md)で比較した結果が[`wcscoll()`](wcscoll.md)による比較と一致するような形式へ変換し、`s1`が指す配列へ最大`n`文字（終端のヌル文字を含む）書き込む。


## 戻り値
変換後の文字列の長さを返す。この値が`n`以上である場合、`s1`の内容は不定である。


## 備考
- 同じ文字列を繰り返し比較する場合、あらかじめこの関数で変換しておくことで、[`wcscoll()`](wcscoll.md)による比較よりも高速に比較できる


## 例
```cpp example
#include <cwchar>
#include <iostream>

int main()
{
  wchar_t buffer[32];
  std::size_t n = std::wcsxfrm(buffer, L"abc", 32);

  std::wcout << (n > 0) << std::endl;
}
```
* std::wcsxfrm[color ff0000]
* std::wcout[link /reference/iostream/wcout.md]

### 出力
```
1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wcscoll`](wcscoll.md)
- [`std::strxfrm()`](/reference/cstring/strxfrm.md): マルチバイト文字列版
