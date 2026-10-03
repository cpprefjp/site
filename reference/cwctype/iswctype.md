# iswctype
* cwctype[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int iswctype(wint_t wc, wctype_t desc);
}
```
* wint_t[link /reference/cwchar/wint_t.md]
* wctype_t[link wctype_t.md]


## 概要
ワイド文字`wc`が、[`wctype()`](wctype.md)で取得した種別`desc`に属するかを判定する。

判定する種別を実行時に指定できるため、[`iswalpha()`](iswalpha.md)のような個別の関数では表せない、ロケールが定義する種別も判定できる。


## 戻り値
`wc`が種別`desc`に属すると判定されれば非ゼロの値を、そうでなければ`0`を返す。


## 例
```cpp example
#include <cwctype>
#include <iostream>

int main()
{
  std::wctype_t digit = std::wctype("digit");

  std::cout << std::boolalpha;
  std::cout << (std::iswctype(L'1', digit) != 0) << std::endl;
  std::cout << (std::iswctype(L'a', digit) != 0) << std::endl;
}
```
* std::iswctype[color ff0000]
* std::wctype_t[link wctype_t.md]
* std::wctype[link wctype.md]

### 出力
```
true
false
```


## バージョン
### 言語
- C++98


## 関連項目
- [`wctype`](wctype.md)
- [`wctype_t`](wctype_t.md)
- [`towctrans`](towctrans.md)
