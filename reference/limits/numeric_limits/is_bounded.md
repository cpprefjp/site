# is_bounded
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
// C++03
static const bool is_bounded;

// C++11
static constexpr bool is_bounded;
```

## 概要
型`T`の値のなす集合が有限かを判定する。  
浮動小数点数は値として無限大を持つことがあるが、値の種類は有限個なので `is_bounded` は `true` である。  
基本型(fundamental types)は全て有限である。


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  constexpr bool a = std::numeric_limits<int>::is_bounded;
  constexpr bool b = std::numeric_limits<float>::is_bounded;
  constexpr bool c = std::numeric_limits<double>::is_bounded;
  constexpr bool d = std::numeric_limits<char>::is_bounded;

  std::cout << std::boolalpha;
  std::cout << "int : " << a << std::endl;
  std::cout << "float : " << b << std::endl;
  std::cout << "double : " << c << std::endl;
  std::cout << "char : " << d << std::endl;
}
```
* is_bounded[color ff0000]

### 出力
```
int : true
float : true
double : true
char : true
```


