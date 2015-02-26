#round_style
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
// C++03
static const float_round_style round_style;

// C++11
static constexpr float_round_style round_style;
```
* float_round_style[link /reference/limits/float_round_style.md]


##概要
浮動小数点数の丸めスタイルを取得する


##例
```cpp
#include <iostream>
#include <limits>
#include <stdexcept>
#include <string>

std::string style_string(std::float_round_style e)
{
  switch (e) {
    case std::round_indeterminate:       return "indeterminate";
    case std::round_toward_zero:         return "toward zero";
    case std::round_to_nearest:          return "to nearest";
    case std::round_toward_infinity:     return "toward infinity";
    case std::round_toward_neg_infinity: return "toward negative infinity";
  }
  throw std::invalid_argument("invalid style");
}

int main()
{
  constexpr std::float_round_style f = std::numeric_limits<float>::round_style;
  constexpr std::float_round_style d = std::numeric_limits<double>::round_style;

  std::cout << "float : " << style_string(f) << std::endl;
  std::cout << "double : " << style_string(d) << std::endl;
}
```
* round_style[color ff0000]

###出力例
```
float : to nearest
double : to nearest
```

##参照
* [`float_round_style`](../float_round_style.md)


