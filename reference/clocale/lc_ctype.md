# LC_CTYPE
* clocale[meta header]
* macro[meta id-type]

```cpp
#define LC_CTYPE unspecified
```
* unspecified[italic]

## 概要
文字の分類とマルチバイト文字の扱いに関するロケールカテゴリを指定するための定数。

[`<cctype>`](/reference/cctype.md)の文字種別判定関数、[`<cwctype>`](/reference/cwchar.md)のワイド文字関数、および[`std::mbrtowc()`](/reference/cwchar/mbrtowc.md)などのマルチバイト文字変換関数の動作に影響する。

[`setlocale()`](setlocale.md)関数の`category`引数として指定する。値は`int`型の処理系定義の定数式であり、各カテゴリのマクロは互いに異なる値をもつ。


## 例
```cpp example
#include <clocale>
#include <iostream>

int main()
{
  // 文字種別・マルチバイト変換のロケールをCロケールに設定する
  std::cout << std::setlocale(LC_CTYPE, "C") << std::endl;
}
```
* LC_CTYPE[color ff0000]
* std::setlocale[link setlocale.md]

### 出力
```
C
```


## バージョン
### 言語
- C++98


## 関連項目
- [`setlocale`](setlocale.md)
- [`LC_ALL`](lc_all.md)
- [`LC_COLLATE`](lc_collate.md)
- [`LC_MONETARY`](lc_monetary.md)
- [`LC_NUMERIC`](lc_numeric.md)
- [`LC_TIME`](lc_time.md)
