#has_denorm_loss
* limits[meta header]
* std[meta namespace]

```cpp
// C++03
static const bool has_denorm_loss;

// C++11
static constexpr bool has_denorm_loss;
```

##概要
浮動小数点数型において、精度の損失が非正規化数によるものかを判定する


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr bool a = std::numeric_limits<int>::has_denorm_loss;
  constexpr bool b = std::numeric_limits<float>::has_denorm_loss;
  constexpr bool c = std::numeric_limits<double>::has_denorm_loss;

  std::cout << std::boolalpha;
  std::cout << "int : " << a << std::endl;
  std::cout << "float : " << b << std::endl;
  std::cout << "double : " << c << std::endl;
}
```
* has_denorm_loss[color ff0000]

###出力例
```
int : false
float : false
double : false
```


