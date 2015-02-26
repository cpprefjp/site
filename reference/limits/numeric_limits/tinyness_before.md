#tinyness_before
* limits[meta header]
* std[meta namespace]

```cpp
// C++03
static const bool tinyness_before;

// C++11
static constexpr bool tinyness_before;
```

##概要
浮動小数点数型において、型`T`が丸めが行われる前に小さな値になることを検出できる場合は`true`、そうでなければ`false`となる。


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr bool f = std::numeric_limits<float>::tinyness_before;
  constexpr bool d = std::numeric_limits<double>::tinyness_before;

  std::cout << std::boolalpha;
  std::cout << "float : " << f << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* tinyness_before[color ff0000]

###出力例
```
float : false
double : false
```


