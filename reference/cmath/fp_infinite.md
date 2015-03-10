#FP_INFINITE
* cmath[meta header]
* macro[meta id-type]

```cpp
#define FP_INFINITE integer_constant_expression
```
* integer_constant_expression[italic]

##概要
浮動小数点数が（正または負の）無限大であることを表す整数定数式。


##備考
このマクロの値は、[`fpclassify`](fpclassify.md) において、引数が正、あるいは、負の無限大である場合に、戻り値として使用される。


##例
```cpp
#include <iostream>
#include <limits>
#include <cmath>

int main()
{
  std::cout << std::boolalpha;
  std::cout << (std::fpclassify(std::numeric_limits<double>::infinity()) == FP_INFINITE) << std::endl;
}
```
* FP_INFINITE[color ff0000]
* iostream[link ../iostream.md]
* limits[link ../limits.md]
* cmath[link ../cmath.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]
* boolalpha[link ../ios/boolalpha.md]
* numeric_limits[link ../limits/numeric_limits.md]
* infinity[link ../limits/numeric_limits/infinity.md]
* fpclassify[link fpclassify.md]

###出力例
```
true
```
