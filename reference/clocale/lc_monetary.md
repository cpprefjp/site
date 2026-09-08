# LC_MONETARY
* clocale[meta header]
* macro[meta id-type]

```cpp
#define LC_MONETARY unspecified
```
* unspecified[italic]

## 概要
通貨表記に関するロケールカテゴリを指定するための定数。

[`localeconv()`](localeconv.md)が返す[`lconv`](lconv.md)構造体の、通貨に関するメンバの内容に影響する。

[`setlocale()`](setlocale.md)関数の`category`引数として指定する。値は`int`型の処理系定義の定数式であり、各カテゴリのマクロは互いに異なる値をもつ。


## 例
```cpp example
#include <clocale>
#include <iostream>

int main()
{
  // 通貨表記のロケールをCロケールに設定する
  std::cout << std::setlocale(LC_MONETARY, "C") << std::endl;
}
```
* LC_MONETARY[color ff0000]
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
- [`LC_NUMERIC`](lc_numeric.md)
- [`LC_TIME`](lc_time.md)
