# FP_NAN
* cmath[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define FP_NAN integer_constant_expression
```
* integer_constant_expression[italic]

## 概要
浮動小数点数が `NaN` であることを表すを表す整数定数式。


## 備考
このマク�の値は、[`std::fpclassify`](fpclassify.md) において、引数が `NaN`（Not a Number、非数）である場合に、戻り値として使用される。


## 例
```cpp example
#include <iostream>
#include <limits>
#include <cmath>

int main()
{
  std::cout << std::boolalpha;
  std::cout << (std::fpclassify(std::numeric_limits<double>::quiet_NaN()) == FP_NAN) << std::endl;
}
```
* FP_NAN[color ff0000]
* quiet_NaN()[link ../limits/numeric_limits/quiet_nan.md]
* std::fpclassify[link fpclassify.md]

### 出力例
```
true
```


## バージョン
### 言語
- C++11
