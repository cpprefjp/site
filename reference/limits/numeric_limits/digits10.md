# digits10
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
static const int digits10;     // (1) C++03
static constexpr int digits10; // (1) C++11
```

## 概要
10進数を型`T`の値に変換し、また10進数に戻すことを考える。  
`digits10`は、10進でn桁の「任意の」数に上の変換を行った場合値が変わらないようなnのうち、最大のものを表す。


ただし、`T`が整数型の場合は元の「任意の」数は整数に限る。  
また、浮動小数点数の場合は小数でもよいが、浮動小数点数に変換したときに指数部が巨大になって`T`で表せなくなったり、非正規化数になったりするような数は除外して考える。


## 備考
`is_specialized == false`の場合は`0`

対応するマクロを次の表に挙げる。

| 型            | 対応するマクロ                              |
|---------------|---------------------------------------------|
| `float`       | [`FLT_DIG`](/reference/cfloat/flt_dig.md)   |
| `double`      | [`DBL_DIG`](/reference/cfloat/dbl_dig.md)   |
| `long double` | [`LDBL_DIG`](/reference/cfloat/ldbl_dig.md) |


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  std::cout << std::numeric_limits<float>::digits10 << std::endl;
  std::cout << std::numeric_limits<double>::digits10 << std::endl;

  std::cout << std::numeric_limits<int>::digits10 << std::endl;
}
```
* digits10[color ff0000]

### 出力例
```
6
15
9
```


## 参照
- [N1822 A Proposal to add a max significant decimal digits value to the C++ Standard Library Numeric limits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1822.pdf)
