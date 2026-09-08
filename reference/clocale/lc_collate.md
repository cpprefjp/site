# LC_COLLATE
* clocale[meta header]
* macro[meta id-type]

```cpp
#define LC_COLLATE unspecified
```
* unspecified[italic]

## 概要
文字列の照合（比較）規則に関するロケールカテゴリを指定するための定数。

[`std::strcoll()`](/reference/cstring/strcoll.md)・[`std::strxfrm()`](/reference/cstring/strxfrm.md)・[`std::wcscoll()`](/reference/cwchar/wcscoll.md)・[`std::wcsxfrm()`](/reference/cwchar/wcsxfrm.md)の動作に影響する。

[`setlocale()`](setlocale.md)関数の`category`引数として指定する。値は`int`型の処理系定義の定数式であり、各カテゴリのマクロは互いに異なる値をもつ。


## 例
```cpp example
#include <clocale>
#include <iostream>

int main()
{
  // 照合順序のロケールをCロケールに設定する
  std::cout << std::setlocale(LC_COLLATE, "C") << std::endl;
}
```
* LC_COLLATE[color ff0000]
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
- [`LC_CTYPE`](lc_ctype.md)
- [`LC_MONETARY`](lc_monetary.md)
- [`LC_NUMERIC`](lc_numeric.md)
- [`LC_TIME`](lc_time.md)
