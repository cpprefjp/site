# LC_NUMERIC
* clocale[meta header]
* macro[meta id-type]

```cpp
#define LC_NUMERIC unspecified
```
* unspecified[italic]

## 概要
数値表記に関するロケールカテゴリを指定するための定数。

小数点として使用される文字が変わるため、[`std::printf()`](/reference/cstdio/printf.md)や[`std::strtod()`](/reference/cstdlib/strtod.md)などの数値の入出力・変換に影響する。

[`setlocale()`](setlocale.md)関数の`category`引数として指定する。値は`int`型の処理系定義の定数式であり、各カテゴリのマクロは互いに異なる値をもつ。


## 例
```cpp example
#include <clocale>
#include <iostream>

int main()
{
  // 数値表記のロケールをCロケールに設定する
  std::cout << std::setlocale(LC_NUMERIC, "C") << std::endl;
}
```
* LC_NUMERIC[color ff0000]
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
- [`LC_CTYPE`](lc_ctype.md)
- [`LC_MONETARY`](lc_monetary.md)
- [`LC_TIME`](lc_time.md)
