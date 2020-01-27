# FP_SUBNORMAL
* cmath[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define FP_SUBNORMAL integer_constant_expression
```
* integer_constant_expression[italic]

## 概要
浮動小数点数が非�規化数であることを表す整数定数式。

非�規化数とは、�規化数として表現するには小さすぎる値をいう。


## 備考
このマク�の値は、[`std::fpclassify`](fpclassify.md) において、引数が非�規化数である場合に、戻り値として使用される。


## 例
```cpp example
#include <iostream>
#include <limits>
#include <cmath>

int main()
{
  std::cout << std::boolalpha;
  std::cout << (std::fpclassify(std::numeric_limits<double>::denorm_min()) == FP_SUBNORMAL) << std::endl;
}
```
* FP_SUBNORMAL[color ff0000]
* denorm_min()[link ../limits/numeric_limits/denorm_min.md]
* std::fpclassify[link fpclassify.md]

### 出力例
```
true
```


## バージョン
### 言語
- C++11
