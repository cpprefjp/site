# LC_TIME
* clocale[meta header]
* macro[meta id-type]

```cpp
#define LC_TIME unspecified
```
* unspecified[italic]

## 概要
日付および時刻の表記に関するロケールカテゴリを指定するための定数。

[`std::strftime()`](/reference/ctime/strftime.md)や[`std::wcsftime()`](/reference/cwchar/wcsftime.md)による日時の書式化に影響する。

[`setlocale()`](setlocale.md)関数の`category`引数として指定する。値は`int`型の処理系定義の定数式であり、各カテゴリのマクロは互いに異なる値をもつ。


## 例
```cpp example
#include <clocale>
#include <iostream>

int main()
{
  // 日時表記のロケールをCロケールに設定する
  std::cout << std::setlocale(LC_TIME, "C") << std::endl;
}
```
* LC_TIME[color ff0000]
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
- [`LC_NUMERIC`](lc_numeric.md)
