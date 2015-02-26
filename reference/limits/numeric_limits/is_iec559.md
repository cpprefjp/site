#is_iec559
* limits[meta header]

```cpp
// C++03
static const bool is_iec559;

// C++11
static constexpr bool is_iec559;
```

##概要
浮動小数点数型において、型`T`がIEC 559 (IEEE 754) に準拠しているかを判定する。


##例
```cpp
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

###出力例
```
float : true
double : true
```


