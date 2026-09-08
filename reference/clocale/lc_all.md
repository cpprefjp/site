# LC_ALL
* clocale[meta header]
* macro[meta id-type]

```cpp
#define LC_ALL unspecified
```
* unspecified[italic]

## 概要
すべてのロケールカテゴリを一括して指定するための定数。

[`setlocale()`](setlocale.md)にこのカテゴリを指定すると、以下のすべてのカテゴリが同時に設定される。

[`setlocale()`](setlocale.md)関数の`category`引数として指定する。値は`int`型の処理系定義の定数式であり、各カテゴリのマクロは互いに異なる値をもつ。


## 例
```cpp example
#include <clocale>
#include <iostream>

int main()
{
  // 全カテゴリのロケールをCロケールに設定する
  std::cout << std::setlocale(LC_ALL, "C") << std::endl;
}
```
* LC_ALL[color ff0000]
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
- [`LC_COLLATE`](lc_collate.md)
- [`LC_CTYPE`](lc_ctype.md)
- [`LC_MONETARY`](lc_monetary.md)
- [`LC_NUMERIC`](lc_numeric.md)
- [`LC_TIME`](lc_time.md)
