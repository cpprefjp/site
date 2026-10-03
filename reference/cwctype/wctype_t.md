# wctype_t
* cwctype[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  typedef implementation-defined wctype_t; // C++98
  using wctype_t = implementation-defined; // C++17
}
```
* implementation-defined[italic]

## 概要
ワイド文字の種別を表すスカラ型。

[`wctype()`](wctype.md)が返す値を保持し、[`iswctype()`](iswctype.md)に渡して判定に使用する。これにより、[`iswalpha()`](iswalpha.md)のような個別の関数では表せない、ロケールが定義する種別も判定できる。


## 備考
- C++17より前の規格では、`<cwctype>`の内容はC言語の`<wctype.h>`と同じであるとだけ規定されており、宣言は明示されていなかった。C++17で、C標準ライブラリのヘッダに対する宣言の一覧が規格へ追加された


## 例
```cpp example
#include <cwctype>
#include <iostream>

int main()
{
  // 「英字」の種別を取得する
  std::wctype_t alpha = std::wctype("alpha");

  std::cout << std::boolalpha;
  std::cout << (std::iswctype(L'a', alpha) != 0) << std::endl;
  std::cout << (std::iswctype(L'1', alpha) != 0) << std::endl;
}
```
* std::wctype_t[color ff0000]
* std::wctype[link wctype.md]
* std::iswctype[link iswctype.md]

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
- [`iswctype`](iswctype.md)
- [`wctrans_t`](wctrans_t.md)
