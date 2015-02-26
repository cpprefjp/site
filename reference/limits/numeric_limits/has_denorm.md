#has_denorm
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]

```cpp
// C++03
static const float_denorm_style has_denorm;

// C++11
static constexpr float_denorm_style has_denorm;
```
* float_denorm_style[link /reference/limits/float_denorm_style.md]

##概要
浮動小数点数型において、型`T`の非正規化数(Denormal Number)のサポート状況を判定する。

| 値                                                      | 非正規化数のサポート状況 |
|---------------------------------------------------------|--------------------------|
| [`std::denorm_indeterminate`](../float_denorm_style.md) | 許可するか判定できない   |
| [`std::denorm_absent`](../float_denorm_style.md)        | 許可しない               |
| [`std::denorm_present`](../float_denorm_style.md)       | 許可する                 |


##例
```cpp
#include <iostream>
#include <limits>
#include <stdexcept>
#include <string>

std::string denorm_string(std::float_denorm_style e)
{
  switch (e) {
    case std::denorm_indeterminate: return "indeterminate";
    case std::denorm_absent:        return "absent";
    case std::denorm_present:       return "present";
  }
  throw std::invalid_argument("not support value");
}

int main()
{
  constexpr std::float_denorm_style a = std::numeric_limits<int>::has_denorm;
  constexpr std::float_denorm_style b = std::numeric_limits<float>::has_denorm;
  constexpr std::float_denorm_style c = std::numeric_limits<double>::has_denorm;

  std::cout << std::boolalpha;
  std::cout << "int : " << denorm_string(a) << std::endl;
  std::cout << "float : " << denorm_string(b) << std::endl;
  std::cout << "double : " << denorm_string(c) << std::endl;
}
```
* has_denorm[color ff0000]

###出力例
```
int : absent
float : present
double : present
```

##参照
* [`float_denorm_style`](../float_denorm_style.md)


