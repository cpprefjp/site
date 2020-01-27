# FP_INFINITE
* cmath[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define FP_INFINITE integer_constant_expression
```
* integer_constant_expression[italic]

## 概要
浮動小数点数が（�または負の）無限大であることを表す整数定数式。


## 備考
このマク�の値は、[`std::fpclassify`](fpclassify.md) において、引数が�、あるいは、負の無限大である場合に、戻り値として使用される。


## 例
```cpp example
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
* infinity[link ../limits/numeric_limits/infinity.md]
* std::fpclassify[link fpclassify.md]

### 出力例
```
true
```


## バージョン
### 言語
- C++11
