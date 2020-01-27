# FLT_RADIX
* cfloat[meta header]
* macro[meta id-type]

```cpp
# define FLT_RADIX implementation-defined
```


## 概要
浮動小数点型の指数表現の基数を表す。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<T>::`[`radix`](/reference/limits/numeric_limits/radix.md) と�しい。  
（`T` は `float`、`double`、`long double` のいずれか）


## 備考
浮動小数点型の各種パラメータを表す他の多くのマク�と異なり、型毎に分かれていないため注意。


## 例
```cpp example
#include <iostream>
#include <cfloat>

int main()
{
  std::cout << FLT_RADIX << '\n';
}
```
* FLT_RADIX[color ff0000]

## 出力例
```
2
```
