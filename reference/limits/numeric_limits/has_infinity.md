# has_infinity
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
// C++03
static const bool has_infinity;

// C++11
static constexpr bool has_infinity;
```

## 概要
浮動小数点数型において、型`T`が正の無限表現を持っているかどうかを判定する。  
[`is_iec559`](is_iec559.md) `!= false`が成り立つ場合は常に`true`である。


## 例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr bool a = std::numeric_limits<int>::has_infinity;
  constexpr bool b = std::numeric_limits<float>::has_infinity;
  constexpr bool c = std::numeric_limits<double>::has_infinity;

  std::cout << std::boolalpha;
  std::cout << "int : " << a << std::endl;
  std::cout << "float : " << b << std::endl;
  std::cout << "double : " << c << std::endl;
}
```
* has_infinity[color ff0000]

### 出力
```
int : false
float : true
double : true
```


