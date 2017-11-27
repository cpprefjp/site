# FP_NORMAL
* cmath[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define FP_NORMAL integer_constant_expression
```
* integer_constant_expression[italic]

## 概要
浮動小数点数が正規化数であることを表す整数定数式。

正規化数とは、無限大、非正規化数、`NaN`（Not a Number、非数）、または 0 のいずれでもない数をいう。


## 備考
このマクロの値は、[`std::fpclassify`](fpclassify.md) において、引数が正規化数である場合に、戻り値として使用される。


## 例
```cpp example
#include <iostream>
#include <cmath>

int main()
{
  std::cout << std::boolalpha;
  std::cout << (std::fpclassify(1.0) == FP_NORMAL) << std::endl;
}
```
* FP_NORMAL[color ff0000]
* std::fpclassify[link fpclassify.md]

### 出力例
```
true
```


## バージョン
### 言語
- C++11
