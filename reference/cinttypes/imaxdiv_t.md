# imaxdiv_t
* cinttypes[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct imaxdiv_t {
    intmax_t quot;
    intmax_t rem;
  };
}
```
* intmax_t[link /reference/cstdint/intmax_t.md]

## 概要
[`std::imaxdiv()`](imaxdiv.md)関数の戻り値となる構造体型。

`quot`は「quotient (商)」、`rem`は「remainder (剰余)」を表す。

なお、メンバの宣言順序は未規定である。


## 例
```cpp example
#include <iostream>
#include <cinttypes>

int main()
{
  std::imaxdiv_t x = std::imaxdiv(17, 5);
  std::cout << x.quot << std::endl;
  std::cout << x.rem << std::endl;
}
```
* std::imaxdiv_t[color ff0000]
* std::imaxdiv[link imaxdiv.md]

### 出力
```
3
2
```


## バージョン
### 言語
- C++11


## 関連項目
- [`imaxdiv`](imaxdiv.md)
- [`div_t`](/reference/cstdlib/div_t.md)


## 参照
- [N1568 Proposed additions to TR-1 to improve compatibility with C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1568.htm)
