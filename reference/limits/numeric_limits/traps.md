#traps
```cpp
// C++03
static const bool traps;

// C++11
static constexpr bool traps;
```

##概要
算術演算によってトラップが発生する型かを判定する。


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr bool a = std::numeric_limits<int>::traps;
  constexpr bool b = std::numeric_limits<char>::traps;
  constexpr bool c = std::numeric_limits<float>::traps;
  constexpr bool d = std::numeric_limits<double>::traps;

  std::cout << std::boolalpha;
  std::cout << "int : " << a << std::endl;
  std::cout << "char : " << b << std::endl;
  std::cout << "float : " << c << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* traps[color ff0000]

###出力
```
int : true
char : true
float : false
double : false
```


