# FP_ZERO
* cmath[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define FP_ZERO integer_constant_expression
```
* integer_constant_expression[italic]

## 概要
浮動小数点数が（�または負の） 0 であることを表す整数定数式。


## 備考
このマク�の値は、[`std::fpclassify`](fpclassify.md) において、引数が�、あるいは、負のゼ�である場合に、戻り値として使用される。


## 例
```cpp example
#include <iostream>
#include <cmath>

int main()
{
  std::cout << std::boolalpha;
  std::cout << (std::fpclassify(0.0) == FP_ZERO) << std::endl;
}
```
* FP_ZERO[color ff0000]
* std::fpclassify[link fpclassify.md]

### 出力例
```
true
```


## バージョン
### 言語
- C++11
