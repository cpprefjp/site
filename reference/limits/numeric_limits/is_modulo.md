#is_modulo
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]

```cpp
// C++03
static const bool is_modulo;

// C++11
static constexpr bool is_modulo;
```

##概要
加算 (`+`) ・減算 (`-`) ・乗算 (`*`) における数学的な値と、その型での値との間に (`max() - min() + 1`) を法として常に合同関係があるかを判定する。  
符号なし整数型の場合は常に`true`となる。  
多くの場合浮動小数点数型の場合は`false`に、符号あり整数型の場合は`true`になる。


##備考
符号あり整数型において`is_modulo`が`true`であるとしても、符号あり整数型のオーバーフローは未定義の動作を起こす。


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr bool a = std::numeric_limits<int>::is_modulo;
  constexpr bool b = std::numeric_limits<float>::is_modulo;
  constexpr bool c = std::numeric_limits<double>::is_modulo;
  constexpr bool d = std::numeric_limits<char>::is_modulo;

  std::cout << std::boolalpha;
  std::cout << "int : " << a << std::endl;
  std::cout << "float : " << b << std::endl;
  std::cout << "double : " << c << std::endl;
  std::cout << "char : " << d << std::endl;
}
```
* is_modulo[color ff0000]

###出力
```
int : true
float : false
double : false
char : true
```


