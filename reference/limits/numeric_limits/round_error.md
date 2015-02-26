#round_error
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* function[meta id-type]

```cpp
// C++03
static const T round_error() throw();

// C++11
static constexpr T round_error() noexcept;
```

##概要
最大の丸め誤差を取得する


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr float f = std::numeric_limits<float>::round_error();
  constexpr double d = std::numeric_limits<double>::round_error();

  std::cout << f << std::endl;
  std::cout << d << std::endl;
}
```
* round_error[color ff0000]

###出力例
```
0.5
0.5
```


