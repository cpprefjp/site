# is_iec559
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
static const bool is_iec559;     // (1) C++03
static constexpr bool is_iec559; // (1) C++11
```

## 概要
浮動小数点数型において、型`T`がIEC 559 (IEEE 754) に準拠しているかを判定する。


## 備考
- C++23 : [`float16_t`](/reference/stdfloat/float16_t.md)、[`float32_t`](/reference/stdfloat/float32_t.md)、[`float64_t`](/reference/stdfloat/float64_t.md)、[`float128_t`](/reference/stdfloat/float128_t.md)が存在する場合、この値は`true`となる


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  constexpr bool f = std::numeric_limits<float>::is_iec559;
  constexpr bool d = std::numeric_limits<double>::is_iec559;

  std::cout << std::boolalpha;
  std::cout << "float : " << f << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* is_iec559[color ff0000]

### 出力例
```
float : true
double : true
```
