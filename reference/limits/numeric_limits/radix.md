#radix
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
// C++03
static const int radix;

// C++11
static constexpr int radix;
```

##概要
[`digits`](digits.md)を表現する基数を示す


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr int d = std::numeric_limits<int>::radix;
  constexpr int c = std::numeric_limits<char>::radix;
  constexpr int f = std::numeric_limits<double>::radix;

  std::cout << "int : " << d << std::endl;
  std::cout << "char : " << c << std::endl;
  std::cout << "double : " << f << std::endl;
}
```
* radix[color ff0000]

###出力例
```
int : 2
char : 2
double : 2
```


