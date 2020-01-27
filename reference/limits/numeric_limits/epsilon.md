# epsilon
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* function[meta id-type]

```cpp
// C++03
static const T epsilon() throw();

// C++11
static constexpr T epsilon() noexcept;
```

## 概要
機械イプシ�ンを取得する。  
これは浮動小数点数の比較のために誤差幅を評価するのに使用できる。  

対応するマク�を次の表に挙げる。

| 型            | 対応するマク�                                      |
|---------------|-----------------------------------------------------|
| `float`       | [`FLT_EPSILON`](/reference/cfloat/flt_epsilon.md)   |
| `double`      | [`DBL_EPSILON`](/reference/cfloat/dbl_epsilon.md)   |
| `long double` | [`LDBL_EPSILON`](/reference/cfloat/ldbl_epsilon.md) |


## 例
```cpp example
#include <iostream>
#include <cmath>
#include <limits>

int main()
{
  constexpr double e = std::numeric_limits<double>::epsilon();

  std::cout << e << std::endl;

  double a = 0.6 - 0.4;
  double b = 0.2;
  if (std::abs(a - b) <= e) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* epsilon()[color ff0000]
* std::abs[link /reference/cmath/abs.md]

### 出力
```
2.22045e-016
equal
```

## 参照
- [C++ FAQ - Why doesn't my floating-point comparison work?](http://www.cs.technion.ac.il/users/yechiel/c++-faq/floating-point-arith.html)
- [Comparing Floating Point Numbers, 2012 Edition](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)
- [浮動小数比較の落とし穴 - trinoの走り書き](http://d.hatena.ne.jp/n-trino/20161101#p1)

