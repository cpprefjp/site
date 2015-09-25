#FP_ZERO
* cmath[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define FP_ZERO integer_constant_expression
```
* integer_constant_expression[italic]

##概要
浮動小数点数が（正または負の） 0 であることを表す整数定数式。


##備考
このマクロの値は、[`fpclassify`](fpclassify.md) において、引数が正、あるいは、負のゼロである場合に、戻り値として使用される。


##例
```cpp
#include <iostream>
#include <cmath>

int main()
{
  std::cout << std::boolalpha;
  std::cout << (std::fpclassify(0.0) == FP_ZERO) << std::endl;
}
```
* FP_ZERO[color ff0000]
* iostream[link ../iostream.md]
* cmath[link ../cmath.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]
* boolalpha[link ../ios/boolalpha.md]
* fpclassify[link fpclassify.md]

###出力例
```
true
```


##バージョン
###言語
- C++11
