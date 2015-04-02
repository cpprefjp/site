#FP_NAN (C++11)
* cmath[meta header]
* macro[meta id-type]

```cpp
#define FP_NAN integer_constant_expression
```
* integer_constant_expression[italic]

##概要
浮動小数点数が `NaN` であることを表すを表す整数定数式。


##備考
このマクロの値は、[`fpclassify`](fpclassify.md) において、引数が `NaN`（Not a Number、非数）である場合に、戻り値として使用される。


##例
```cpp
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
* iostream[link ../iostream.md]
* limits[link ../limits.md]
* cmath[link ../cmath.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]
* boolalpha[link ../ios/boolalpha.md]
* numeric_limits[link ../limits/numeric_limits.md]
* quiet_NaN[link ../limits/numeric_limits/quiet_nan.md]
* fpclassify[link fpclassify.md]

###出力例
```
true
```


##バージョン
###言語
- C++11
